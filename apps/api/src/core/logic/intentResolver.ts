// apps/api/src/core/logic/intentResolver.ts

export type IntentMatch = {
  key: string;
  score: number;
  matched: boolean;
};

export type IntentResolution = {
  key: string;
  matched: boolean;
  score: number;
  secondScore: number;
  margin: number;
  confidence: number; // 0..1
  isSingleWord: boolean;
};

export function norm(s: string) {
  return String(s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[_\-]+/g, " ")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function clamp(n: number, min = 0, max = 1) {
  return Math.max(min, Math.min(max, n));
}

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function includesWord(t: string, w: string) {
  if (!t || !w) return false;
  const re = new RegExp(`\\b${escapeRegExp(w)}\\b`, "i");
  return re.test(t);
}

function scoreIntent(
  text: string,
  intent: {
    id?: string;
    synonyms?: string[];
    keywords?: string[];
    patterns?: string[];
    negative?: string[];
    priority?: number;
  }
): { score: number; matched: boolean } {
  const t = norm(text);
  let score = 0;
  let matched = false;

  const allSynonyms = (intent.synonyms || []).map(norm).filter(Boolean);
  const allKeywords = (intent.keywords || []).map(norm).filter(Boolean);
  const allPatterns = (intent.patterns || []).map(norm).filter(Boolean);
  const allNegative = (intent.negative || []).map(norm).filter(Boolean);

  for (const n of allNegative) {
    if (t.includes(n)) score -= 5;
  }

  for (const s of allSynonyms) {
    if (includesWord(t, s)) {
      score += 5;
      matched = true;
    }
  }

  for (const k of allKeywords) {
    if (includesWord(t, k)) {
      score += 3;
      matched = true;
    }
  }

  for (const p of allPatterns) {
    try {
      const looksRegex = /[.*+?^${}()|[\]\\]/.test(p);

      if (looksRegex) {
        const re = new RegExp(p, "i");
        if (re.test(t)) {
          score += 4;
          matched = true;
        }
      } else {
        const phrase = escapeRegExp(p).replace(/\s+/g, "\\s+");
        const re = new RegExp(`(^|\\s)${phrase}(\\s|$)`, "i");
        if (re.test(t)) {
          score += 4;
          matched = true;
        }
      }
    } catch {
      /* ignore invalid regex */
    }
  }

  if (matched) score += intent.priority ?? 0;
  return { score, matched };
}

export function resolveIntent(
  userText: string,
  intentsCore: Record<string, any>
): IntentResolution {
  const t = norm(userText);

  const tokens = t.split(" ").filter(Boolean);
  const isSingleWord = tokens.length === 1;

  const intents: IntentMatch[] = Object.entries(intentsCore || {}).map(
    ([key, value]) => {
      const intent = value as any;
      const { score, matched } = scoreIntent(t, intent);
      return { key, score, matched };
    }
  );

  // override euristici per intent base
  if (/\bwi\s*fi\b/.test(t) || t.includes("wifi") || t.includes("ssid")) {
    const idx = intents.findIndex((i) => i.key === "wifi");
    if (idx >= 0) intents[idx] = { key: "wifi", score: 999, matched: true };
    else intents.push({ key: "wifi", score: 999, matched: true });
  }

  if (
    t.includes("late checkout") ||
    /posticip(a|o)\s*il?\s*checkout/.test(t) ||
    /checkout\s*tardi/.test(t)
  ) {
    const idx = intents.findIndex((i) => i.key === "late_checkout");
    if (idx >= 0) intents[idx] = { key: "late_checkout", score: 999, matched: true };
    else intents.push({ key: "late_checkout", score: 999, matched: true });
  }

  if (
    t.includes("emergenz") ||
    t.includes("ambulanza") ||
    t.includes("polizia") ||
    t.includes("carabinieri") ||
    t.includes("fuoco") ||
    t.includes("incendio")
  ) {
    const idx = intents.findIndex((i) => i.key === "emergency");
    if (idx >= 0) intents[idx] = { key: "emergency", score: 999, matched: true };
    else intents.push({ key: "emergency", score: 999, matched: true });
  }

  intents.sort((a, b) => b.score - a.score);
  const top = intents[0];
  const second = intents[1];

  if (!top || top.score <= 0) {
    return {
      key: "fallback",
      matched: false,
      score: 0,
      secondScore: second?.score ?? 0,
      margin: 0,
      confidence: 0,
      isSingleWord,
    };
  }

  if (
    isSingleWord &&
    top.key === "welcome" &&
    !/^(ciao|salve|buongiorno|buonasera|hello|hi|hey|hola|hallo|bonjour|salut|bonsoir)\b/.test(t)
  ) {
    return {
      key: "fallback",
      matched: false,
      score: 0,
      secondScore: second?.score ?? 0,
      margin: 0,
      confidence: 0,
      isSingleWord,
    };
  }

  const secondScore = second?.score ?? 0;
  const margin = top.score - secondScore;

  let confidence = clamp(top.score / 10);
  if (margin >= 3) confidence = clamp(confidence + 0.15);

  const singleWordAllow = new Set(["wifi", "emergency", "welcome"]);
  if (isSingleWord && !singleWordAllow.has(top.key)) {
    confidence = clamp(confidence - 0.15);
  }

  return {
    key: top.key,
    matched: true,
    score: top.score,
    secondScore,
    margin,
    confidence,
    isSingleWord,
  };
}
