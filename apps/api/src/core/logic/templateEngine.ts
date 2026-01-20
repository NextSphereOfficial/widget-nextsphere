// apps/api/src/core/logic/templateEngine.ts

import { loadLangPack } from "../../content/loader.js";

function safeField(obj: any, pathStr: string, defaultValue: any = undefined) {
  try {
    const parts = pathStr.split(".");
    let current = obj;
    for (const p of parts) {
      if (!current || typeof current !== "object") return defaultValue;
      current = current[p];
    }
    return current ?? defaultValue;
  } catch {
    return defaultValue;
  }
}

// {{path.to.value}} → structureYaml[path.to.value]
function resolvePath(obj: any, pathStr: string): any {
  if (!obj || typeof pathStr !== "string") return undefined;

  return pathStr.split(".").reduce((acc: any, key: string) => {
    if (acc && Object.prototype.hasOwnProperty.call(acc, key)) return acc[key];
    return undefined;
  }, obj);
}

function applyTemplateToText(text: string, structureYaml: any): string {
  if (typeof text !== "string" || text.indexOf("{{") === -1) return text;

  return text.replace(/\{\{\s*([^}]+)\s*\}\}/g, (_match, expr) => {
    const pathStr = String(expr || "").trim();
    if (!pathStr) return "";

    const value = resolvePath(structureYaml, pathStr);
    if (value === undefined || value === null) return "";

    return typeof value === "string" ? value : String(value);
  });
}

export function fallbackText(structureYaml: any, intentKey: string, lang: string): string {
  if (!structureYaml || typeof structureYaml !== "object") return "";

  // 1) fallback specifico dell'intent
  const intentFallback =
    safeField(structureYaml, `intents.${intentKey}.output.fallback`) ??
    safeField(structureYaml, `intents.${intentKey}.output.short`);

  if (typeof intentFallback === "string" && intentFallback.trim()) {
    return applyTemplateToText(intentFallback, structureYaml);
  }

  // 2) fallback globale struttura
  const globalFallback =
    safeField(structureYaml, "content.fallback.default") ??
    safeField(structureYaml, "content.fallback.generic");

  if (typeof globalFallback === "string" && globalFallback.trim()) {
    return applyTemplateToText(globalFallback, structureYaml);
  }

  // 3) ultima rete di sicurezza
  return "";
}

function resolveIntentVars(intentDef: any, structureYaml: any, lang: string): Record<string, any> {
  const out: Record<string, any> = {};
  const vars = intentDef?.vars && typeof intentDef.vars === "object" ? intentDef.vars : {};

  const defaultLocale =
    structureYaml?.meta?.default_locale || structureYaml?.default_locale || "it";

  const pickLang = (val: any) => {
    if (val && typeof val === "object") {
      if (typeof val[lang] === "string") return val[lang];
      if (typeof val[defaultLocale] === "string") return val[defaultLocale];
      if (typeof val.it === "string") return val.it;
      return "";
    }
    return val === undefined || val === null ? "" : String(val);
  };

  const getContentPath = (path: string) => {
    const parts = path.split(".");
    let cur: any = structureYaml?.content;
    for (const p of parts) {
      if (!cur || typeof cur !== "object") return undefined;
      cur = cur[p];
    }
    return cur;
  };

  for (const [k, v] of Object.entries(vars)) {
    if (typeof v === "string") {
      const m = v.match(/^\{\{\s*content\.([a-zA-Z0-9_.-]+)\s*\}\}$/);
      if (m) {
        const raw = getContentPath(m[1]);
        out[k] = pickLang(raw);
        continue;
      }

      const resolved = applyTemplateToText(v, structureYaml);
      out[k] = pickLang(resolved);
      continue;
    }

    if (v === undefined || v === null) {
      out[k] = "";
      continue;
    }

    out[k] = pickLang(v);
  }

  return out;
}

function renderVars(template: string, vars: Record<string, any>): string {
  if (typeof template !== "string" || template.indexOf("{{") === -1) return template;

  return template.replace(/\{\{\s*([^}]+)\s*\}\}/g, (_m, expr) => {
    const key = String(expr || "").trim();
    if (!key) return "";

    if (Object.prototype.hasOwnProperty.call(vars, key)) {
      const v = vars[key];
      return v === undefined || v === null ? "" : String(v);
    }

    return `{{${key}}}`;
  });
}




export async function renderTemplate(
  structureYaml: any,
  intentKey: string,
  lang: string,
  mode: "short" | "long"
): Promise<{ text: string; buttons: any[] }> {
  const intents = structureYaml?.intents || {};
  const intentDef = intents[intentKey];

  if (!intentDef || typeof intentDef !== "object") {
    return { text: "", buttons: [] };
  }

  // 1) reply_key -> language pack (lang -> fallback it) + copy_overrides
  const replyKey = intentDef.reply_key;
  if (typeof replyKey === "string" && replyKey.trim()) {
    const overrideKey =
      (typeof (intentDef as any).override_key === "string" &&
      (intentDef as any).override_key.trim())
        ? (intentDef as any).override_key.trim()
        : replyKey.trim();

    const overrideTpl =
      structureYaml &&
      (structureYaml as any).content &&
      (structureYaml as any).content.copy_overrides &&
      typeof (structureYaml as any).content.copy_overrides === "object"
        ? (structureYaml as any).content.copy_overrides[overrideKey]
        : undefined;

    if (typeof overrideTpl === "string" && overrideTpl.trim()) {
      const vars = resolveIntentVars(intentDef, structureYaml, lang);
      const text = renderVars(overrideTpl, vars);
      const buttons =
        Array.isArray(intentDef?.output?.ui?.buttons) ? intentDef.output.ui.buttons : [];
      return { text, buttons };
    }

    const pack = await loadLangPack(lang);
    let template = pack?.[replyKey];

    if (template === undefined) {
      const itPack = await loadLangPack("it");
      template = itPack?.[replyKey];
    }

    if (typeof template === "string" && template.trim()) {
      const vars = resolveIntentVars(intentDef, structureYaml, lang);

      let text = renderVars(template, vars);
      text = applyTemplateToText(text, structureYaml);

      const buttons =
        Array.isArray(intentDef?.output?.ui?.buttons) ? intentDef.output.ui.buttons : [];

      return { text, buttons };
    }
  }

  // 2) BACKWARD COMPAT: vecchio schema output
  const output = intentDef.output || {};
  let text = "";

  if (typeof output.fallback === "string") text = output.fallback;
  else if (typeof output.default === "string") text = output.default;
  else if (mode === "long" && typeof output.long === "string") text = output.long;
  else if (typeof output.short === "string") text = output.short;
  else if (typeof output.long === "string") text = output.long;

  text = applyTemplateToText(text, structureYaml);

  const buttons = Array.isArray(output?.ui?.buttons) ? output.ui.buttons : [];

  return { text, buttons };
}

export function resolveEffectiveLang(inputLang: string | undefined, structureYaml: any): string {
  const fromBody = inputLang ? String(inputLang) : "";
  if (fromBody) return fromBody.slice(0, 2).toLowerCase();

  const metaLang =
    safeField(structureYaml, "meta.language") ??
    safeField(structureYaml, "meta.default_locale") ??
    "it";

  return String(metaLang || "it").slice(0, 2).toLowerCase();
}


// -----------------------------------------------------
// Helper: renderizza direttamente un reply_key
// (usato dall'orchestrator per follow-up / collect / confirm)
// -----------------------------------------------------
export async function renderReplyKey(
  structureYaml: any,
  replyKey: string,
  lang: string,
  vars: Record<string, any> = {}
): Promise<string> {
  const key = String(replyKey || "").trim();
  if (!key) return "";

  // 1) copy_overrides top-level (schema v2)
  const overridesRoot = (structureYaml as any)?.copy_overrides;
  const overrideTpl =
    overridesRoot && typeof overridesRoot === "object"
      ? overridesRoot?.[lang]?.[key] ?? overridesRoot?.it?.[key]
      : undefined;

  // 2) language pack
  const pack = await loadLangPack(lang);
  const itPack = key in (pack || {}) ? null : await loadLangPack("it");

  const template =
    (typeof overrideTpl === "string" && overrideTpl.trim())
      ? overrideTpl
      : (pack?.[key] ?? itPack?.[key]);

  if (typeof template !== "string" || !template.trim()) return "";

  // 3) render variabili + post-processing
  const text = applyTemplateToText(renderVars(template, vars), structureYaml);
  return text;
}
