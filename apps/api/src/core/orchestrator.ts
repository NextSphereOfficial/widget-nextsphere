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

function keyHash(x: unknown) {
  return crypto.createHash('sha256').update(JSON.stringify(x)).digest('hex').slice(0, 16);
}

/**
 * Orchestratore: unifica YAML + LLM.
 * Nota: qui assumiamo che il matcher YAML sia esterno alla route.
 * Se la route non ha un matcher, questo orchestratore può operare “LLM-only”.
 */
export async function orchestrateChat(structureId: string, userMessage: string, yamlProbe?: {
  matched: boolean; intent?: string; confidence?: number; replyText?: string; buttons?: any[];
}) {
  const ctx = await buildContext(structureId);

  // decisione (se non hai confidenza dal matcher, passa matched=false)
  const decision = decideResponse({
    matched: !!yamlProbe?.matched,
    intent: yamlProbe?.intent,
    confidence: yamlProbe?.confidence
  });

  // Cache: include contesto (ctxVer) + sorgente
  const cacheKey = keyHash({
    s: structureId,
    m: normalize(userMessage),
    v: ctx.contextVersion,
    src: decision.source
  });
  const c = cacheGet(cacheKey);
  if (c.hit) {
    return {
      ok: true,
      source: decision.source,
      reply: c.value!,
      intent: decision.intent,
      confidence: decision.confidence,
      cacheHit: true,
      ctxVer: ctx.contextVersion
    };
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
      ui: yamlProbe.buttons ? { buttons: yamlProbe.buttons } : undefined
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
      ctxVer: ctx.contextVersion,
      snapshot: getRuntimeSnapshot()
    };
  }

  // Prompt: includi un riassunto minimo del contesto utile
  const system = [
    `Sei il Concierge NextSphere. Rispondi in ${ctx.locale}.`,
    `Dati utili:`,
    `- Wi-Fi: ssid=${ctx.wifi?.ssid ?? 'n/d'}; password=${ctx.wifi?.password ?? 'n/d'}`,
    ctx.rules?.length ? `- Regole: ${ctx.rules.slice(0,4).join(' | ')}` : '',
    ctx.emergencies?.phone ? `- Emergenze: tel=${ctx.emergencies.phone}` : ''
  ].filter(Boolean).join('\n');

  const res = await callLlm(userMessage, { locale: ctx.locale, systemPrompt: system });
  if (res.ok && res.text) {
    registerLlmSuccess(res.costEur || 0);
    cacheSet(cacheKey, res.text);
    return {
      ok: true,
      source: 'llm',
      reply: res.text,
      tokensIn: res.tokensIn,
      tokensOut: res.tokensOut,
      costEur: res.costEur,
      latencyMs: res.latencyMs,
      intent: decision.intent,
      confidence: decision.confidence,
      cacheHit: false,
      ctxVer: ctx.contextVersion,
      snapshot: getRuntimeSnapshot()
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
      snapshot: getRuntimeSnapshot()
    };
  }
}

function normalize(s: string) { return s.trim().toLowerCase().replace(/\s+/g, ' ').slice(0, 200); }
function fallbackText(locale?: string) {
  return (locale || 'it').startsWith('it')
    ? 'Posso aiutarti con Wi-Fi, orari, regole o emergenze. Vuoi dirmi meglio cosa ti serve?'
    : 'I can help with Wi-Fi, hours, rules or emergencies. Could you specify what you need?';
}
