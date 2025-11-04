// STRICT-NULL-SAFE ENTITIES
import type { Lang } from './types.js';

export function extractRoom(inputRoom?: string | null, message?: string): string | null {
  if (inputRoom != null && inputRoom !== '') return inputRoom;
  if (!message) return null;
  const m = message.match(/\b(\d{3})\b/);
  return m ? m[1] : null;
}

export function resolveLang(preferred: Lang | null | undefined, defaultLang: Lang | undefined): Lang {
  return (preferred ?? defaultLang ?? 'it') as Lang;
}
