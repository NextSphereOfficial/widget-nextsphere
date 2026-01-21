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
import { loadStructure } from "../content/loader.js";
import { renderReplyKey } from "./logic/templateEngine.js";

import { pickLocalizedText, noInfoText, sanitizeYamlReply, parseTimeFromText } from './logic/sanitize.js';

/**
 * Style & Behavior Guide v1.0 (Lumo) — Regole GLOBALI (no info hardcoded sulla location).
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
- Se la richiesta è generica o ambigua (es. una sola parola tipo “sushi”), NON salutare: fai UNA domanda di chiarimento o proponi UNA azione utile.
- Se l’utente chiede eccezioni alle policy (late checkout, ospiti extra, animali extra, modifiche), invita a contattare l’host.
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

function detectYesNo(raw: string) {
  const s = String(raw || "").trim().toLowerCase();

  const yes =
    /^(si|sì|ok|va bene|certo|yes|yep|yeah|ja|oui|vale|va bene)\b/.test(s);
  const no =
    /^(no|nope|non voglio|non serve|nein|nicht|non|nah)\b/.test(s);

  if (yes) return "yes" as const;
  if (no) return "no" as const;
  return null;
}


function followUpText(lang: string, intent?: string) {
  switch (lang) {
    case 'en':
      if (intent === 'late_checkout') return 'What time would you need it?';
      return 'What exactly do you need (details, time, price, or how to get there)?';
    case 'de':
      if (intent === 'late_checkout') return 'Zu welcher Uhrzeit brauchst du es?';
      return 'Was genau brauchst du (Details, Uhrzeit, Preis oder Wegbeschreibung)?';
    case 'fr':
      if (intent === 'late_checkout') return 'Pour quelle heure en aurais-tu besoin ?';
      return 'De quoi as-tu besoin exactement (détails, horaire, prix ou itinéraire) ?';
    case 'es':
      if (intent === 'late_checkout') return '¿Para qué hora lo necesitas?';
      return '¿Qué necesitas exactamente (detalles, hora, precio o cómo llegar)?';
    default:
      if (intent === 'late_checkout') return 'Per che orario ti servirebbe?';
      return 'Cosa ti serve esattamente (dettagli, orario, prezzo o come arrivare)?';
  }
}

function pendingForIntent(intent?: string) {
  if (intent === 'late_checkout') {
    return { intent: 'late_checkout', slot: 'time' as const };
  }
  return null;
}


function isStrongEscapeIntent(intent?: string) {
  return intent === "wifi" || intent === "emergency";
}

function shouldEscapePending(opts: {
  pendingIntent: string;
  currentIntent?: string;
  currentConfidence?: number;
}) {
  const { pendingIntent, currentIntent, currentConfidence = 0 } = opts;

  if (!currentIntent) return false;
  if (isStrongEscapeIntent(currentIntent)) return true;

  // Cambio tema con intent diverso e confidenza buona → escape
  if (currentIntent !== pendingIntent && currentConfidence >= 0.7) return true;

  return false;
}

function getFlow(structureYaml: any, intent?: string) {
  if (!intent) return null;
  const def = structureYaml?.intents?.[String(intent)];
  return def?.flow ?? null;
}

function extractAction(flowNode: any) {
  // supporta `action: contact_host` o `{ type: 'contact_host', ... }`
  const a = flowNode?.action;
  if (!a) return undefined;
  if (typeof a === "string") return { type: a };
  if (typeof a === "object" && a.type) return a;
  return undefined;
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
    // nuovo formato (semantico)
    kind?: "followup" | "collect" | "confirm";
    intent?: string;
    questionId?: string;
    slot?: string;
    format?: "time" | "date" | "number" | "text";
    data?: Record<string, any>;
    askedAt?: string;

    // retrocompat (se trovi state vecchi)
    // intent + slot
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
// Pending handler (attivo SOLO con orchestrator ON)
// Usa pending semantico + flow YAML v2 (solo late_checkout in questo step)
// -------------------------------------------------

const pending = (sessionState as any)?.pending;
const pendingKind = pending?.kind ? String(pending.kind) : "";
const pendingIntent = pending?.intent ? String(pending.intent) : "";
const pendingFormat = pending?.format ? String(pending.format) : "";
const pendingData = pending?.data && typeof pending.data === "object" ? pending.data : undefined;
const hadPendingAtStart = !!pending;

// 🧠 Escape universale dal pending su cambio argomento
if (hadPendingAtStart && pendingIntent) {
  const newIntent = String(yamlProbe?.intent || "");
  const newConfidence = Number(yamlProbe?.confidence ?? 0);

  const isStrong = newIntent === "wifi" || newIntent === "emergency";
  const isDifferent = newIntent && newIntent !== pendingIntent;
  const confident = newConfidence >= 0.45;

  if (isStrong || (isDifferent && confident)) {
    // 👉 abbandoniamo il pending e lasciamo proseguire il routing normale
    (sessionState as any).pending = undefined;
  }
}


// Escape hatch: se l’intent corrente è wifi/emergency, non forziamo pending
const currentIntent = String(yamlProbe?.intent || "");
if (currentIntent === "wifi" || currentIntent === "emergency") {
  // ignora pending
} else if (pendingKind === "collect" && pendingIntent && pendingFormat === "time") {
  const time = parseTimeFromText(userMessage);

  // 🔓 Escape più aggressivo: se NON è un orario e il messaggio sembra “testo/cambio tema”
  // (evita che “sì” o “sushi” riattivino confirm/collect a distanza)
  if (!time) {
    const t = String(userMessage || "").trim().toLowerCase();

    const looksLikeTime = /\b(\d{1,2})([:.]\d{2})?\b/.test(t); // 13 / 13:30
    const hasLetters = /[a-zàèéìòù]/i.test(t);
    const longEnough = t.length >= 6;

    const newIntent = String(yamlProbe?.intent || "");
    const newConf = Number(yamlProbe?.confidence ?? 0);

    const intentChanged = newIntent && newIntent !== pendingIntent;
    const confidentEnough = newConf >= 0.45; // più permissivo di 0.7

    if ((hasLetters && longEnough && !looksLikeTime) || (intentChanged && confidentEnough)) {
      (sessionState as any).pending = undefined;
    }
  }

  // ✅ Se abbiamo fatto escape, NON gestire più il pending e lascia proseguire il routing normale
  if (!(sessionState as any)?.pending) {
    // fallthrough: non return
  } else {
    const intentDef = (structureYaml as any)?.intents?.[pendingIntent];
    const flow = intentDef?.flow;

    // Se parse ok → passa a confirm
    if (time && flow?.confirm?.reply_key) {
      const confirmText = await renderReplyKey(
        structureYaml,
        String(flow.confirm.reply_key),
        replyLang,
        { time }
      );

      const clean =
        sanitizeYamlReply(confirmText, userMessage, pendingIntent) || noInfoText(replyLang);

      return {
        ok: true,
        source: "yaml_followup",
        reply: clean,
        intent: pendingIntent,
        confidence: 1.0,
        cacheHit: false,
        ctxVer: ctx.contextVersion,
        pending: {
          kind: "confirm",
          intent: pendingIntent,
          questionId: flow?.confirm?.question_id
            ? String(flow.confirm.question_id)
            : "contact_host_confirm",
          data: { time },
        },
        snapshot: getRuntimeSnapshot(),
      };
    }

    // Se non capiamo → reprompt (se esiste), altrimenti fallback breve
    const askKey = flow?.collect?.reprompt_reply_key || flow?.collect?.reply_key;

    const askText = askKey
      ? await renderReplyKey(structureYaml, String(askKey), replyLang, {})
      : followUpText(replyLang, pendingIntent);

    const cleanAsk =
      sanitizeYamlReply(String(askText || ""), userMessage, pendingIntent) || noInfoText(replyLang);

    return {
      ok: true,
      source: "yaml_followup",
      reply: cleanAsk,
      intent: pendingIntent,
      confidence: 1.0,
      cacheHit: false,
      ctxVer: ctx.contextVersion,
      pending: {
        kind: "collect",
        intent: pendingIntent,
        questionId: pending?.questionId ? String(pending.questionId) : "desired_time",
        slot: pending?.slot ? String(pending.slot) : "late_checkout_time",
        format: "time",
      },
      snapshot: getRuntimeSnapshot(),
    };
  }
} else if (pendingKind === "confirm" && pendingIntent) {

  const yn = detectYesNo(userMessage);
  if (!yn) {
    // Se non è sì/no → una domanda breve (riusa la stessa confirm)
    const intentDef = (structureYaml as any)?.intents?.[pendingIntent];
    const flow = intentDef?.flow;

    const time = pendingData?.time;
    const confirmText = flow?.confirm?.reply_key
      ? await renderReplyKey(structureYaml, String(flow.confirm.reply_key), replyLang, { time })
      : "";

    const cleanAsk =
      sanitizeYamlReply(confirmText || "", userMessage, pendingIntent) || noInfoText(replyLang);

    return {
      ok: true,
      source: "yaml_followup",
      reply: cleanAsk,
      intent: pendingIntent,
      confidence: 1.0,
      cacheHit: false,
      ctxVer: ctx.contextVersion,
      pending: {
        kind: "confirm",
        intent: pendingIntent,
        questionId: pending?.questionId ? String(pending.questionId) : "contact_host_confirm",
        data: pendingData,
      },
      snapshot: getRuntimeSnapshot(),
    };
  }

  const intentDef = (structureYaml as any)?.intents?.[pendingIntent];
  const flow = intentDef?.flow;
  const time = pendingData?.time;

  const key =
    yn === "yes" ? flow?.confirm?.on_yes?.reply_key : flow?.confirm?.on_no?.reply_key;

  const outText = key ? await renderReplyKey(structureYaml, String(key), replyLang, { time }) : "";
  const clean = sanitizeYamlReply(outText, userMessage, pendingIntent) || noInfoText(replyLang);

  return {
    ok: true,
    source: "yaml_followup",
    reply: clean,
    intent: pendingIntent,
    confidence: 1.0,
    cacheHit: false,
    ctxVer: ctx.contextVersion,
    snapshot: getRuntimeSnapshot(),
    pending: undefined, // ✅ forza clear lato chat.ts
  };

}

// -------------------------------------------------
// ✅ Flow entry (solo quando NON c'è pending)
// Se l'intent ha flow.kind === "collect" apriamo pending semantico
// -------------------------------------------------
if (!hadPendingAtStart && yamlProbe?.matched && yamlProbe?.intent) {
  const flow = getFlow(structureYaml as any, yamlProbe.intent);

  if (flow?.kind === "collect") {
    const baseReply = String(pickLocalizedText(yamlProbe.replyText, replyLang) || "").trim() || noInfoText(replyLang);

    const askKey = flow?.collect?.reply_key;
    const ask = askKey
      ? await renderReplyKey(structureYaml, String(askKey), replyLang, {})
      : followUpText(replyLang, yamlProbe.intent);

    const base = String(baseReply || "").trim();
const askTxt = String(ask || "").trim();

// Se il base contiene già una domanda, non appendere una seconda domanda
const shouldAppendAsk =
  !!askTxt &&
  !base.includes("?") &&                 // già una domanda nel testo base
  !/[?]\s*$/.test(base);                 // oppure finisce con "?"

let finalText = shouldAppendAsk ? `${base} ${askTxt}`.trim() : base;

    finalText = sanitizeYamlReply(finalText, userMessage, yamlProbe.intent) || noInfoText(replyLang);

    return {
      ok: true,
      source: "yaml",
      reply: finalText,
      intent: String(yamlProbe.intent),
      confidence: Number(yamlProbe.confidence ?? 1),
      cacheHit: false,
      ctxVer: ctx.contextVersion,
      pending: {
        kind: "collect",
        intent: String(yamlProbe.intent),
        questionId: flow?.collect?.question_id ? String(flow.collect.question_id) : "collect",
        slot: flow?.collect?.slot ? String(flow.collect.slot) : undefined,
        format: flow?.collect?.format ? String(flow.collect.format) : "time",
      },
      snapshot: getRuntimeSnapshot(),
    };
  }
}




  const decision = decideResponse({
    matched: !!yamlProbe?.matched,
    intent: yamlProbe?.intent,
    confidence: yamlProbe?.confidence,
    isSingleWord: !!yamlProbe?.isSingleWord,
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
  if ((decision.source === 'yaml' || decision.source === 'yaml_followup') && yamlProbe?.replyText != null) {
    const replyText = String(pickLocalizedText(yamlProbe.replyText, replyLang) || '').trim();

    let finalText = replyText || noInfoText(replyLang);

// yaml_followup: solo domanda soft, MAI pending
if (decision.source === "yaml_followup") {
  const t = String(userMessage || "").trim().toLowerCase();
  const isAck = /^(ok|okay|va bene|perfetto|grazie|thanks|thx|👍|👌|si|sì|no)\b/.test(t);

  if (!isAck) {
    const q = followUpText(replyLang, decision.intent);
    if (q) finalText = `${finalText} ${q}`.trim();
  }
}




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
Rispondi in modo coerente con il contesto recente solo se rilevante. Se è ambiguo, fai UNA sola domanda di chiarimento.
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
