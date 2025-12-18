// src/utils/params.ts
export type Lang = string; // <-- non limitarla a it/en/auto

export function getQueryParam(name: string, search = window.location.search): string | null {
  const params = new URLSearchParams(search);
  const val = params.get(name);
  return val && val.trim() !== '' ? val.trim() : null;
}

export type Mode = 'default' | 'future';

export function getInitialContext() {
  const hotel = getQueryParam('hotel') ?? 'NS001';
  const room  = getQueryParam('room')  ?? '101';

  const langRaw = (getQueryParam('lang') ?? 'auto').toLowerCase();

  // mode=future | default
  const modeParam = (getQueryParam('mode') ?? 'default').toLowerCase();
  const mode: Mode = modeParam === 'future' ? 'future' : 'default';

  // rilevazione lingua browser (auto) oppure forza ?lang=xx
  const browser = (navigator.language || 'it').slice(0, 2).toLowerCase();

  const resolvedLang =
    langRaw === 'auto'
      ? browser
      : langRaw.slice(0, 2).toLowerCase(); // "en-GB" -> "en"

  return { hotel, room, langParam: langRaw, locale: resolvedLang, mode };
}



