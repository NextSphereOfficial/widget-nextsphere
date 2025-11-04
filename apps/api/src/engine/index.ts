// STRICT-NULL-SAFE INDEX
import type { EngineContext, EngineOutput, Lang, IntentsMap } from './types.js';
import { normalize, detectLangQuick } from './normalizer.js';
import { matchIntent } from './matcher.js';
import { extractRoom, resolveLang } from './entities.js';
import { renderTemplate, getIntentTemplate } from './templates.js';
import { buildClarify } from './fallback.js';

export async function run(ctx: EngineContext): Promise<EngineOutput> {
  const defaultLang = (ctx.structureYaml?.meta?.defaultLang ?? 'it') as Lang;
  const preferredLang = (ctx.lang ?? null) as Lang | null;
  const lang = resolveLang(preferredLang, defaultLang);
  const detected = detectLangQuick(ctx.message);
  const finalLang = (preferredLang ?? detected ?? lang ?? 'it') as Lang;

  const norm = normalize(ctx.message, finalLang);
  const room = extractRoom(ctx.room ?? undefined, ctx.message);

  const mergedIntents: IntentsMap = { ...ctx.intentsCore, ...(ctx.structureYaml.intents ?? {}) };

  const matches = matchIntent(norm.textNoStop, norm.lang, mergedIntents, ctx.config);
  const top = matches[0];

  if (!top || top.score < ctx.config.threshold) {
    const topIds = matches.slice(0, ctx.config.suggestTopN).map(m => m.intentId);
    const text = buildClarify(norm.lang, topIds, ctx.config);
    return {
      text,
      intent: null,
      confidence: top ? top.score : 0,
      lang: norm.lang,
      meta: {
        structureId: ctx.structureId,
        room: room ?? null,
        source: 'structure.yaml',
        reason: 'fallback',
        candidates: matches.map(m => ({ intentId: m.intentId, score: Number(m.score.toFixed(3)) }))
      }
    };
  }

  const intentId = top.intentId;
  let template = getIntentTemplate(ctx.structureYaml, intentId, norm.lang);
  if (!template) {
    const core = (ctx.intentsCore as any)[intentId];
    const k = norm.lang === 'it' ? 'template_it' : 'template_en';
    template = (core?.[k] ?? '') as string;
  }

  const textRaw = renderTemplate(template, ctx.structureYaml, norm.lang);
  const text = textRaw && textRaw.trim().length > 0
    ? textRaw
    : (norm.lang === 'it'
        ? 'Purtroppo mi manca un dato per rispondere. Contatta l’host, per favore.'
        : 'A required detail is missing to answer. Please contact the host.'
      );

  return {
    text,
    intent: intentId,
    confidence: Number(top.score.toFixed(3)),
    lang: norm.lang,
    meta: {
      structureId: ctx.structureId,
      room: room ?? null,
      source: 'structure.yaml',
      candidates: matches.slice(0, 3).map(m => ({ intentId: m.intentId, score: Number(m.score.toFixed(3)) }))
    }
  };
}
