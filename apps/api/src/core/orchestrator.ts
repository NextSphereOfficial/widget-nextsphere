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

const FALLBACK_SYSTEM_PROMPT = `
Sei un concierge digitale per appartamenti turistici. Assistente semplice, pratico e amichevole.

CONTESTO GENERALE:
- L’appartamento si trova a Mestre (VE), vicino ai collegamenti per Venezia.
- Gli ospiti stanno già soggiornando nella struttura.
- Se la risposta è già contenuta chiaramente nello YAML della struttura, non modificarla né contraddirla.

STILE DELLE RISPOSTE:
- Rispondi sempre in modo semplice, diretto e breve (1–3 frasi).
- Tono gentile, colloquiale e non formale.
- Non fare discorsi lunghi a meno che l’utente lo chieda esplicitamente.
- Mantieni sempre un atteggiamento utile e pratico.

REGOLE IMPORTANTI (NON VIOLARLE MAI):

1. LOCALITÀ E NON-INVENZIONE
- Sai che ti trovi a Mestre (Venezia).
- NON inventare mai nomi di ristoranti, bar, locali, negozi, strade o vie.
- NON inventare mai informazioni su disponibilità, orari commerciali o luoghi specifici.
- Se l’utente chiede un posto preciso dove mangiare, bere o andare, rispondi ad esempio:
  "Non posso indicare nomi specifici, ma puoi cercare su Google Maps (es. 'sushi Mestre') oppure chiedere direttamente all’host."

2. COERENZA CON IL CONTESTO
- Se nel contesto (YAML) ci sono regole, orari, istruzioni o policy, non cambiarle.
- Se l’utente chiede eccezioni (late checkout, animali extra, ospiti esterni, modifiche), rispondi:
  "Per queste richieste serve l’host."

3. LIMITI DI CONOSCENZA
- Non dire mai che "vedi" l’appartamento, la posizione dell’utente o lo stato reale della casa.
- Non inventare mai informazioni di cui non sei certo.
- Non suggerire procedure tecniche non presenti nello YAML della struttura.

4. CONTINUITÀ LEGGERA
- Usa il contesto recente della chat per capire a cosa si riferisce l’utente.
- Se una frase è ambigua (es. "quale mi consigli?"), chiedi:
  "Intendi un ristorante, un mezzo di trasporto o altro?"

5. PRIVACY E SICUREZZA
- Non chiedere documenti, numeri di carta o dati sensibili.
- Non dare pareri sanitari o legali tecnici.

6. EMERGENZE
- Se l’utente descrive una situazione di pericolo (incendio, malore, aggressione), rispondi immediatamente:
  "Chiama subito il numero di emergenza 112."
- NON fornire istruzioni mediche o diagnostiche.

7. ESCALATION ALL’HOST
- Se serve l’intervento umano (chiavi perse, danni, pulizie extra, problemi tecnici gravi):
  "Per questo è necessario contattare l’host."

COMPORTAMENTO GENERALE:
- Il tuo obiettivo è aiutare l’ospite nel modo più utile possibile, entro questi limiti.
- Se non sei sicuro, dì chiaramente che non lo sai e suggerisci alternative utili (Google Maps, chiedere all’host, verificare nell’appartamento).
`;

function keyHash(x: unknown) {
  return crypto.createHash('sha256').update(JSON.stringify(x)).digest('hex').slice(0, 16);
}

/**
 * Orchestratore: unifica YAML + LLM.
 * Nota: qui assumiamo che il matcher YAML sia esterno alla route.
 * Se la route non ha un matcher, questo orchestratore può operare “LLM-only”.
 *
 * yamlProbe ora può contenere anche una mini-history della sessione:
 *  - history: ultimi turni di conversazione (user/assistant)
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
  },
) {
  const ctx = await buildContext(structureId);

  // decisione (se non hai confidenza dal matcher, passa matched=false)
  const decision = decideResponse({
    matched: !!yamlProbe?.matched,
    intent: yamlProbe?.intent,
    confidence: yamlProbe?.confidence,
  });

  // Prepara una rappresentazione sintetica della history (se c'è)
  const historySummary =
    yamlProbe?.history && Array.isArray(yamlProbe.history)
      ? yamlProbe.history
          .map((m) => `${m.role === 'assistant' ? 'A' : 'U'}:${normalize(m.content)}`)
          .join('|')
          .slice(0, 500)
      : '';

  // Cache: include contesto (ctxVer) + sorgente + (opzionale) history
  const cacheKey = keyHash({
    structureId,
    ctxVer: ctx.contextVersion,
    intent: decision.intent,
    matched: decision.source,
    historySummary,
    userMessageNorm: normalize(userMessage),
  });

  // Se la decisione è chiaramente “uguale a prima”, prova cache prima
  const cached = cacheGet(cacheKey);
  if (cached) {
    try {
      const cachedText = String(cached);
      return {
        ok: true,
        source: 'cache',
        reply: cachedText,
        intent: decision.intent,
        confidence: decision.confidence,
        cacheHit: true,
        ctxVer: ctx.contextVersion,
      };
    } catch {
      // ignore cache errors
    }
  }

  // Alta confidenza YAML → rispondi subito
  if (decision.source === 'yaml' && yamlProbe?.replyText) {
    cacheSet(cacheKey, yamlProbe.replyText);
    return {
      ok: true,
      source: 'yaml',
      reply: yamlProbe.replyText,
      intent: decision.intent,
      confidence: decision.confidence,
      cacheHit: false,
      ctxVer: ctx.contextVersion,
      ui: yamlProbe.buttons ? { buttons: yamlProbe.buttons } : undefined,
    };
  }

  // LLM branch (borderline / no match)
  const perm = canCallLlm();
  if (!perm.ok) {
    const text = fallbackText(ctx.locale);
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

  // Prompt: includi un riassunto minimo del contesto utile, unito alle regole rigide
  const system = [
    FALLBACK_SYSTEM_PROMPT,
    '',
    'CONTESTO STRUTTURA:',
    `- Lingua: ${ctx.locale}`,
    `- Wi-Fi: ssid=${ctx.wifi?.ssid ?? 'n/d'}; password=${ctx.wifi?.password ?? 'n/d'}`,
    ctx.rules?.length ? `- Regole principali: ${ctx.rules.slice(0, 4).join(' | ')}` : '',
    ctx.emergencies?.phone ? `- Telefono emergenze: ${ctx.emergencies.phone}` : '',
  ]
    .filter(Boolean)
    .join('\n');

  // 🔥 Costruiamo il testo per l'LLM usando SOLO il contesto più recente
  const lastUserMessage =
    yamlProbe?.history && Array.isArray(yamlProbe.history)
      ? [...yamlProbe.history].reverse().find((m) => m.role === 'user')?.content ?? ''
      : '';

  const lastAssistantMessage =
    yamlProbe?.history && Array.isArray(yamlProbe.history)
      ? [...yamlProbe.history].reverse().find((m) => m.role === 'assistant')?.content ?? ''
      : '';

  const finalUserMessage = `
CONTESTO RECENTE DELLA CONVERSAZIONE:

Ultima risposta dell’assistente:
"${lastAssistantMessage}"

Ultima domanda dell’utente:
"${lastUserMessage}"

Nuova domanda dell’utente:
"${userMessage}"

ISTRUZIONE:
Rispondi collegando la nuova domanda ALL’ULTIMA RISPOSTA e ALL’ULTIMA DOMANDA dell’utente.
Ignora argomenti più vecchi se non sono citati esplicitamente.
`.trim();

  const res = await callLlm(finalUserMessage, {
    locale: ctx.locale,
    systemPrompt: system,
  });

  if (res && !res.error && res.text) {
    registerLlmSuccess();
    cacheSet(cacheKey, res.text);
    return {
      ok: true,
      source: 'llm',
      reply: res.text,
      intent: decision.intent,
      confidence: decision.confidence,
      cacheHit: false,
      ctxVer: ctx.contextVersion,
      snapshot: getRuntimeSnapshot(),
    };
  } else {
    registerLlmFailure();
    return {
      ok: false,
      source: 'llm',
      error: res.error ?? 'Unknown error',
      reply: fallbackText(ctx.locale),
      intent: decision.intent,
      confidence: decision.confidence,
      ctxVer: ctx.contextVersion,
      snapshot: getRuntimeSnapshot(),
    };
  }
}

function normalize(s: string) {
  return s.trim().toLowerCase().replace(/\s+/g, ' ').slice(0, 200);
}
function fallbackText(locale?: string) {
  return (locale || 'it').startsWith('it')
    ? 'Posso aiutarti con Wi-Fi, orari, regole o emergenze. Vuoi dirmi meglio cosa ti serve?'
    : 'I can help with Wi-Fi, hours, rules or emergencies. Could you specify what you need?';
}
