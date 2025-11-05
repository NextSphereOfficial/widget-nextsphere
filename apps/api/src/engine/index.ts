// engine/index.ts — SELF-CONTAINED, zero dipendenze esterne

export type Lang = "it" | "en";

type IntentDef = {
  id: string;
  priority?: number;
  synonyms_it?: string[];
  synonyms_en?: string[];
  keywords_it?: string[];
  keywords_en?: string[];
  patterns?: string[];
  negative?: string[];
  followups?: Partial<Record<Lang, string[]>>;
  output?: { default?: "short" | "long" };
};

type IntentsMap = Record<string, IntentDef>;

type StructureYaml = {
  meta?: {
    default_locale?: string;  // "it-IT"
    defaultLang?: string;     // legacy
  };
  responses?: Record<
    string,
    {
      short?: Partial<Record<Lang, string>>;
      long?: Partial<Record<Lang, string>>;
      fallback?: Partial<Record<Lang, string>>;
      buttons?: Partial<Record<Lang, Array<{ label: string; action: string }>>>;
    }
  >;
  [k: string]: any; // content, privacy, ecc.
};

export type EngineContext = {
  message: string;
  lang?: Lang;
  structureYaml: StructureYaml;
  intentsCore: IntentsMap;
  structureId?: string;
  config?: Record<string, any>;
};

export type EngineOutput = {
  text: string;
  intent: string;
  confidence: number;
  lang: Lang;
  meta?: {
    structureId?: string;
    room?: string | null;
    source?: string;
    mode?: "short" | "long";
    uiButtons?: Array<{ label: string; action: string }>;
    clarifyNeeded?: boolean;
    candidates?: Array<{ intentId: string; score: number }>;
  };
};

// ---------------- utils ----------------
const norm = (s = "") =>
  s.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");

function get(obj: any, path: string) {
  return String(path)
    .split(".")
    .reduce((acc, k) => (acc ? acc[k] : undefined), obj);
}
function stripQuotes(s?: string) {
  if (s == null) return s;
  return String(s).replace(/^['"]|['"]$/g, "");
}

// ---------------- templating ----------------
function hBool(val: any, whenFalse?: string, whenTrue?: string) {
  return val ? (whenTrue ?? "true") : (whenFalse ?? "false");
}

function renderTemplate(tpl: string, ctx: any) {
  if (!tpl) return "";

  // {{#bool path 'no' 'yes'}}
  tpl = tpl.replace(/\{\{#bool\s+([^}]+)\}\}/g, (_m, expr) => {
    const [path, whenFalse, whenTrue] = String(expr).trim().split(/\s+/);
    const val = get(ctx, path);
    return hBool(val, stripQuotes(whenFalse), stripQuotes(whenTrue));
  });

  // {{content.x.y}}
  tpl = tpl.replace(/\{\{\s*([^#][^}]*)\s*\}\}/g, (_m, pathRaw) => {
    const v = get(ctx, String(pathRaw).trim());
    return v == null ? "" : String(v);
  });

  return tpl;
}

// ---------------- lang & mode ----------------
function detectLangQuick(text: string, fallback: Lang): Lang {
  const t = norm(text);
  const itHits = ["ciao", "grazie", "per favore", "dove", "orario", "uscita", "emergenza"];
  const enHits = ["hello", "thanks", "please", "where", "time", "leave", "emergency"];
  const itScore = itHits.filter((w) => t.includes(w)).length;
  const enScore = enHits.filter((w) => t.includes(w)).length;
  if (itScore === 0 && enScore === 0) return fallback;
  return itScore >= enScore ? "it" : "en";
}

function detectMode(userText: string, defaultMode: "short" | "long" = "short"): "short" | "long" {
  const t = norm(userText);
  if (/\b(breve|riassunto|tl;dr)\b/.test(t)) return "short";
  if (/\b(dettagli|istruzioni|come|spiega)\b/.test(t)) return "long";
  return defaultMode;
}

// ---------------- intent scoring ----------------
function scoreIntent(userText: string, intent: IntentDef): number {
  const t = norm(userText);
  let score = intent.priority ?? 0;

  for (const bag of [intent.synonyms_it, intent.synonyms_en, intent.keywords_it, intent.keywords_en]) {
    if (Array.isArray(bag)) {
      for (const k of bag) if (k && t.includes(norm(k))) score += 5;
    }
  }

  if (Array.isArray(intent.patterns)) {
    for (const p of intent.patterns) {
      try {
        if (new RegExp(p, "i").test(userText)) score += 10;
      } catch {}
    }
  }

  if (Array.isArray(intent.negative)) {
    for (const n of intent.negative) if (n && t.includes(norm(n))) score -= 12;
  }
  return score;
}

// ---------------- render by intent ----------------
function extractButtons(yaml: StructureYaml, intentId: string, lang: Lang) {
  const raw = get(yaml, `responses.${intentId}.buttons.${lang}`) ?? [];
  if (!Array.isArray(raw)) return [];
  return raw.map((b: any) => ({
    label: renderTemplate(String(b?.label ?? ""), yaml),
    action: renderTemplate(String(b?.action ?? ""), yaml),
  }));
}

function fallbackText(yaml: StructureYaml, intentId: string, lang: Lang) {
  return (
    get(yaml, `responses.${intentId}.fallback.${lang}`) ??
    get(yaml, `responses.fallback.${lang}`) ??
    (lang === "en"
      ? "Sorry, I didn't get that. Could you rephrase?"
      : "Mi dispiace, non ho capito. Puoi riformulare?")
  );
}

function renderByIntent(yaml: StructureYaml, intentId: string, lang: Lang, mode: "short" | "long") {
  const node = yaml?.responses?.[intentId];
  if (!node) return { text: "", buttons: [] as Array<{ label: string; action: string }> };

  const template =
    node?.[mode]?.[lang] ??
    node?.short?.[lang] ??
    "";

  const text = renderTemplate(String(template || ""), yaml);
  const buttons = extractButtons(yaml, intentId, lang);
  return { text, buttons };
}

// ---------------- PUBLIC API ----------------
export async function run(ctx: EngineContext): Promise<EngineOutput> {
  const yamlDefault =
    ctx.structureYaml?.meta?.default_locale ||
    ctx.structureYaml?.meta?.defaultLang ||
    "it-IT";
  const defaultLang: Lang = yamlDefault.startsWith("it") ? "it" : "en";
  const lang: Lang = (ctx.lang as Lang) || detectLangQuick(ctx.message, defaultLang);

  // score intents
  const intents = Object.values(ctx.intentsCore || {});
  const scored = intents
    .filter((i) => i && i.id)
    .map((i) => ({ intentId: i.id, def: i, score: scoreIntent(ctx.message, i) }))
    .sort((a, b) => b.score - a.score);

  const top = scored[0] || { intentId: "fallback", def: { id: "fallback" } as IntentDef, score: 0 };
  const second = scored[1];

  const defaultModePref = (top.def?.output?.default === "long" ? "long" : "short") as "short" | "long";
  const mode = detectMode(ctx.message, defaultModePref);

  // follow-up se ambiguità e followup disponibile
  const ambiguous = !!(second && Math.abs((top.score ?? 0) - (second.score ?? 0)) < 8);
  const fu = ctx.intentsCore?.[top.intentId]?.followups?.[lang];
  if (ambiguous && fu && fu.length) {
    return {
      text: fu[0],
      intent: top.intentId,
      confidence: Number((top.score ?? 0).toFixed(3)),
      lang,
      meta: {
        structureId: ctx.structureId,
        source: "structure.yaml",
        mode,
        uiButtons: [],
        clarifyNeeded: true,
        candidates: scored.slice(0, 3).map((m) => ({ intentId: m.intentId, score: Number((m.score ?? 0).toFixed(3)) })),
      },
    };
  }

  // render
  let { text, buttons } = renderByIntent(ctx.structureYaml, top.intentId, lang, mode);
  if (!text) text = fallbackText(ctx.structureYaml, top.intentId, lang);

  return {
    text,
    intent: top.intentId,
    confidence: Number((top.score ?? 0).toFixed(3)),
    lang,
    meta: {
      structureId: ctx.structureId,
      source: "structure.yaml",
      mode,
      uiButtons: buttons,
      candidates: scored.slice(0, 3).map((m) => ({ intentId: m.intentId, score: Number((m.score ?? 0).toFixed(3)) })),
    },
  };
}
