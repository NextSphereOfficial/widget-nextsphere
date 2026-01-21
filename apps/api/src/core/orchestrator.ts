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


function getFlow(structureYaml: any, intent?: string) {
  if (!intent) return null;
  const def = structureYaml?.intents?.[String(intent)];
  return def?.flow ?? null;
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
// Pending handler (DETERMINISTICO, single owner)
// - non dipende da yamlProbe per escape (chat.ts può non risolvere intent in pending)
// - massimo 1 reprompt in collect + 1 reprompt in confirm, poi chiude
// -------------------------------------------------

const pending = (sessionState as any)?.pending ?? null;
const hadPendingAtStart = !!pending;

if (hadPendingAtStart && pending?.intent) {
  // Calcolo intent *solo* per decidere escape (non per rispondere)
  const intentsCore = await loadIntentsCore();
  const ir = resolveIntent(userMessage, intentsCore);

  const currentIntent = ir?.key && ir.key !== "fallback" ? String(ir.key) : "";
  const currentConf = Number(ir?.confidence ?? 0);

  const pendingIntent = String(pending.intent);

  const isStrong = currentIntent === "wifi" || currentIntent === "emergency";
  const isDifferent = !!currentIntent && currentIntent !== pendingIntent;
  const confident = currentConf >= 0.65;

  // ESCAPE HARD: cambio tema con confidenza buona oppure wifi/emergency
  if (isStrong || (isDifferent && confident)) {
    (sessionState as any).pending = null;
  }
}

const p = (sessionState as any)?.pending ?? null;

// -------- collect(time)
if (p && p.kind === "collect" && p.intent && p.format === "time") {
  const pendingIntent = String(p.intent);

  const time = parseTimeFromText(userMessage);
  const attempts = Number(p?.data?.attempts ?? 0);

  const intentDef = (structureYaml as any)?.intents?.[pendingIntent];
  const flow = intentDef?.flow;

  // parse ok → passiamo a confirm
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
        data: { time, attempts: 0 },
      },
      snapshot: getRuntimeSnapshot(),
    };
  }

  // non è un orario → reprompt UNA volta, poi chiude per evitare loop
  if (attempts >= 1) {
    return {
      ok: true,
      source: "yaml_followup",
      reply: sanitizeYamlReply(followUpText(replyLang), userMessage, pendingIntent) || noInfoText(replyLang),
      intent: pendingIntent,
      confidence: 1.0,
      cacheHit: false,
      ctxVer: ctx.contextVersion,
      pending: null,
      snapshot: getRuntimeSnapshot(),
    };
  }

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
      questionId: p?.questionId ? String(p.questionId) : "desired_time",
      slot: p?.slot ? String(p.slot) : "late_checkout_time",
      format: "time",
      data: { ...(p.data || {}), attempts: attempts + 1 },
    },
    snapshot: getRuntimeSnapshot(),
  };
}

// -------- confirm (yes/no)
if (p && p.kind === "confirm" && p.intent) {
  const pendingIntent = String(p.intent);
  const attempts = Number(p?.data?.attempts ?? 0);

  const yn = detectYesNo(userMessage);

  // NON sì/no → ripeti UNA volta, poi chiudi (evita “sì/no” fuori contesto dopo)
  if (!yn) {
    if (attempts >= 1) {
      return {
        ok: true,
        source: "yaml_followup",
        reply: sanitizeYamlReply(followUpText(replyLang), userMessage, pendingIntent) || noInfoText(replyLang),
        intent: pendingIntent,
        confidence: 1.0,
        cacheHit: false,
        ctxVer: ctx.contextVersion,
        pending: null,
        snapshot: getRuntimeSnapshot(),
      };
    }

    const intentDef = (structureYaml as any)?.intents?.[pendingIntent];
    const flow = intentDef?.flow;
    const time = p?.data?.time;

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
        questionId: p?.questionId ? String(p.questionId) : "contact_host_confirm",
        data: { ...(p.data || {}), attempts: attempts + 1 },
      },
      snapshot: getRuntimeSnapshot(),
    };
  }

  const intentDef = (structureYaml as any)?.intents?.[pendingIntent];
  const flow = intentDef?.flow;
  const time = p?.data?.time;

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
    pending: null, // chiusura netta (chat.ts farà clear atomico)
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

  // Guardrail: yes/no/ack senza pending → NON far riattaccare il contesto vecchio
const pendingNow = (sessionState as any)?.pending ?? null;
const t = String(userMessage || "").trim().toLowerCase();

const isShortAck = /^(si|sì|no|ok|okay|va bene|perfetto|grazie|thanks|y|yes|nope)\b/.test(t) && t.length <= 12;

if (!pendingNow && isShortAck) {
  const text =
    replyLang === "en"
      ? "Sure — yes to what exactly? (e.g., sushi nearby or delivery?)"
      : replyLang === "de"
      ? "Alles klar — worauf genau bezieht sich dein „Ja“? (z.B. Sushi in der Nähe oder Lieferung?)"
      : replyLang === "fr"
      ? "D’accord — “oui” par rapport à quoi exactement ? (sushi à proximité ou livraison ?)"
      : replyLang === "es"
      ? "Perfecto — ¿sí a qué exactamente? (¿sushi cerca o a domicilio?)"
      : "Ok — sì a cosa esattamente? (sushi nelle vicinanze o consegna a domicilio?)";

  return {
    ok: true,
    source: "llm",
    reply: text,
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
