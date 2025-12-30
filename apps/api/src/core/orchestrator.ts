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

/**
 * Style & Behavior Guide v1.0 (Lumo) — Regole GLOBALI (no info hardcoded sulla location).
 * Il contesto specifico della struttura viene aggiunto dinamicamente nel system prompt.
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

function normalize(s: string) {
  return String(s || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .slice(0, 200);
}

/**
 * Lingue supportate dal tuo sistema (allineate ai language pack).
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

/**
 * Se replyText è string OR oggetto per-lingua {it,en,de,fr,es},
 * ritorna il testo migliore per lang con fallback ragionato.
 */
function pickLocalizedText(val: any, lang: string) {
  if (val == null) return '';
  if (typeof val === 'string') return val;

  if (typeof val === 'object') {
    const tryKeys = [lang, 'en', 'it', 'de', 'fr', 'es'];
    for (const k of tryKeys) {
      const v = (val as any)?.[k];
      if (typeof v === 'string' && v.trim()) return v;
    }
  }

  // ultimo fallback: stringifica in modo sicuro
  try {
    return typeof val === 'string' ? val : JSON.stringify(val);
  } catch {
    try {
      return String(val);
    } catch {
      return '';
    }
  }
}

function noInfoText(lang: string) {
  switch (lang) {
    case 'en':
      return "I don’t have that information yet. Please contact the host if you need it right now.";
    case 'de':
      return "Diese Information habe ich noch nicht. Bitte kontaktiere den Gastgeber, wenn du sie sofort brauchst.";
    case 'fr':
      return "Je n’ai pas encore cette information. Contactez l’hôte si vous en avez besoin tout de suite.";
    case 'es':
      return "Aún no tengo esa información. Contacta con el anfitrión si la necesitas ahora mismo.";
    default:
      return "Non ho ancora questa informazione. Se ti serve subito, contatta l’host.";
  }
}

function fallbackText(lang: string) {
  switch (lang) {
    case 'en':
      return "I can help with Wi-Fi, hours, rules, and emergencies. What do you need exactly?";
    case 'de':
      return "Ich kann bei WLAN, Zeiten, Regeln und Notfällen helfen. Was brauchst du genau?";
    case 'fr':
      return "Je peux aider avec le Wi-Fi, les horaires, les règles et les urgences. De quoi as-tu besoin exactement ?";
    case 'es':
      return "Puedo ayudar con Wi-Fi, horarios, reglas y emergencias. ¿Qué necesitas exactamente?";
    default:
      return "Posso aiutarti con Wi-Fi, orari, regole o emergenze. Cosa ti serve esattamente?";
  }
}

function isGreeting(message: string) {
  const s = normalize(message);
  // saluti comuni (non perfetto, ma sufficiente per guardrail)
  return /^(ciao|salve|buongiorno|buonasera|hello|hi|hey|hola|hallo|bonjour)\b/.test(s);
}

function splitIntoSentences(text: string) {
  // Split semplice: . ! ? + newline; mantiene ordine, evita vuoti.
  const parts = String(text || '')
    .replace(/\r/g, '\n')
    .split(/(?<=[.!?])\s+|\n+/g)
    .map((x) => x.trim())
    .filter(Boolean);
  return parts;
}

/**
 * Applica la Style & Behavior Guide v1.0 in modo deterministico (demo-safe).
 */
function sanitizeReply(text: string, lang: string, userMessage: string) {
  let t = String(text || '').trim();
  if (!t) return noInfoText(lang);

  // Rimuovi boilerplate tipici
  t = t.replace(/^\s*(Certo!|Sure!|Claro!|Natürlich!|Bien sûr!)\s*/i, '').trim();

  // Se l'utente NON saluta, evita benvenuti/presentazioni in apertura
  const userGreet = isGreeting(userMessage);
  if (!userGreet) {
    const sentences = splitIntoSentences(t);
    if (sentences.length) {
      const first = normalize(sentences[0]);
      const looksLikeWelcome =
        /\b(benvenut|welcome|bienvenid|willkomm|bienvenue)\b/.test(first) ||
        /\b(sono qui per aiut|i am here to help|estoy aquí para|ich bin hier um|je suis là pour)\b/.test(first);
      if (looksLikeWelcome && sentences.length > 1) {
        sentences.shift();
        t = sentences.join(' ');
      }
    }
  }

  // Limita a 1–3 frasi di default (evita wall of text)
  const sents = splitIntoSentences(t);
  if (sents.length > 3) t = sents.slice(0, 3).join(' ');

  // Ultimo guardrail
  t = t.trim();
  if (!t) return noInfoText(lang);
  return t;
}

/**
 * Orchestratore: unifica YAML + LLM.
 * Nota: yamlProbe può contenere mini-history e lang già risolta dalla route.
 */
export async function orchestrateChat(
  structureId: string,
  userMessage: string,
  yamlProbe?: {
    matched: boolean;
    intent?: string;
    confidence?: number;
    replyText?: string;
    buttons?: any[];
    history?: { role: 'user' | 'assistant'; content: string }[];
    lang?: string;
  },
  reqLang?: string,
) {
  const ctx = await buildContext(structureId);

  // 🔒 Single source of truth per la lingua
  const replyLang = normalizeLang(yamlProbe?.lang || reqLang || ctx.locale || 'it');


function isGreeting(msg: string) {
  const s = String(msg || '').trim().toLowerCase();
  return /^(ciao|salve|buongiorno|buonasera|hello|hi|hey|hola|hallo|bonjour|salut|bonsoir)\b/.test(s);
}

// Guardrail: welcome solo se l’utente sta salutando
if (yamlProbe?.intent === 'welcome' && !isGreeting(userMessage)) {
  yamlProbe.matched = false;
  yamlProbe.confidence = 0;
  yamlProbe.replyText = undefined;
  yamlProbe.buttons = undefined;
}



  // decisione (se non hai confidenza dal matcher, passa matched=false)
  const decision = decideResponse({
    matched: !!yamlProbe?.matched,
    intent: yamlProbe?.intent,
    confidence: yamlProbe?.confidence,
  });

  // History sintetica (opzionale) per cache key e contesto LLM
  const historySummary =
    yamlProbe?.history && Array.isArray(yamlProbe.history)
      ? yamlProbe.history
          .map((m) => `${m.role === 'assistant' ? 'A' : 'U'}:${normalize(m.content)}`)
          .join('|')
          .slice(0, 500)
      : '';

  // Cache key: lingua-safe + sorgente + intent + contesto versione
  const cacheKey = keyHash({
    structureId,
    ctxVer: ctx.contextVersion,
    replyLang,
    source: decision.source,
    intent: decision.intent,
    confidence: decision.confidence,
    historySummary,
    userMessageNorm: normalize(userMessage),
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

  /**
   * ✅ YAML branch: alta confidenza → rispondi subito
   * Guardrail: MAI vuoto / MAI object.
   */
  if (decision.source === 'yaml' && yamlProbe?.replyText != null) {
    const replyText = pickLocalizedText(yamlProbe.replyText, replyLang).trim();

    const finalText = replyText || noInfoText(replyLang);
    cacheSet(cacheKey, finalText);

    return {
      ok: true,
      source: 'yaml',
      reply: finalText,
      intent: decision.intent,
      confidence: decision.confidence,
      cacheHit: false,
      ctxVer: ctx.contextVersion,
      ui: yamlProbe.buttons ? { buttons: yamlProbe.buttons } : undefined,
    };
  }

  /**
   * ✅ LLM branch: borderline / no match
   */
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

  // System prompt: regole Lumo + lingua + contesto struttura (dinamico, non inventare)
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

  // Contesto recente conversazione (leggero, come da guida)
  let lastUserMessage = '';
  let lastAssistantMessage = '';

  if (yamlProbe?.history && Array.isArray(yamlProbe.history)) {
    lastUserMessage = [...yamlProbe.history].reverse().find((m) => m.role === 'user')?.content || '';
    lastAssistantMessage = [...yamlProbe.history].reverse().find((m) => m.role === 'assistant')?.content || '';
  }

  if (!lastAssistantMessage && yamlProbe?.replyText) {
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
    const clean = sanitizeReply(res.text, replyLang, userMessage);
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
