// apps/api/src/routes/chat.ts
import type { FastifyInstance, FastifyPluginAsync } from "fastify";
import { orchestrateChat } from "../core/orchestrator.js";
import { loadIntentsCore, loadStructure } from "../content/loader.js";
import { cacheGet, cacheSet } from "../core/runtimeGuards.js";
import {
  ensureSessionForChat,
  saveMessage,
  getRecentMessages, // 👈 NEW
} from "../services/sessionService.js";


// -----------------------------------------------------
// Cache

const LLM_CACHE_PREFIX = "llm:chat:";

function buildLlmCacheKey(structureId: string, message: string, lang: string) {
  const s = norm(message);
  const l = (lang ?? "it").toLowerCase();
  return `${LLM_CACHE_PREFIX}${structureId}:${l}:${s}`;
}


// -----------------------------------------------------
// Types

type IntentMatch = {
  key: string;
  score: number;
  matched: boolean;
};

type EngineOutput = {
  intent: string | null;
  lang: string;
  text: string;
  meta: {
    mode: "short" | "long";
    uiButtons: any[];
    isFallback: boolean;
  };
};

// -----------------------------------------------------
// Helpers

function safeField(obj: any, path: string, defaultValue: any = undefined) {
  try {
    const parts = path.split(".");
    let current = obj;
    for (const p of parts) {
      if (!current || typeof current !== "object") return defaultValue;
      current = current[p];
    }
    return current ?? defaultValue;
  } catch {
    return defaultValue;
  }
}

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

// -----------------------------------------------------
// Intent scoring

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

  const intents: IntentMatch[] = Object.entries(intentsCore || {}).map(
    ([key, value]) => {
      const intent = value as any;
      const { score, matched } = scoreIntent(t, intent);
      return { key, score, matched };
    }
  );

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

// -----------------------------------------------------
// Template & fallback (✅ aggiornati a intents + output)
// -----------------------------------------------------

// Piccolo sistema di template: {{path.to.value}} → structureYaml[path.to.value]
function resolvePath(obj: any, path: string): any {
  if (!obj || typeof path !== "string") return undefined;

  return path.split(".").reduce((acc: any, key: string) => {
    if (acc && Object.prototype.hasOwnProperty.call(acc, key)) {
      return acc[key];
    }
    return undefined;
  }, obj);
}

function applyTemplateToText(text: string, structureYaml: any): string {
  if (typeof text !== "string" || text.indexOf("{{") === -1) {
    return text;
  }

  return text.replace(/\{\{\s*([^}]+)\s*\}\}/g, (_match, expr) => {
    const path = (expr || "").trim();
    if (!path) return "";

    const value = resolvePath(structureYaml, path);
    if (value === undefined || value === null) return "";

    if (typeof value === "string") return value;
    return String(value);
  });
}

function applyYamlTemplate(text: string, yaml: any): string {
  if (!text || typeof text !== "string") return text;

  return text.replace(/\{\{\s*([^}]+)\s*\}\}/g, (_, path) => {
    const parts = path.split(".");
    let current = yaml;

    for (const p of parts) {
      if (!current || typeof current !== "object") return "";
      current = current[p];
    }

    return typeof current === "string" ? current : "";
  });
}


function renderTemplate(
  structureYaml: any,
  intentKey: string,
  lang: string,
  mode: "short" | "long"
): { text: string; buttons: any[] } {
  // Nuovo schema: structureYaml.intents[intentKey].output
  const intents = structureYaml?.intents || {};
  const intentDef = intents[intentKey];

  if (!intentDef || typeof intentDef !== "object") {
    return { text: "", buttons: [] };
  }

  const output = intentDef.output || {};
  let text = "";

  // 1) prova la variante richiesta (short/long)
  if (mode === "short" && typeof output.short === "string") {
    text = output.short;
  } else if (mode === "long" && typeof output.long === "string") {
    text = output.long;
  }

  // 2) fallback su "default"
  if (!text && typeof output.default === "string") {
    text = output.default;
  }

  // 3) fallback ulteriori
  if (!text && typeof output.short === "string") {
    text = output.short;
  }
  if (!text && typeof output.long === "string") {
    text = output.long;
  }

  // 🔹 NUOVO: applica i template {{...}} usando structureYaml
  text = applyTemplateToText(text, structureYaml);

  // 4) UI buttons opzionali, da schema:
  //    output.ui?.buttons: [{ id, label }, ...]
  const buttons =
    output?.ui && Array.isArray(output.ui.buttons)
      ? output.ui.buttons
      : [];

const finalText = applyYamlTemplate(text, structureYaml.content || {});
return { text: finalText, buttons };
}


function fallbackText(structureYaml: any, intentKey: string, lang: string) {
  const intents = structureYaml?.intents || {};
  const intentDef = intents[intentKey];

  if (!intentDef || typeof intentDef !== "object") {
    return "";
  }

  const output = intentDef.output || {};
  let text = "";

  if (typeof output.fallback === "string") {
    text = output.fallback;
  } else if (typeof output.default === "string") {
    text = output.default;
  } else if (typeof output.short === "string") {
    text = output.short;
  } else if (typeof output.long === "string") {
    text = output.long;
  }

  return applyTemplateToText(text, structureYaml);
}


// -----------------------------------------------------
// Engine
// -----------------------------------------------------

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
  const baseText =
    rendered.text || fallbackText(structureYaml, intentKey, lang) || "";

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
  lang,
  }: {
  structureId: string;
  message: string;
  lang?: string;
  }): Promise<EngineOutput> {

  const intentsCore = await loadIntentsCore();
  const structureYaml = await loadStructure(structureId);
  const resp = findResponse(intentsCore, structureYaml, message);
  const effectiveLang =
    lang ?? String(safeField(structureYaml, "meta.language", "it"));


  return {
    intent: resp.intent,
    lang: effectiveLang,
    meta: {
      mode: "short",
      uiButtons: resp.buttons,
      isFallback: resp.isFallback,
    },
    text: resp.text,
  };
}

// -----------------------------------------------------
// Routes
// -----------------------------------------------------

const chatRoutes: FastifyPluginAsync = async (app: FastifyInstance) => {
  // Debug: GET /_debug/chat/:structureId?q=...
  app.get("/_debug/chat/:structureId", async (req, reply) => {
    try {
      const { structureId } = req.params as { structureId: string };
      const { q } = (req.query as any) || {};

      const intentsCore = await loadIntentsCore();
      const structureYaml = await loadStructure(structureId);
      const intentMatch = resolveIntent(String(q ?? ""), intentsCore);

      return reply.code(200).send({
        ok: true,
        structureId,
        query: q,
        intentMatch,
        sampleYaml: {
          meta: structureYaml?.meta,
          hasIntents: !!structureYaml?.intents,
          intentsKeys: Object.keys(structureYaml?.intents || {}),
          responsesKeys: Object.keys(structureYaml?.responses || {}),
          sampleIntents: Object.keys(intentsCore || {}).slice(0, 5),
          sampleResponses: Object.keys(structureYaml?.responses || {}).slice(
            0,
            5
          ),
        },
      });
    } catch (err: any) {
      const msg = err?.message || "Errore inatteso";
      return reply.code(500).send({ ok: false, error: msg, reply: msg });
    }
  });

  // Retrocompatibilità: POST /chat (default structure)
  app.post("/chat", async (req, reply) => {
    try {
      const body = (req.body as any) || {};
      const message = String(body?.message ?? "").trim();
      const clientSessionId = body?.sessionId
        ? String(body.sessionId)
        : undefined;
      const lang = body?.lang ? String(body.lang) : undefined;

      const modeRaw = (body?.mode ?? "default") as string;
      const mode: "default" | "future" =
      modeRaw === "future" ? "future" : "default";


  



      if (!message) {
        return reply.code(400).send({
          ok: false,
          error: "Missing message",
          reply: "Missing message",
        });
      }

        const defaultStructure =
        mode === "future" ? "nextsphere-future" : "nextsphere";

            const hotel = body?.hotel ? String(body.hotel) : undefined;
      const room  = body?.room  ? String(body.room)  : undefined;

      // Se hotel è passato dal widget, lo usiamo come structureId.
      // Altrimenti manteniamo il comportamento attuale.
      const structureId = hotel || defaultStructure;


      // 1) Sessione
      const session = await ensureSessionForChat({
        structureId,
        sessionId: clientSessionId,
        lang,
          // Se un domani vorrai salvare anche il room nella sessione:
          // roomId: room,
      });

      // 💾 2) Salviamo il messaggio dell’utente
     // 💾 2) Salviamo il messaggio dell’utente
      await saveMessage({
        sessionId: session.id,
        role: "user",
        content: message,
        source: "user",
        intent: null,
        isFallback: null,
        });


      // 🧠 3) Motore YAML
      const out = await runEngine({ structureId, message, lang });

      // LLM fallback: se la risposta è di fallback YAML, attiva orchestratore + cache
      if (out?.meta?.isFallback === true) {
        const cacheKey = buildLlmCacheKey(defaultStructure, message, out.lang ?? lang ?? "it");

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

            // 💾 salviamo anche la risposta cached come assistant
            const assistantText =
              (cached as any)?.reply ?? (cached as any)?.text ?? "";
           if (assistantText) {
  await saveMessage({
    sessionId: session.id,
    role: "assistant",
    content: String(assistantText),
    intent: out.intent ?? null,
    source: "llm",
    isFallback: true,
  });
}


            return reply.code(200).send(resp);
          } catch {
            // se la cache è corrotta, proseguiamo senza
          }
        }

        // 2) Se niente cache → chiamiamo LLM con history
        const historyRows = await getRecentMessages({
          sessionId: session.id,
          limit: 6,
        });

        // convertiamo in [{ role, content }] per l'LLM
        const history = historyRows.map(
          (m): { role: "assistant" | "user"; content: string } => ({
            role: m.role === "assistant" ? "assistant" : "user",
            content: m.content,
          })
        );

        const llmOut = await orchestrateChat(defaultStructure, message, {
          matched: false,
          intent: out.intent ?? undefined,
          confidence: 0.3,
          history, // 👈 NEW
          lang: out.lang ?? lang ?? "it",
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
    intent: out.intent ?? null,
    source: "yaml",
    isFallback: false,
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

    // 👇 nuovo: leggiamo il mode dal body ("default" | "future")
    const modeRaw = (body?.mode ?? "default") as string;
    const mode: "default" | "future" =
      modeRaw === "future" ? "future" : "default";

    // 👇 nuovo: se siamo in future, usiamo la struttura "-future"
    const effectiveStructureId =
      mode === "future" ? `${structureId}-future` : structureId;

    if (!message) {
      return reply.code(400).send({
        ok: false,
        error: "Missing message",
        reply: "Missing message",
      });
    }

    // 1) Sessione
    const session = await ensureSessionForChat({
      structureId: effectiveStructureId,
      sessionId: clientSessionId,
      lang,
    });

    // 💾 2) Salviamo il messaggio dell’utente

    await saveMessage({
      sessionId: session.id,
      role: "user",
      content: message,
      source: "user",
      intent: null,
      isFallback: null,
      });


    // 🧠 3) Motore YAML
    const out = await runEngine({ structureId: effectiveStructureId, message, lang });

    // LLM fallback: se la risposta è di fallback YAML, attiva orchestratore + cache
    if (out?.meta?.isFallback === true) {
      const cacheKey = buildLlmCacheKey(effectiveStructureId, message, out.lang ?? lang ?? "it");
      // ... il resto del blocco rimane identico


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

            const assistantText =
              (cached as any)?.reply ?? (cached as any)?.text ?? "";
           if (assistantText) {
  await saveMessage({
    sessionId: session.id,
    role: "assistant",
    content: String(assistantText),
    intent: out.intent ?? null,
    source: "llm",
    isFallback: true,
  });
}


            return reply.code(200).send(resp);
          } catch {
            // se cache corrotta → proseguiamo senza
          }
        }

        const historyRows = await getRecentMessages({
          sessionId: session.id,
          limit: 6,
        });

        const history = historyRows.map(
          (m): { role: "assistant" | "user"; content: string } => ({
            role: m.role === "assistant" ? "assistant" : "user",
            content: m.content,
          })
        );

        const llmOut = await orchestrateChat(structureId, message, {
          matched: false,
          intent: out.intent ?? undefined,
          confidence: 0.3,
          history,
          lang: out.lang ?? lang ?? "it",
        });

        if (llmOut && (llmOut as any).ok !== false) {
          cacheSet(cacheKey, JSON.stringify(llmOut));
        }

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

      const replyText = out.text;

      if (replyText) {
  await saveMessage({
    sessionId: session.id,
    role: "assistant",
    content: String(replyText),
    intent: out.intent ?? null,
    source: "yaml",
    isFallback: false,
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

export default chatRoutes;
export { chatRoutes };
