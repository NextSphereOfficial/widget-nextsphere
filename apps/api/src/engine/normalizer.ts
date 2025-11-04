import type { Lang } from './types.js';

const stopwords = {
  it: ['il','lo','la','i','gli','le','un','una','di','del','della','e','o','che','per','con','da','su','a','al','ai','agli','alle','degli'],
  en: ['the','a','an','of','and','or','for','with','to','from','on','in','at','by']
};

function stripPunctuationSoft(s: string) {
  return s.replace(/[\.,!?:;"'()\[\]{}<>/\\|-]/g, ' ');
}

export function detectLangQuick(message: string): Lang {
  const m = message.toLowerCase();
  const itHits = ['il ','la ','della ','che ','per ','con ','ciao','grazie','qual','orario','wifi','password'].filter(w => m.includes(w));
  const enHits = ['the ','and ','please','hello','thanks','what','time','wifi','password'].filter(w => m.includes(w));
  if (itHits.length >= enHits.length) return 'it';
  return 'en';
}

export function normalize(message: string, lang?: Lang) {
  const l = lang ?? detectLangQuick(message);
  const lowered = stripPunctuationSoft(message.toLowerCase()).replace(/\s+/g, ' ').trim();
  const tokens = lowered.split(' ').filter(Boolean);
  const sw = new Set(stopwords[l] ?? []);
  const tokensNoStop = tokens.filter(t => !sw.has(t));
  return { lang: l as Lang, original: message, lowered, tokens, tokensNoStop, textNoStop: tokensNoStop.join(' ') };
}
