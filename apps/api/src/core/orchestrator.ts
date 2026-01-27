import { buildContext } from './buildContext.js';
import { decideResponse } from './decision.js';
import { callLlm } from './llmClient.js';
import {
  canCallLlm,
  registerLlmSuccess,
  registerLlmFailure,
  getRuntimeSnapshot,
  cacheGet,
  cacheSet,
} from './runtimeGuards.js';
import crypto from 'node:crypto';
import { loadIntentsCore, loadStructure } from "../content/loader.js";
import { renderReplyKey } from "./logic/templateEngine.js";
import { resolveIntent } from "./logic/intentResolver.js";
import { pickLocalizedText, noInfoText, sanitizeYamlReply, parseTimeFromText } from './logic/sanitize.js';

/**
 * Style & Behavior Guide v1.1 (Lumo) — Regole GLOBALI (no info hardcoded sulla location).
 */
const LUMO_SYSTEM_RULES = `
Sei Lumo, un concierge digitale per ospiti in appartamenti turistici.

STILE (OBBLIGATORIO):
- Risposte brevi e chiare: di default 1–3 frasi.
- Tono caloroso ma non stucchevole; utile e pratico.
- Emoji rare (al massimo una, e solo se naturale).
- Niente spiegazioni inutili, niente “preamboli”.

DIVIETI:
- Non dire mai di essere un’AI o un modello.
- Non fare presentazioni/benvenuti (es. “Benvenuto… Sono qui per aiutarti…”) a meno che l’utente stia chiaramente salutando o stia iniziando la chat con un saluto.
- Non inventare mai luoghi, nomi di attività, indirizzi, orari o disponibilità non presenti nel contesto.
- Non affermare di “vedere” l’appartamento, la posizione dell’utente o lo stato reale della casa.

COMPORTAMENTO:
- Massimo UNA domanda di chiarimento per turno.
- Se fai una domanda di chiarimento e l’utente risponde, NON fare una seconda domanda sullo stesso tema: procedi con la soluzione migliore possibile.

- Se la richiesta è generica o ambigua (es. una sola parola tipo “sushi”), NON salutare:
  fai UNA domanda di chiarimento (una sola) scegliendo l’opzione più utile:
  1) preferenza (es. all you can eat vs à la carte), oppure
  2) area/zona (se NON è disponibile nel contesto), oppure
  3) azione utile senza inventare dati (es. “Cerca ‘sushi’ su Google Maps e ordina per distanza”).

- Se l’utente chiede eccezioni alle policy:
  - late checkout: chiedi SOLO l’orario desiderato (formato HH:MM).
  - qualunque altra eccezione/policy: invita a contattare l’host.

- In emergenza/pericolo: rispondi subito “Chiama il 112” (o numero equivalente nel contesto).
- Privacy: non chiedere dati sensibili (documenti, carte, ecc.).

- Se l’utente scrive una sola parola, fai UNA domanda di chiarimento (niente saluti).
`.trim();

function keyHash(x: unknown) {
  return crypto.createHash('sha256').update(JSON.stringify(x)).digest('hex').slice(0, 16);
}

function normalizeForKey(s: string) {
  return String(s || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .slice(0, 200);
}

/**
 * Normalizza lingua a 2 lettere (allineata ai language pack).
 *
 * Priorità lingua:
 * 1) reqLang (dal widget)
 * 2) yamlProbe.lang (effectiveLang dal motore YAML)
 * 3) ctx.locale (fallback di sicurezza)
 */

function normalizeLang(raw?: string) {
  const v = String(raw || 'it').trim().toLowerCase();
  const two = v.slice(0, 2);
  switch (two) {
    case 'it':
    case 'en':
    case 'de':
    case 'fr':
    case 'es':
      return two;
    default:
      return 'it';
  }
}

function fallbackText(lang: string) {
  switch (lang) {
    case 'en':
      return 'I can help with Wi-Fi, hours, rules, and emergencies. What do you need exactly?';
    case 'de':
      return 'Ich kann bei WLAN, Zeiten, Regeln und Notfällen helfen. Was brauchst du genau?';
    case 'fr':
      return "Je peux aider avec le Wi-Fi, les horaires, les règles et les urgences. De quoi as-tu besoin exactement ?";
    case 'es':
      return 'Puedo ayudar con Wi-Fi, horarios, reglas y emergencias. ¿Qué necesitas exactamente?';
    default:
      return 'Posso aiutarti con Wi-Fi, orari, regole o emergenze. Cosa ti serve esattamente?';
  }
}



/**
 * Orchestratore: unifica YAML + LLM.
 *
 * NOTE HARDENING (single source of truth):
 * - Guardrail welcome: intentResolver (qui non si decide se salutare).
 * - Sanitize / localizzazione: delegate a sanitize.ts (qui solo orchestrazione).
 * - Soglie YAML vs follow-up vs LLM: decision.ts.
 *
 * Questo file NON contiene regole conversazionali hardcoded,
 * ma solo composizione e routing delle risposte.
 */

export async function orchestrateChat(
  structureId: string,
  userMessage: string,
  yamlProbe?: {
    matched: boolean;
    intent?: string;
    confidence?: number;
    replyText?: any;
    buttons?: any[];
    history?: { role: 'user' | 'assistant'; content: string }[];
    lang?: string;
    isSingleWord?: boolean;
  },
sessionState?: {
  pending?: {
    kind?: "collect";
    intent?: string;
    format?: "time";
    questionId?: string;
    slot?: string;
    data?: Record<string, any>;
  };
},


  reqLang?: string,
  providedCtx?: Awaited<ReturnType<typeof buildContext>>,
) {
  const ctx = providedCtx ?? (await buildContext(structureId));
  const structureYaml = await loadStructure(structureId);


  // 🔒 Lingua single source of truth (2 lettere).
  // Priorità: reqLang (widget) → yamlProbe.lang (effectiveLang) → ctx.locale (fallback sicurezza).
  const replyLang = normalizeLang(reqLang || yamlProbe?.lang || ctx.locale || 'it');


// -------------------------------------------------
// Pending handler (ULTRA-PRUDENTE)
// - Solo intent operativi rigidissimi (es. late_checkout)
// - Un solo slot (time)
// - Niente confirm, niente sì/no
// - 1 reprompt massimo, poi chiude
// -------------------------------------------------

const OPERATIONAL_INTENTS = new Set(["late_checkout"]);

const pending = (sessionState as any)?.pending ?? null;
const hadPendingAtStart = !!pending;

// Escape immediato se cambio tema “forte” (wifi/emergency) o intent diverso con confidenza buona
if (hadPendingAtStart && pending?.intent) {
  const intentsCore = await loadIntentsCore();
  const ir = resolveIntent(userMessage, intentsCore);

  const currentIntent = ir?.key && ir.key !== "fallback" ? String(ir.key) : "";
  const currentConf = Number(ir?.confidence ?? 0);

  const pendingIntent = String(pending.intent);

  const isStrong = currentIntent === "wifi" || currentIntent === "emergency";
  const isDifferent = !!currentIntent && currentIntent !== pendingIntent;
  const confident = currentConf >= 0.65;

  if (isStrong || (isDifferent && confident)) {
    (sessionState as any).pending = undefined;
  }
}

const p = (sessionState as any)?.pending ?? null;

// -------- collect(time) SOLO per intent operativi
if (p && p.kind === "collect" && p.intent && p.format === "time") {
  const pendingIntent = String(p.intent);
  const attempts = Number(p?.data?.attempts ?? 0);

  // Se non è un intent operativo → chiudi (non deve succedere)
  if (!OPERATIONAL_INTENTS.has(pendingIntent)) {
    return {
      ok: true,
      source: "yaml",
      reply: noInfoText(replyLang),
      intent: pendingIntent,
      confidence: 1.0,
      cacheHit: false,
      ctxVer: ctx.contextVersion,
      pending: undefined,
      snapshot: getRuntimeSnapshot(),
    };
  }

  const time = parseTimeFromText(userMessage);

  // ✅ parse ok → risposta finale + chiusura netta
if (time) {
  const doneText = await renderReplyKey(
    structureYaml,
    "late_checkout_confirm_contact_host",
    replyLang,
    { time }
  );

  const clean = sanitizeYamlReply(String(doneText || ""), userMessage, pendingIntent) || noInfoText(replyLang);

  return {
    ok: true,
    source: "yaml",
    reply: clean,
    intent: pendingIntent,
    confidence: 1.0,
    cacheHit: false,
    ctxVer: ctx.contextVersion,
    pending: undefined,
    snapshot: getRuntimeSnapshot(),
  };
}


// ❌ non è un orario → 1 reprompt massimo, poi chiude (ULTRA-PRUDENTE)

// 1° errore: reprompt e mantieni pending
if (attempts === 0) {
  const askText = await renderReplyKey(
    structureYaml,
    "late_checkout_collect_desired_time_reprompt",
    replyLang,
    {}
  );

  const cleanAsk =
    sanitizeYamlReply(String(askText || ""), userMessage, pendingIntent) || noInfoText(replyLang);

  return {
    ok: true,
    source: "yaml",
    reply: cleanAsk,
    intent: pendingIntent,
    confidence: 1.0,
    cacheHit: false,
    ctxVer: ctx.contextVersion,
    pending: {
      kind: "collect",
      intent: pendingIntent,
      questionId: p?.questionId ? String(p.questionId) : "desired_time",
      slot: p?.slot ? String(p.slot) : "late_checkout_time",
      format: "time",
      data: { ...(p.data || {}), attempts: 1 },
    },
    snapshot: getRuntimeSnapshot(),
  };
}

// 2° errore: chiudi per evitare loop
const closeText = await renderReplyKey(
  structureYaml,
  "late_checkout_collect_close", // aggiungi questa key in it.yaml
  replyLang,
  {}
);

const cleanClose =
  sanitizeYamlReply(String(closeText || ""), userMessage, pendingIntent) || noInfoText(replyLang);

return {
  ok: true,
  source: "yaml",
  reply: cleanClose,
  intent: pendingIntent,
  confidence: 1.0,
  cacheHit: false,
  ctxVer: ctx.contextVersion,
  pending: undefined,
  snapshot: getRuntimeSnapshot(),
};
}

// -------------------------------------------------
// ✅ Flow entry (ULTRA-PRUDENTE, solo quando NON c'è pending)
// - Se intent è operativo (late_checkout) → chiedi SOLO orario e apri pending collect(time)
// - Ignora flow YAML “kind/collect/confirm” (non lo usiamo più)
// -------------------------------------------------
// -------------------------------------------------
// ✅ Flow entry (ULTRA-PRUDENTE, solo quando NON c'è pending)
// - Intent operativi (B) si aprono SOLO su trigger operativo esplicito
//   (qui: keyword "late checkout"/"late check-out" oppure un orario inline).
// -------------------------------------------------
if (!hadPendingAtStart && yamlProbe?.matched && yamlProbe?.intent) {
  const intent = String(yamlProbe.intent);

  if (OPERATIONAL_INTENTS.has(intent)) {
    // Guardrail ultra-minimo: evita riaperture su ACK tipo "perfetto/ok/grazie".
    const timeInline = parseTimeFromText(userMessage);
    const looksLikeLateCheckoutRequest =
      /\blate\s*check\s*out\b|\blate\s*checkout\b|\blate\s*check-out\b/i.test(userMessage);

    // Se non c'è trigger operativo, NON aprire pending (si prosegue col flow normale).
    if (!timeInline && !looksLikeLateCheckoutRequest) {
      // no-op: lascia che il routing prosegua verso decision/LLM guardrail
    } else {
      const askText = await renderReplyKey(
        structureYaml,
        "late_checkout_collect_desired_time",
        replyLang,
        {}
      );

      const cleanAsk =
        sanitizeYamlReply(String(askText || ""), userMessage, intent) || noInfoText(replyLang);

      return {
        ok: true,
        source: "yaml",
        reply: cleanAsk,
        intent,
        confidence: Number(yamlProbe.confidence ?? 1),
        cacheHit: false,
        ctxVer: ctx.contextVersion,
        pending: {
          kind: "collect",
          intent,
          questionId: "desired_time",
          slot: "late_checkout_time",
          format: "time",
          data: { attempts: 0 },
        },
        snapshot: getRuntimeSnapshot(),
      };
    }
  }
}


const decision = decideResponse({
  matched: !!yamlProbe?.matched,
  intent: yamlProbe?.intent,
  confidence: yamlProbe?.confidence,
});


  // History sintetica per cache key
  const historySummary =
    yamlProbe?.history && Array.isArray(yamlProbe.history)
      ? yamlProbe.history
          .map((m) => `${m.role === 'assistant' ? 'A' : 'U'}:${normalizeForKey(m.content)}`)
          .join('|')
          .slice(0, 500)
      : '';

  const cacheKey = keyHash({
    structureId,
    ctxVer: ctx.contextVersion,
    replyLang,
    source: decision.source,
    intent: decision.intent,
    confidence: decision.confidence,
    historySummary,
    userMessageNorm: normalizeForKey(userMessage),
  });

  const cached = cacheGet(cacheKey);
  if (cached) {
    const cachedText = String(cached || '').trim();
    if (cachedText) {
      return {
        ok: true,
        source: 'cache',
        reply: cachedText,
        intent: decision.intent,
        confidence: decision.confidence,
        cacheHit: true,
        ctxVer: ctx.contextVersion,
      };
    }
  }

  // ✅ YAML branch
 if (decision.source === 'yaml' && yamlProbe?.replyText != null) {

    const replyText = String(pickLocalizedText(yamlProbe.replyText, replyLang) || '').trim();

    let finalText = replyText || noInfoText(replyLang);

    // Sanitize deterministico (max 3 frasi + no welcome fuori contesto, ecc.)
    finalText = sanitizeYamlReply(finalText, userMessage, decision.intent) || noInfoText(replyLang);

    cacheSet(cacheKey, finalText);

    return {
      ok: true,
      source: decision.source,
      reply: finalText,
      intent: decision.intent,
      confidence: decision.confidence,
      cacheHit: false,
      ctxVer: ctx.contextVersion,
      pending: undefined,
      ui: yamlProbe.buttons ? { buttons: yamlProbe.buttons } : undefined,
    };
  }

  // -------------------------------------------------
// Guardrail: evita chiamate LLM su messaggi di ACK/chiusura.
// Regola generale: se non c’è una richiesta (nessuna domanda, nessun contenuto utile),
// rispondi con una chiusura neutra e NON chiamare LLM.
// -------------------------------------------------
function isLikelyNonRequest(msg: string) {
  const s = String(msg || "").trim();
  if (!s) return true;

  // Se è una domanda o contiene un punto interrogativo, è una richiesta.
  if (s.includes("?")) return false;

  // Se contiene numeri/ora (es. "13:00", "10"), potrebbe essere input utile.
  if (/\d/.test(s)) return false;

  // Se è lungo, probabilmente non è un semplice ack.
  const words = s.split(/\s+/).filter(Boolean);
  if (words.length >= 5) return false;

  // Se contiene segni tipici di richiesta (minimo, non esaustivo)
  // Nota: non è una lista di "grazie", ma di verbi/forme di richiesta.
  const reqLike = /(mi\s+dici|puoi|potresti|come|dove|quando|quanto|info|informazioni|orario|wifi|parcheggio|checkout|check\-out|regole|emergenza)/i;
  if (reqLike.test(s)) return false;

  return true;
}

if (decision.source === "llm") {
  // Se l’utente scrive una sola parola (es. "sushi"), lasciamo che l’LLM faccia 1 chiarimento (come da regole).
  const isSingleWord = !!yamlProbe?.isSingleWord;

  if (!isSingleWord && isLikelyNonRequest(userMessage)) {
    // Chiusura neutra, senza domanda (Ultra-Prudente).
    const closing =
      replyLang === "en" ? "You're welcome." :
      replyLang === "de" ? "Gern geschehen." :
      replyLang === "fr" ? "Avec plaisir." :
      replyLang === "es" ? "De nada." :
      "Di nulla.";

    return {
      ok: true,
      source: "llm", // tecnicamente non chiamiamo LLM, ma restiamo nel ramo fallback
      reply: closing,
      intent: decision.intent,
      confidence: decision.confidence,
      cacheHit: false,
      ctxVer: ctx.contextVersion,
      pending: undefined,
      snapshot: getRuntimeSnapshot(),
    };
  }
}



  // ✅ LLM branch
  const perm = canCallLlm();
  if (!perm.ok) {
    const text = fallbackText(replyLang);
    return {
      ok: false,
      source: 'llm',
      reply: `[LLM disabled: ${perm.reason}] ${text}`,
      intent: decision.intent,
      confidence: decision.confidence,
      cacheHit: false,
      ctxVer: ctx.contextVersion,
      snapshot: getRuntimeSnapshot(),
    };
  }

  

  const LANGUAGE_RULE = `LINGUA (OBBLIGATORIA): Rispondi SOLO in lang="${replyLang}". Non cambiare lingua.`;

  const structureContextLines: string[] = [];
  structureContextLines.push(`- Lingua richiesta: ${replyLang}`);
  structureContextLines.push(`- Wi-Fi: ssid=${ctx.wifi?.ssid ?? 'n/d'}; password=${ctx.wifi?.password ?? 'n/d'}`);
  if (ctx.rules?.length) structureContextLines.push(`- Regole principali: ${ctx.rules.slice(0, 4).join(' | ')}`);
  if (ctx.emergencies?.phone) structureContextLines.push(`- Emergenze: ${ctx.emergencies.phone}`);

  const systemPrompt = [
    LUMO_SYSTEM_RULES,
    '',
    LANGUAGE_RULE,
    '',
    'CONTESTO STRUTTURA (USA SOLO QUESTE INFO, NON INVENTARE):',
    ...structureContextLines,
  ]
    .filter(Boolean)
    .join('\n');

  // Contesto recente conversazione (leggero)
  let lastUserMessage = '';
  let lastAssistantMessage = '';

  if (yamlProbe?.history && Array.isArray(yamlProbe.history)) {
    lastUserMessage = [...yamlProbe.history].reverse().find((m) => m.role === 'user')?.content || '';
    lastAssistantMessage = [...yamlProbe.history].reverse().find((m) => m.role === 'assistant')?.content || '';
  }

  if (!lastAssistantMessage && yamlProbe?.replyText != null) {
    lastAssistantMessage = pickLocalizedText(yamlProbe.replyText, replyLang);
  }
  if (!lastUserMessage) lastUserMessage = userMessage;

  const finalUserMessage = `
CONTESTO RECENTE (SE UTILE):

Ultima risposta dell’assistente:
"${String(lastAssistantMessage || '').trim()}"

Ultima domanda dell’utente:
"${String(lastUserMessage || '').trim()}"

Nuova domanda dell’utente:
"${String(userMessage || '').trim()}"

ISTRUZIONE:
Rispondi in modo coerente con il contesto recente solo se rilevante.
Non fare domande di follow-up a meno che l’utente abbia chiesto esplicitamente qualcosa.

`.trim();

  const res = await callLlm(finalUserMessage, {
    locale: replyLang,
    systemPrompt,
  });

  if (res && !res.error && res.text) {
    registerLlmSuccess();

    const clean =
      sanitizeYamlReply(String(res.text), userMessage, decision.intent) || noInfoText(replyLang);

    cacheSet(cacheKey, clean);

    return {
      ok: true,
      source: 'llm',
      reply: clean,
      intent: decision.intent,
      confidence: decision.confidence,
      cacheHit: false,
      ctxVer: ctx.contextVersion,
      snapshot: getRuntimeSnapshot(),
    };
  }

  registerLlmFailure();
  return {
    ok: false,
    source: 'llm',
    error: res?.error ?? 'Unknown error',
    reply: fallbackText(replyLang),
    intent: decision.intent,
    confidence: decision.confidence,
    ctxVer: ctx.contextVersion,
    snapshot: getRuntimeSnapshot(),
  };
}
