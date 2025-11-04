import type { EngineConfig, Lang } from './types.js';

export function buildClarify(lang: Lang, topIds: string[], config: EngineConfig) {
  if (lang === 'en') {
    const base = `I'm not fully sure what you need.`;
    const ask = topIds.length ? `Do you need: ${topIds.join(' or ')}?`
                              : `I can help with Wi-Fi, check-in, house rules, emergencies.`;
    return `${base} ${ask}`.trim();
  }
  const base = `Non sono sicuro al 100% di cosa ti serve.`;
  const ask = topIds.length ? `Ti servono: ${topIds.join(' oppure ')}?`
                            : `Posso aiutarti con Wi-Fi, check-in, regole di casa, emergenze.`;
  return `${base} ${ask}`.trim();
}
