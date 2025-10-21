// src/utils/params.ts
export type Lang = 'it' | 'en' | 'auto';

export function getQueryParam(name: string, search = window.location.search): string | null {
  const params = new URLSearchParams(search);
  const val = params.get(name);
  return val && val.trim() !== '' ? val.trim() : null;
}

export function getInitialContext() {
  const hotel = getQueryParam('hotel') ?? 'NS001';
  const room  = getQueryParam('room')  ?? '101';
  const langQ = (getQueryParam('lang') ?? 'auto').toLowerCase() as Lang;

  // rilevazione lingua browser con fallback it
  const browser = (navigator.language || 'it').slice(0, 2).toLowerCase();
  const resolvedLang: 'it' | 'en' =
    langQ === 'auto' ? (browser === 'en' ? 'en' : 'it') : (langQ === 'en' ? 'en' : 'it');

  return { hotel, room, langParam: langQ, locale: resolvedLang };
}
