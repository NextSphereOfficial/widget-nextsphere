// apps/api/src/routes/chat.ts
import type { FastifyInstance, FastifyPluginAsync } from "fastify";
import { orchestrateChat } from "../core/orchestrator.js";
import { loadIntentsCore, loadStructure } from "../content/loader.js";
import { cacheGet, cacheSet } from "../core/runtimeGuards.js";
import {
  ensureSessionForChat,
  saveMessage,
} from "../services/sessionService.js";

// -----------------------------------------------------
// Cache

const LLM_CACHE_PREFIX = "llm:chat:";

/**
 * Chiave cache per LLM:
 * - struttura (es. "svapartments")
 * - testo normalizzato (usa la stessa logica di resolveIntent -> norm)
 */
function buildLlmCacheKey(structureId: string, message: string) {
  return `${LLM_CACHE_PREFIX}${structureId}:${norm(message)}`;
}

// -----------------------------------------------------
// FS helpers
function safeField(obj: any, path: string, def: string): string {
  try {
    const parts = path.split(".");
    let cur: any = obj;
    for (const p of parts) {
      if (!cur || typeof cur !== "object") return def;
      cur = cur[p];
    }
    return typeof cur === "string" ? cur : def;
  } catch {
    return def;
  }
}

function safeArray(obj: any, path: string): any[] {
  try {
    const parts = path.split(".");
    let cur: any = obj;
    for (const p of parts) {
      if (!cur || typeof cur !== "object") return [];
      cur = cur[p];
    }
    return Array.isArray(cur) ? cur : [];
  } catch {
    return [];
  }
}

// -----------------------------------------------------
// Core helpers: scoring / matching
// -----------------------------------------------------

type IntentMatch = {
  key: string;
  score: number;
  matched: boolean;
};

function scoreIntent(
  text: string,
  intent: {
    id?: string;
    synonyms?: string[];
    keywords?: string[];
    patterns?: string[];
    negative?: string[];
    priority?: number;
  }
): { score: number; matched: boolean } {
  const t = norm(text);
  let score = 0;
  let matched = false;

  const allSynonyms = (intent.synonyms || []).map(norm).filter(Boolean);
  const allKeywords = (intent.keywords || []).map(norm).filter(Boolean);
  const allPatterns = (intent.patterns || []).map(norm).filter(Boolean);
  const allNegative = (intent.negative || []).map(norm).filter(Boolean);

  for (const n of allNegative) {
    if (t.includes(n)) {
      score -= 5;
    }
  }

  for (const s of allSynonyms) {
    if (t.includes(s)) {
      score += 5;
      matched = true;
    }
  }
  for (const k of allKeywords) {
    if (t.includes(k)) {
      score += 3;
      matched = true;
    }
  }

  for (const p of allPatterns) {
    try {
      const re = new RegExp(p, "i");
      if (re.test(t)) {
        score += 4;
        matched = true;
      }
    } catch {
      /* ignore invalid regex */
    }
  }

  if (matched) score += intent.priority ?? 0;

  return { score, matched };
}

function resolveIntent(userText: string, intentsCore: Record<string, any>) {
  const t = norm(userText);

  const intents = Object.entries(intentsCore || {}).map(([key, value]) => {
    const intent = value as any;
    const { score, matched } = scoreIntent(t, intent);
    return { key, score, matched } satisfies IntentMatch;
  });

  // override heuristico per intent base

  if (
    /\bwi\s*fi\b/.test(t) ||
    t.includes("wifi") ||
    t.includes("password wifi") ||
    t.includes("ssid")
  ) {
    const idx = intents.findIndex((i) => i.key === "wifi");
    if (idx >= 0) intents[idx] = { key: "wifi", score: 999, matched: true };
    else intents.push({ key: "wifi", score: 999, matched: true });
  }

  if (
    t.includes("late checkout") ||
    /posticip(a|o)\s*il?\s*checkout/.test(t) ||
    /checkout\s*tardi/.test(t)
  ) {
    const idx = intents.findIndex((i) => i.key === "late_checkout");
    if (idx >= 0)
      intents[idx] = { key: "late_checkout", score: 999, matched: true };
    else intents.push({ key: "late_checkout", score: 999, matched: true });
  }

  if (
    t.includes("emergenz") ||
    t.includes("ambulanza") ||
    t.includes("polizia") ||
    t.includes("carabinieri") ||
    t.includes("fuoco") ||
    t.includes("incendio")
  ) {
    const idx = intents.findIndex((i) => i.key === "emergency");
    if (idx >= 0)
      intents[idx] = { key: "emergency", score: 999, matched: true };
    else intents.push({ key: "emergency", score: 999, matched: true });
  }

  intents.sort((a, b) => b.score - a.score);
  const top = intents[0];

  if (!top || top.score <= 0) {
    return { key: "fallback", score: 0, matched: false };
  }

  return top;
}

function renderTemplate(
  structureYaml: any,
  intentKey: string,
  lang: string,
  mode: "short" | "long"
): { text: string; buttons: any[] } {
  const responses = structureYaml?.responses || {};
  const intentData = responses[intentKey];
  if (!intentData) return { text: "", buttons: [] };

  const langObj = intentData[lang] || intentData["it"] || intentData["en"];
  if (!langObj) return { text: "", buttons: [] };

  const modeText =
    typeof langObj[mode] === "string"
      ? langObj[mode]
      : typeof langObj["short"] === "string"
      ? langObj["short"]
      : typeof langObj["long"] === "string"
      ? langObj["long"]
      : "";

  const buttons = Array.isArray(langObj.buttons) ? langObj.buttons : [];

  return { text: modeText, buttons };
}

function fallbackText(structureYaml: any, intentKey: string, lang: string) {
  const responses = structureYaml?.responses || {};
  const intentData = responses[intentKey];
  if (!intentData) return "";

  const langObj = intentData[lang] || intentData["it"] || intentData["en"];
  if (!langObj) return "";

  if (typeof langObj["fallback"] === "string") return langObj["fallback"];
  if (typeof langObj["short"] === "string") return langObj["short"];
  if (typeof langObj["long"] === "string") return langObj["long"];

  return "";
}

function findResponse(intentsCore: any, structureYaml: any, message: string) {
  const lang = safeField(structureYaml, "meta.language", "it");
  const mode: "short" | "long" = "short";

  const intentMatch = resolveIntent(message, intentsCore);
  const intentKey = intentMatch.key;

  // 1) Caso "fallback" puro → qui ha senso usare l'LLM come vero fallback
  if (intentKey === "fallback") {
    return {
      intent: intentKey,
      text: fallbackText(structureYaml, intentKey, lang),
      buttons: [] as any[],
      isFallback: true, // 👈 questo è l'unico caso in cui chiediamo LLM
    };
  }

  // 2) Per QUALSIASI altro intent:
  //    - lo consideriamo "coperto da YAML",
  //    - anche se stiamo usando il suo campo fallback interno
  const rendered = renderTemplate(structureYaml, intentKey, lang, mode);
  const baseText = rendered.text || fallbackText(structureYaml, intentKey, lang) || "";

  return {
    intent: intentKey,
    text: baseText,
    buttons: rendered.buttons ?? [],
    isFallback: false, // 👈 niente LLM: risposta 100% YAML
  };
}


async function runEngine({
  structureId,
  message,
}: {
  structureId: string;
  message: string;
}) {
  const intentsCore = await loadIntentsCore();
  const structureYaml = await loadStructure(structureId);
  const resp = findResponse(intentsCore, structureYaml, message);

  return {
    intent: resp.intent,
    lang: "it",
    meta: {
      mode: "short",
      uiButtons: resp.buttons,
      isFallback: resp.isFallback,
    },
    text: resp.text,
  };
}

// -----------------------------------------------------
// Fastify plugin
// -----------------------------------------------------

const chatRoutes: FastifyPluginAsync = async (app: FastifyInstance) => {
  // Debug: GET /_debug/chat/:structureId
  app.get(
    "/_debug/chat/:structureId",
    async (req, reply): Promise<any> => {
      try {
        const { structureId } = req.params as { structureId: string };
        const intentsCore = await loadIntentsCore();
        const structureYaml = await loadStructure(structureId);

        return reply.code(200).send({
          ok: true,
          structureId,
          meta: structureYaml?.meta || {},
          intentsCoreKeys: Object.keys(intentsCore || {}),
          responsesKeys: Object.keys(structureYaml?.responses || {}),
          sampleIntents: Object.keys(intentsCore || {}).slice(0, 5),
          sampleResponses: Object.keys(structureYaml?.responses || {}).slice(
            0,
            5
          ),
        });
      } catch (err: any) {
        const msg = err?.message || "Errore inatteso";
        return reply.code(500).send({ ok: false, error: msg, reply: msg });
      }
    }
  );

    // Retrocompatibilità: POST /chat (default structure)
  app.post("/chat", async (req, reply) => {
    try {
      const body = (req.body as any) || {};
      const message = String(body?.message ?? "").trim();
      const clientSessionId = body?.sessionId
        ? String(body.sessionId)
        : undefined;
      const lang = body?.lang ? String(body.lang) : undefined;

      if (!message) {
        return reply.code(400).send({
          ok: false,
          error: "Missing message",
          reply: "Missing message",
        });
      }

      const defaultStructure = "svapartments"; // retrocompat

      // 🧠 1) Assicuriamo / creiamo la sessione per questo utente
      const session = await ensureSessionForChat({
        structureId: defaultStructure,
        sessionId: clientSessionId,
        lang,
      });

      // 💾 2) Salviamo il messaggio dell’utente
      await saveMessage({
        sessionId: session.id,
        role: "user",
        content: message,
      });

      // 🧠 3) Motore YAML
      const out = await runEngine({ structureId: defaultStructure, message });

      // LLM fallback: se la risposta è di fallback YAML, attiva orchestratore + cache
      if (out?.meta?.isFallback === true) {
        const cacheKey = buildLlmCacheKey(defaultStructure, message);

        // 1) Prova cache
        const cachedRaw: any = cacheGet(cacheKey);
        if (cachedRaw) {
          try {
            const cached = JSON.parse(String(cachedRaw));

            const resp = {
              ...cached,
              source: (cached as any).source ?? "llm_cache",
              cacheHit: true,
              // 🔗 sessione sempre presente nella risposta
              sessionId: session.id,
            };

            return reply
              .header("X-NS-Source", "llm_cache")
              .code(200)
              .send(resp);
          } catch {
            // se il parse fallisce, proseguiamo con la chiamata LLM normale
          }
        }

        // 2) Nessun cache hit → chiama orchestratore
        const llmOut = await orchestrateChat(defaultStructure, message, {
          matched: false,
          intent: out.intent,
          confidence: 0.3,
        });

        // 3) Se la risposta è valida, salviamo in cache (serializzata)
        if (llmOut && (llmOut as any).ok !== false) {
          cacheSet(cacheKey, JSON.stringify(llmOut));
        }

        // 💾 4) Salviamo il messaggio dell’assistente (se c’è testo)
        const assistantText =
          (llmOut as any)?.reply ?? (llmOut as any)?.text ?? "";
        if (assistantText) {
          await saveMessage({
            sessionId: session.id,
            role: "assistant",
            content: String(assistantText),
          });
        }

        // 5) Risposta verso il widget con sessionId
        const resp = {
          ...(llmOut ?? {}),
          sessionId: session.id,
        };

        return reply.code(200).send(resp);
      }

      // Risposta YAML “normale” proveniente dal motore
      const replyText = out.text;

      // 💾 Salviamo anche la risposta YAML come messaggio assistant
      if (replyText) {
        await saveMessage({
          sessionId: session.id,
          role: "assistant",
          content: String(replyText),
        });
      }

      return reply
        .header("X-NS-Source", "yaml")
        .code(200)
        .send({
          ok: true,
          source: "yaml",
          intent: out.intent,
          confidence: 1.0,
          lang: out.lang,
          mode: out.meta?.mode ?? "short",
          text: replyText,
          reply: replyText,
          ui: { buttons: out.meta?.uiButtons ?? [] },
          // 🔗 restituiamo sempre la sessione al widget
          sessionId: session.id,
        });
    } catch (err: any) {
      const msg = err?.message || "Errore inatteso";
      return reply.code(500).send({ ok: false, error: msg, reply: msg });
    }
  });


  // Multistruttura: POST /chat/:structureId
  app.post("/chat/:structureId", async (req, reply) => {
    try {
      const { structureId } = req.params as { structureId: string };
      const body = (req.body as any) || {};
      const message = String(body?.message ?? "").trim();
      const clientSessionId = body?.sessionId
        ? String(body.sessionId)
        : undefined;
      const lang = body?.lang ? String(body.lang) : undefined;

      if (!message) {
        return reply.code(400).send({
          ok: false,
          error: "Missing message",
          reply: "Missing message",
        });
      }

      // 🧠 1) Assicuriamo / creiamo la sessione per questa struttura
      const session = await ensureSessionForChat({
        structureId,
        sessionId: clientSessionId,
        lang,
      });

      // 💾 2) Salviamo il messaggio dell’utente
      await saveMessage({
        sessionId: session.id,
        role: "user",
        content: message,
      });

      // --- [CORTO-CIRCUITO YAML: intent wifi] ---------------------------------
      // Normalizza testo: minuscole, dash unicode → '-', spazi compattati
      const norm = message
        .toLowerCase()
        .normalize("NFKC")
        .replace(/[\u2010-\u2015\u2212\uFE58\uFE63\uFF0D]/g, "-")
        .replace(/\s+/g, " ")
        .trim();

      // Regex robuste per "password + wi-fi/wifi" in qualunque ordine
      const wifiA = /\b(wi-?fi|wifi)\b.*\b(pass(?:word)?|pwd|chiave)\b/;
      const wifiB = /\b(pass(?:word)?|pwd|chiave)\b.*\b(wi-?fi|wifi)\b/;
      const wifiC = /qual\s*e'?\s*la\s*password.*wi-?fi/;

      if (wifiA.test(norm) || wifiB.test(norm) || wifiC.test(norm)) {
        const structure = await loadStructure(structureId || "svapartments");
        const outY = (structure?.responses as any)?.["wifi"];

        if (outY) {
          const sLang = (structure as any)?.meta?.language ?? "it";
          const langObj = (outY as any)[sLang] || (outY as any)["it"];

          if (langObj) {
            const textY =
              typeof langObj.short === "string"
                ? langObj.short
                : typeof langObj.long === "string"
                ? langObj.long
                : "";

            if (textY) {
              // 💾 Salviamo risposta assistant
              await saveMessage({
                sessionId: session.id,
                role: "assistant",
                content: String(textY),
              });

              return reply
                .header("X-NS-Source", "yaml")
                .code(200)
                .send({
                  ok: true,
                  source: "yaml",
                  intent: "wifi",
                  confidence: 1.0,
                  lang: sLang,
                  mode: "short",
                  text: textY,
                  reply: textY,
                  ui: (outY as any)?.ui
                    ? { buttons: (outY as any).ui.buttons ?? [] }
                    : { buttons: [] },
                  // 🔗 sempre sessionId verso il widget
                  sessionId: session.id,
                });
            }
          }
        }
        // Se manca l'output YAML per wifi, proseguiamo con la pipeline normale
      }
      // ------------------------------------------------------------------------

      const out = await runEngine({ structureId, message });

      // LLM fallback: se la risposta è di fallback YAML, attiva orchestratore + cache
      if (out?.meta?.isFallback === true) {
        const cacheKey = buildLlmCacheKey(structureId, message);

        // 1) Prova cache
        const cachedRaw: any = cacheGet(cacheKey);
        if (cachedRaw) {
          try {
            const cached = JSON.parse(String(cachedRaw));

            const resp = {
              ...cached,
              source: (cached as any).source ?? "llm_cache",
              cacheHit: true,
              sessionId: session.id,
            };

            return reply
              .header("X-NS-Source", "llm_cache")
              .code(200)
              .send(resp);
          } catch {
            // se il parse fallisce, proseguiamo con la chiamata LLM normale
          }
        }

        // 2) Nessun cache hit → chiama orchestratore
        const llmOut = await orchestrateChat(structureId, message, {
          matched: false,
          intent: out.intent,
          confidence: 0.0,
        });

        // 3) Se la risposta è valida, salviamo in cache (serializzata)
        if (llmOut && (llmOut as any).ok !== false) {
          cacheSet(cacheKey, JSON.stringify(llmOut));
        }

        // 💾 Salviamo il messaggio dell’assistente (se c’è testo)
        const assistantText =
          (llmOut as any)?.reply ?? (llmOut as any)?.text ?? "";
        if (assistantText) {
          await saveMessage({
            sessionId: session.id,
            role: "assistant",
            content: String(assistantText),
          });
        }

        const resp = {
          ...(llmOut ?? {}),
          sessionId: session.id,
        };

        return reply.code(200).send(resp);
      }

      // Risposta YAML “normale” proveniente dal motore
      const replyText = out.text;

      // 💾 Salviamo anche la risposta YAML come messaggio assistant
      if (replyText) {
        await saveMessage({
          sessionId: session.id,
          role: "assistant",
          content: String(replyText),
        });
      }

      return reply
        .header("X-NS-Source", "yaml")
        .code(200)
        .send({
          ok: true,
          source: "yaml",
          intent: out.intent,
          confidence: 1.0,
          lang: out.lang,
          mode: out.meta?.mode ?? "short",
          text: replyText,
          reply: replyText,
          ui: { buttons: out.meta?.uiButtons ?? [] },
          sessionId: session.id,
        });
    } catch (err: any) {
      const msg = err?.message || "Errore inatteso";
      return reply.code(500).send({ ok: false, error: msg, reply: msg });
    }
  });

};

// normalizza testo: minuscole, rimuovi accenti, togli punteggiatura,
// unifica trattini/spazi per far combaciare "wi-fi" == "wifi"
function norm(s: string) {
  return String(s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[_\-]+/g, " ")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// esporti entrambi i modi (default + named) per compatibilità con l'import
export { chatRoutes };
export default chatRoutes;
