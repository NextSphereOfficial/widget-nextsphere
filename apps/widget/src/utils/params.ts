// src/utils/params.ts
export type Lang = 'it' | 'en' | 'auto';

export function getQueryParam(name: string, search = window.location.search): string | null {
  const read = (s: string | null | undefined) => {
    if (!s) return null;
    const params = new URLSearchParams(s);
    const val = params.get(name);
    return val && val.trim() !== "" ? val.trim() : null;
  };

  // 1) prima prova i query params dell'iframe/widget
  const direct = read(search);
  if (direct) return direct;

  // 2) fallback: se siamo in iframe, spesso la pagina host è in document.referrer
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

