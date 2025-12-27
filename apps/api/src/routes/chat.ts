// apps/api/src/routes/chat.ts
import type { FastifyInstance, FastifyPluginAsync } from "fastify";

import { orchestrateChat } from "../core/orchestrator.js";
import { loadIntentsCore, loadStructure, loadLangPack } from "../content/loader.js";

import { cacheGet, cacheSet } from "../core/runtimeGuards.js";
import {
  ensureSessionForChat,
  saveMessage,
  getRecentMessages,
} from "../services/sessionService.js";

import path from "node:path";


// -----------------------------------------------------
// Helpers (base)

function safeField(obj: any, pathStr: string, defaultValue: any = undefined) {
  try {
    const parts = pathStr.split(".");
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
// Cache

const LLM_CACHE_PREFIX = "llm:chat:";

function buildLlmCacheKey(structureId: string, message: string, lang?: string) {
  const s = norm(message);
  const l = String(lang || "it").slice(0, 2).toLowerCase();
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
    if (t.includes(n)) score -= 5;
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

  // override euristici per intent base (tieni qui la tua logica)
  if (/\bwi\s*fi\b/.test(t) || t.includes("wifi") || t.includes("ssid")) {
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

  if (!top || top.score <= 0) return { key: "fallback", score: 0, matched: false };
  return top;
}

// -----------------------------------------------------
// Template & fallback (✅ aggiornati a intents + output)

// {{path.to.value}} → structureYaml[path.to.value]
function resolvePath(obj: any, pathStr: string): any {
  if (!obj || typeof pathStr !== "string") return undefined;

  return pathStr.split(".").reduce((acc: any, key: string) => {
    if (acc && Object.prototype.hasOwnProperty.call(acc, key)) return acc[key];
    return undefined;
  }, obj);
}

function applyTemplateToText(text: string, structureYaml: any): string {
  if (typeof text !== "string" || text.indexOf("{{") === -1) return text;

  return text.replace(/\{\{\s*([^}]+)\s*\}\}/g, (_match, expr) => {
    const pathStr = String(expr || "").trim();
    if (!pathStr) return "";

    const value = resolvePath(structureYaml, pathStr);
    if (value === undefined || value === null) return "";

    return typeof value === "string" ? value : String(value);
  });
}



function fallbackText(
  structureYaml: any,
  intentKey: string,
  lang: string
): string {
  if (!structureYaml || typeof structureYaml !== "object") return "";

  // 1) fallback specifico dell'intent
  const intentFallback =
    safeField(structureYaml, `intents.${intentKey}.output.fallback`) ??
    safeField(structureYaml, `intents.${intentKey}.output.short`);

  if (typeof intentFallback === "string" && intentFallback.trim()) {
    return applyTemplateToText(intentFallback, structureYaml);
  }

  // 2) fallback globale struttura
  const globalFallback =
    safeField(structureYaml, "content.fallback.default") ??
    safeField(structureYaml, "content.fallback.generic");

  if (typeof globalFallback === "string" && globalFallback.trim()) {
    return applyTemplateToText(globalFallback, structureYaml);
  }

  // 3) ultima rete di sicurezza
  return "";
}


// -----------------------------------------------------
// Language packs (src/content/lang in dev, dist/content/lang in prod)
// Path: apps/api/src/routes/chat.ts -> ../content/lang



function resolveIntentVars(
  intentDef: any,
  structureYaml: any
): Record<string, any> {
  const out: Record<string, any> = {};

  const vars =
    intentDef?.vars && typeof intentDef.vars === "object"
      ? intentDef.vars
      : {};

  // lingua corrente + fallback
  const lang =
    structureYaml?.meta?.default_locale ||
    structureYaml?.default_locale ||
    "it";

  for (const [k, v] of Object.entries(vars)) {
    // Caso 1: stringa → comportamento attuale (immutato)
    if (typeof v === "string") {
      // es: "{{content.wifi.ssid}}"
      out[k] = applyTemplateToText(v, structureYaml);
      continue;
    }

    // Caso 2: null / undefined
    if (v === undefined || v === null) {
      out[k] = "";
      continue;
    }

    // Caso 3: oggetto → possibile valore per-lingua { it, en, ... }
    if (typeof v === "object") {
      // es: { it: "...", en: "..." }
      if (typeof (v as any)[lang] === "string") {
        out[k] = (v as any)[lang];
        continue;
      }

      // fallback su italiano
      if (typeof (v as any).it === "string") {
        out[k] = (v as any).it;
        continue;
      }

      // ultimo fallback: stringificazione sicura
      out[k] = "";
      continue;
    }

    // Caso 4: qualunque altro tipo (number, boolean, ecc.)
    out[k] = String(v);
  }

  return out;
}


function renderVars(template: string, vars: Record<string, any>): string {
  if (typeof template !== "string" || template.indexOf("{{") === -1) return template;

  return template.replace(/\{\{\s*([^}]+)\s*\}\}/g, (_m, expr) => {
    const key = String(expr || "").trim();
    if (!key) return "";

    // se è una var diretta (ssid/password/hotel_name), sostituisci
    if (Object.prototype.hasOwnProperty.call(vars, key)) {
      const v = vars[key];
      return v === undefined || v === null ? "" : String(v);
    }

    // altrimenti lascia intatto: poi lo risolve applyTemplateToText (content.xxx)
    return `{{${key}}}`;
  });
}

async function renderTemplate(
  structureYaml: any,
  intentKey: string,
  lang: string,
  mode: "short" | "long"
): Promise<{ text: string; buttons: any[] }> {
  const intents = structureYaml?.intents || {};
  const intentDef = intents[intentKey];

  if (!intentDef || typeof intentDef !== "object") {
    return { text: "", buttons: [] };
  }

  // 1) NUOVO: reply_key -> language pack (lang -> fallback it)
  const replyKey = intentDef.reply_key;
  if (typeof replyKey === "string" && replyKey.trim()) {
      const overrideKey =
    (typeof (intentDef as any).override_key === "string" &&
      (intentDef as any).override_key.trim())
      ? (intentDef as any).override_key.trim()
      : replyKey.trim();

  // 0) PRIMA PRIORITÀ: copy_overrides (cliente)
    const overrideTpl =
    structureYaml &&
    (structureYaml as any).content &&
    (structureYaml as any).content.copy_overrides &&
    typeof (structureYaml as any).content.copy_overrides === "object"
      ? (structureYaml as any).content.copy_overrides[overrideKey]
      : undefined;


  if (typeof overrideTpl === "string" && overrideTpl.trim()) {
    const vars = resolveIntentVars(intentDef, structureYaml);
    const text = renderVars(overrideTpl, vars);
    const buttons =
      Array.isArray(intentDef?.output?.ui?.buttons) ? intentDef.output.ui.buttons : [];
    return { text, buttons };
  }

  const pack = await loadLangPack(lang);
let template = pack?.[replyKey];

if (template === undefined) {
  const itPack = await loadLangPack("it");
  template = itPack?.[replyKey];
}


    if (typeof template === "string" && template.trim()) {
      const vars = resolveIntentVars(intentDef, structureYaml);

      // (a) sostituisci vars ({{ssid}} ecc)
      let text = renderVars(template, vars);

      // (b) poi risolvi eventuali {{content.xxx}} o simili
      text = applyTemplateToText(text, structureYaml);

      // bottoni: compatibile con schema output.ui.buttons (se presente)
      const buttons =
        Array.isArray(intentDef?.output?.ui?.buttons) ? intentDef.output.ui.buttons : [];

      return { text, buttons };
    }
  }

  // 2) BACKWARD COMPAT: vecchio schema output
  const output = intentDef.output || {};
  let text = "";

  if (typeof output.fallback === "string") text = output.fallback;
  else if (typeof output.default === "string") text = output.default;
  else if (mode === "long" && typeof output.long === "string") text = output.long;
  else if (typeof output.short === "string") text = output.short;
  else if (typeof output.long === "string") text = output.long;

  text = applyTemplateToText(text, structureYaml);

  const buttons =
    Array.isArray(output?.ui?.buttons) ? output.ui.buttons : [];

  return { text, buttons };
}



// Engine
// -----------------------------------------------------

function resolveEffectiveLang(inputLang: string | undefined, structureYaml: any): string {
  const fromBody = inputLang ? String(inputLang) : "";
  if (fromBody) return fromBody.slice(0, 2).toLowerCase();

  const metaLang =
    safeField(structureYaml, "meta.language") ??
    safeField(structureYaml, "meta.default_locale") ??
    "it";

  return String(metaLang || "it").slice(0, 2).toLowerCase();
}

async function findResponse(
  intentsCore: any,
  structureYaml: any,
  message: string,
  lang: string
) {
  const mode: "short" | "long" = "short";

  const intentMatch = resolveIntent(message, intentsCore);
  const intentKey = intentMatch.key;

  // 1) fallback "puro" (nessun match): qui ha senso l'LLM
  if (intentKey === "fallback") {
    return {
      intent: intentKey,
      text: fallbackText(structureYaml, intentKey, lang),
      buttons: [] as any[],
      isFallback: true,
    };
  }

  // 2) Qualsiasi altro intent: risposta YAML (anche se usa output.fallback interno)
  const rendered = await renderTemplate(structureYaml, intentKey, lang, mode);
  const baseText =
    (rendered.text && String(rendered.text).trim())
      ? rendered.text
      : (fallbackText(structureYaml, intentKey, lang) || "");

  return {
    intent: intentKey,
    text: baseText,
    buttons: rendered.buttons ?? [],
    isFallback: false,
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

  const effectiveLang = resolveEffectiveLang(lang, structureYaml);

  const resp = await findResponse(intentsCore, structureYaml, message, effectiveLang);

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
