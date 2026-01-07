// apps/api/src/core/logic/sanitize.ts

import { norm } from "./intentResolver.js";

export function pickLocalizedText(val: any, lang: string) {
  if (val == null) return "";
  if (typeof val === "string") return val;

  if (typeof val === "object") {
    const tryKeys = [lang, "en", "it", "de", "fr", "es"];
    for (const k of tryKeys) {
      const v = (val as any)?.[k];
      if (typeof v === "string" && v.trim()) return v;
    }
  }

  try {
    return JSON.stringify(val);
  } catch {
    return String(val);
  }
}

export function sanitizeYamlReply(text: string, userMessage: string, intent?: string) {
  let t = String(text || "").trim();
  if (!t) return t;

  const um = norm(userMessage);
  const userIsGreeting =
    /^(ciao|salve|buongiorno|buonasera|hello|hi|hey|hola|hallo|bonjour|salut|bonsoir)\b/.test(um);

  if (!userIsGreeting && intent !== "welcome") {
    const parts = t
      .split(/(?<=[.!?])\s+/)
      .map((x) => x.trim())
      .filter(Boolean);

    if (parts.length > 1) {
      const first = norm(parts[0]);
      const looksWelcome =
        first.includes("benvenut") ||
        first.includes("welcome") ||
        first.includes("bienvenid") ||
        first.includes("willkomm") ||
        first.includes("bienvenue");

      if (looksWelcome) {
        parts.shift();
        t = parts.join(" ").trim();
      }
    }
  }

  const sents = t
    .split(/(?<=[.!?])\s+/)
    .map((x) => x.trim())
    .filter(Boolean);

  if (sents.length > 3) t = sents.slice(0, 3).join(" ").trim();

  return t;
}

export function noInfoText(lang: string) {
  switch ((lang || "it").toLowerCase()) {
    case "en":
      return "I don’t have that information yet. Please contact the host if you need it right now.";
    case "de":
      return "Diese Information habe ich noch nicht. Bitte kontaktiere den Gastgeber, wenn du sie sofort brauchst.";
    case "fr":
      return "Je n’ai pas encore cette information. Contactez l’hôte si vous en avez besoin tout de suite.";
    case "es":
      return "Aún no tengo esa información. Contacta con el anfitrión si la necesitas ahora mismo.";
    default:
      return "Non ho ancora questa informazione. Se ti serve subito, contatta l’host.";
  }
}

export function parseTimeFromText(raw: string): string | null {
  const t = norm(raw);

  const m = t.match(/\b(\d{1,2})(?:[:.](\d{2}))?\b/);
  if (!m) return null;

  const hh = Number(m[1]);
  const mm = m[2] ? Number(m[2]) : 0;

  if (!Number.isFinite(hh) || !Number.isFinite(mm)) return null;
  if (hh < 0 || hh > 23) return null;
  if (mm < 0 || mm > 59) return null;

  const HH = String(hh).padStart(2, "0");
  const MM = String(mm).padStart(2, "0");
  return `${HH}:${MM}`;
}
