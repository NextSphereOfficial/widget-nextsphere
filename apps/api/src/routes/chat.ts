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

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function includesWord(t: string, w: string) {
  if (!t || !w) return false;
  const re = new RegExp(`\\b${escapeRegExp(w)}\\b`, "i");
  return re.test(t);
}


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
  if (includesWord(t, s)) {
    score += 5;
    matched = true;
  }
}


for (const k of allKeywords) {
  if (includesWord(t, k)) {
    score += 3;
    matched = true;
  }
}


for (const p of allPatterns) {
  try {
    // Se il pattern contiene caratteri "da regex", trattalo come regex.
    // Altrimenti, trattalo come frase letterale a token (no substring).
    const looksRegex = /[.*+?^${}()|[\]\\]/.test(p);

    if (looksRegex) {
      const re = new RegExp(p, "i");
      if (re.test(t)) {
        score += 4;
        matched = true;
      }
    } else {
      // match letterale su token/frase (no substring)
      // Qui NON usare \b...\b su frasi: usa una regex che gestisca spazi/punteggiatura
      const phrase = escapeRegExp(p).replace(/\s+/g, "\\s+");
      const re = new RegExp(`(^|\\s)${phrase}(\\s|$)`, "i");
      if (re.test(t)) {
        score += 4;
        matched = true;
      }
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

  // Heuristica: keyword singola → non forzare intent "welcome" e preferisci fallback/LLM
  const tokens = t.split(" ").filter(Boolean);
  const isSingleWord = tokens.length === 1;


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
  // Guardrail: su singola parola evita intent "welcome" (anche se score alto)
if (isSingleWord && top && top.key === "welcome" && !/^(ciao|salve|buongiorno|buonasera|hello|hi|hey|hola|hallo|bonjour|salut|bonsoir)\b/.test(t)) {
  return { key: "fallback", score: 0, matched: false };
}



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
  structureYaml: any,
  lang: string
): Record<string, any> {
  const out: Record<string, any> = {};
  const vars =
    intentDef?.vars && typeof intentDef.vars === "object" ? intentDef.vars : {};

  const defaultLocale =
    structureYaml?.meta?.default_locale || structureYaml?.default_locale || "it";

  const pickLang = (val: any) => {
    if (val && typeof val === "object") {
      if (typeof val[lang] === "string") return val[lang];
      if (typeof val[defaultLocale] === "string") return val[defaultLocale];
      if (typeof val.it === "string") return val.it;
      return "";
    }
    return val === undefined || val === null ? "" : String(val);
  };

  const getContentPath = (path: string) => {
    // path esempio: "parking.note"
    const parts = path.split(".");
    let cur: any = structureYaml?.content;
    for (const p of parts) {
      if (!cur || typeof cur !== "object") return undefined;
      cur = cur[p];
    }
    return cur;
  };

  for (const [k, v] of Object.entries(vars)) {
    if (typeof v === "string") {
      // Caso ottimizzato: "{{content.xxx.yyy}}"
      const m = v.match(/^\{\{\s*content\.([a-zA-Z0-9_.-]+)\s*\}\}$/);
      if (m) {
        const raw = getContentPath(m[1]);
        out[k] = pickLang(raw);
        continue;
      }

      // fallback: comportamento attuale
      const resolved = applyTemplateToText(v, structureYaml);
      out[k] = pickLang(resolved);
      continue;
    }

    if (v === undefined || v === null) {
      out[k] = "";
      continue;
    }

    out[k] = pickLang(v);
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
    const vars = resolveIntentVars(intentDef, structureYaml, lang);
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
      const vars = resolveIntentVars(intentDef, structureYaml, lang);

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

// Helpers (shared)
// ----------------
function pickLocalizedText(val: any, lang: string) {
  if (val == null) return "";
  if (typeof val === "string") return val;

  // oggetto per-lingua { it, en, de, fr, es }
  if (typeof val === "object") {
    const tryKeys = [lang, "en", "it", "de", "fr", "es"];
    for (const k of tryKeys) {
      const v = (val as any)?.[k];
      if (typeof v === "string" && v.trim()) return v;
    }
  }

  // fallback: tenta stringify
  try {
    return JSON.stringify(val);
  } catch {
    return String(val);
  }
}

function sanitizeYamlReply(text: string, userMessage: string, intent?: string) {
  let t = String(text || "").trim();
  if (!t) return t;

  const um = norm(userMessage);
  const userIsGreeting =
    /^(ciao|salve|buongiorno|buonasera|hello|hi|hey|hola|hallo|bonjour|salut|bonsoir)\b/.test(um);

  // ✅ Taglia l’eventuale “welcome” SOLO se:
  // - l’utente NON sta salutando
  // - e NON siamo nell’intent welcome (che deve restare integro)
  if (!userIsGreeting && intent !== "welcome") {
    const parts = t
      .split(/(?<=[.!?])\s+/)
      .map((x) => x.trim())
      .filter(Boolean);

    if (parts.length > 1) {
      const first = norm(parts[0]);
      const looksWelcome =
        first.includes("benvenut") ||
        first.includes("welcome") ||
        first.includes("bienvenid") ||
        first.includes("willkomm") ||
        first.includes("bienvenue");

      if (looksWelcome) {
        parts.shift();
        t = parts.join(" ").trim();
      }
    }
  }

  // Stile: massimo 3 frasi (ma NON tocchiamo risposte corte tipo wifi)
  const sents = t
    .split(/(?<=[.!?])\s+/)
    .map((x) => x.trim())
    .filter(Boolean);

  if (sents.length > 3) t = sents.slice(0, 3).join(" ").trim();

  return t;
}



function noInfoText(lang: string) {
  switch ((lang || "it").toLowerCase()) {
    case "en":
      return "I don’t have that information yet. Please contact the host if you need it right now.";
    case "de":
      return "Diese Information habe ich noch nicht. Bitte kontaktiere den Gastgeber, wenn du sie sofort brauchst.";
    case "fr":
      return "Je n’ai pas encore cette information. Contactez l’hôte si vous en avez besoin tout de suite.";
    case "es":
      return "Aún no tengo esa información. Contacta con el anfitrión si la necesitas ahora mismo.";
    default:
      return "Non ho ancora questa informazione. Se ti serve subito, contatta l’host.";
  }
}




type ChatMode = "default" | "future";

async function handleChatRequest(
  req: any,
  reply: any,
  resolvedStructureId: string
) {
  const body = (req.body as any) || {};
  const message = String(body?.message ?? "").trim();
  const clientSessionId = body?.sessionId ? String(body.sessionId) : undefined;
  const lang = body?.lang ? String(body.lang) : undefined;

  if (!message) {
    return reply.code(400).send({
      ok: false,
      error: "Missing message",
      reply: "Missing message",
    });
  }

  // 1) Sessione
  const session = await ensureSessionForChat({
    structureId: resolvedStructureId,
    sessionId: clientSessionId,
    lang,
    // roomId: body?.room ? String(body.room) : undefined, // opzionale
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
  const out = await runEngine({ structureId: resolvedStructureId, message, lang });

  // LLM fallback: se la risposta è di fallback YAML, attiva orchestratore + cache
  if (out?.meta?.isFallback === true) {
    const cacheKey = buildLlmCacheKey(
      resolvedStructureId,
      message,
      out.lang ?? lang ?? "it"
    );

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
        // cache corrotta → proseguiamo senza cache
      }
    }

    // 2) Se niente cache → chiamiamo LLM con history
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

    const llmOut = await orchestrateChat(
      resolvedStructureId,
      message,
      {
        matched: false,
        intent: out.intent ?? undefined,
        confidence: 0.3,
        history,
        lang: out.lang ?? lang ?? "it",
      },
      lang // reqLang dal widget
    );

    // 3) Se la risposta è valida, salviamo in cache (serializzata)
    if (llmOut && (llmOut as any).ok !== false) {
      cacheSet(cacheKey, JSON.stringify(llmOut));
    }

    // 💾 4) Salviamo il messaggio dell’assistente (se c’è testo)
    const assistantText = (llmOut as any)?.reply ?? (llmOut as any)?.text ?? "";
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

    const resp = {
      ...(llmOut ?? {}),
      sessionId: session.id,
    };

    return reply.code(200).send(resp);
  }

  // ✅ Risposta YAML “normale” (mai vuota / mai oggetto non risolto)
  const replyLang = (out.lang ?? lang ?? "it").toLowerCase();
  const replyTextRaw = out.text;
  const replyText = pickLocalizedText(replyTextRaw, replyLang).trim();
  const baseReply = replyText ? replyText : noInfoText(replyLang);
  const safeReply = sanitizeYamlReply(baseReply, message, out.intent ?? undefined) || noInfoText(replyLang);


  // 💾 Salviamo SEMPRE una risposta assistant (safeReply non è mai vuota)
  await saveMessage({
    sessionId: session.id,
    role: "assistant",
    content: String(safeReply),
    intent: out.intent ?? null,
    source: "yaml",
    isFallback: false,
  });

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
      text: safeReply,
      reply: safeReply,
      ui: { buttons: out.meta?.uiButtons ?? [] },
      sessionId: session.id,
    });
}

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
          sampleResponses: Object.keys(structureYaml?.responses || {}).slice(0, 5),
        },
      });
    } catch (err: any) {
      const msg = err?.message || "Errore inatteso";
      return reply.code(500).send({ ok: false, error: msg, reply: msg });
    }
  });

  // Retrocompatibilità: POST /chat (default structure + support ?hotel=SV001)
  app.post("/chat", async (req, reply) => {
    try {
      const body = (req.body as any) || {};

      const modeRaw = (body?.mode ?? "default") as string;
      const mode: ChatMode = modeRaw === "future" ? "future" : "default";

      const defaultStructure =
        mode === "future" ? "nextsphere-future" : "nextsphere";

      const hotel = body?.hotel ? String(body.hotel) : undefined;
      // const room  = body?.room  ? String(body.room)  : undefined; // opzionale

      // Se hotel è passato dal widget, lo usiamo come structureId.
      // Altrimenti manteniamo il comportamento attuale.
      const structureId = hotel || defaultStructure;

      return await handleChatRequest(req, reply, structureId);
    } catch (err: any) {
      const msg = err?.message || "Errore inatteso";
      return reply.code(500).send({ ok: false, error: msg, reply: msg });
    }
  });

  // Multistruttura: POST /chat/:structureId (+ mode future -> suffix -future)
  app.post("/chat/:structureId", async (req, reply) => {
    try {
      const { structureId } = req.params as { structureId: string };
      const body = (req.body as any) || {};

      const modeRaw = (body?.mode ?? "default") as string;
      const mode: ChatMode = modeRaw === "future" ? "future" : "default";

      const effectiveStructureId =
        mode === "future" ? `${structureId}-future` : structureId;

      return await handleChatRequest(req, reply, effectiveStructureId);
    } catch (err: any) {
      const msg = err?.message || "Errore inatteso";
      return reply.code(500).send({ ok: false, error: msg, reply: msg });
    }
  });
};

export default chatRoutes;
export { chatRoutes };
