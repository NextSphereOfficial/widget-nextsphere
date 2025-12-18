// src/utils/params.ts
export type Lang = string; // <-- non limitarla a it/en

export function getQueryParam(name: string, search = window.location.search): string | null {
  const read = (s: string | null | undefined) => {
    if (!s) return null;
    const params = new URLSearchParams(s);
    const val = params.get(name);
    return val && val.trim() !== '' ? val.trim() : null;
  };

  // 1) query dell'iframe/widget
  const direct = read(search);
  if (direct) return direct;

  // 2) query della pagina parent (funziona se same-origin)
  try {
    const parentSearch = window.parent?.location?.search;
    const fromParent = read(parentSearch);
    if (fromParent) return fromParent;
  } catch {
    // cross-origin: ignoriamo
  }

  // 3) referrer (se disponibile)
  try {
    const ref = document.referrer;
    if (ref) {
      const refUrl = new URL(ref);
      const fromRef = read(refUrl.search);
      if (fromRef) return fromRef;
    }
  } catch {
    // ignore
  }

  return null;
}



export type Mode = 'default' | 'future';

export function getInitialContext() {
  console.info("[Widget params] search=", window.location.search);
  console.info("[Widget params] lang=", getQueryParam("lang"), "hotel=", getQueryParam("hotel"), "room=", getQueryParam("room"));
  const hotel = getQueryParam('hotel') ?? 'NS001';
  const room  = getQueryParam('room')  ?? '101';
  const langQ = (getQueryParam('lang') ?? 'auto').toLowerCase() as Lang;

  // 👇 nuovo: mode=future | default
  const modeParam = (getQueryParam('mode') ?? 'default').toLowerCase();
  const mode: Mode = modeParam === 'future' ? 'future' : 'default';

  // rilevazione lingua browser con fallback it
  const browser = (navigator.language || 'it').slice(0, 2).toLowerCase();
  const resolvedLang: 'it' | 'en' =
    langQ === 'auto' ? (browser === 'en' ? 'en' : 'it') : (langQ === 'en' ? 'en' : 'it');

  return { hotel, room, langParam: langQ, locale: resolvedLang, mode };
}

