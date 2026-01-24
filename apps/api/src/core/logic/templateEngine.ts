// apps/api/src/core/logic/templateEngine.ts

import { loadLangPack } from "../../content/loader.js";

/**
 * Safe getter for dotted paths.
 */
function safeField(obj: any, pathStr: string, defaultValue: any = undefined) {
  try {
    const parts = String(pathStr || "").split(".");
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

/**
 * Resolve dotted path inside an object.
 * Example: resolvePath(structureYaml, "wifi.ssid")
 */
function resolvePath(obj: any, pathStr: string): any {
  if (!obj || typeof pathStr !== "string") return undefined;

  return pathStr.split(".").reduce((acc: any, key: string) => {
    if (acc && Object.prototype.hasOwnProperty.call(acc, key)) return acc[key];
    return undefined;
  }, obj);
}

/**
 * Replace {{path.to.value}} with structureYaml[path.to.value].
 * This is a "late" pass used for backward-compat or simple path expansions.
 */
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

/**
 * Flattens a structure object into a single-level context for templates
 * that expect plain keys like {{ssid}}, {{checkout_by}}, {{parking_note}}.
 *
 * Priority (later wins):
 * 1) structureYaml root keys
 * 2) common sections spread (hotel, wifi, checkin, checkout, parking, ...)
 * 3) explicit vars passed at call time (e.g., { time })
 */
function buildFlatTemplateCtx(structureYaml: any, vars: Record<string, any> = {}): Record<string, any> {
  const s = structureYaml && typeof structureYaml === "object" ? structureYaml : {};

  const flat: Record<string, any> = {
    ...(s || {}),
  };

  // Common sections we want to "spread" for legacy/pack templates.
  const sections = [
    "hotel",
    "wifi",
    "checkin",
    "checkout",
    "house_rules",
    "contacts",
    "parking",
    "breakfast",
    "transport",
    "restaurants",
    "fallback",
  ];

  for (const k of sections) {
    const v = (s as any)[k];
    if (v && typeof v === "object" && !Array.isArray(v)) {
      Object.assign(flat, v);
    }
  }

  // Also expose a few "nice" aliases if present (safe no-ops if missing)
  if ((s as any).meta?.structure?.name && flat.hotel_name == null) {
    flat.hotel_name = (s as any).meta.structure.name;
  }

  // Finally, explicit runtime vars win (e.g., time, user name, etc.)
  if (vars && typeof vars === "object") {
    Object.assign(flat, vars);
  }

  return flat;
}

export function fallbackText(structureYaml: any, intentKey: string, _lang: string): string {
  if (!structureYaml || typeof structureYaml !== "object") return "";

  // 1) intent-specific fallback
  const intentFallback =
    safeField(structureYaml, `intents.${intentKey}.output.fallback`) ??
    safeField(structureYaml, `intents.${intentKey}.output.short`);

  if (typeof intentFallback === "string" && intentFallback.trim()) {
    return applyTemplateToText(intentFallback, structureYaml);
  }

  // 2) global fallback (schema v2: top-level fallback.text; keep compat with older keys too)
  const globalFallback =
    safeField(structureYaml, "fallback.text") ??
    safeField(structureYaml, "content.fallback.default") ??
    safeField(structureYaml, "content.fallback.generic");

  if (typeof globalFallback === "string" && globalFallback.trim()) {
    return applyTemplateToText(globalFallback, structureYaml);
  }

  // 3) last resort
  return "";
}

/**
 * Resolve intent vars (optional helper for intentDef.vars)
 * Supports:
 * - plain values
 * - localized objects {it/en/...}
 * - strings containing {{path}} placeholders (resolved later)
 */
function resolveIntentVars(intentDef: any, structureYaml: any, lang: string): Record<string, any> {
  const out: Record<string, any> = {};
  const vars = intentDef?.vars && typeof intentDef.vars === "object" ? intentDef.vars : {};

  const defaultLocale =
    structureYaml?.meta?.default_locale || structureYaml?.default_locale || "it";

  const pickLang = (val: any) => {
    if (val && typeof val === "object" && !Array.isArray(val)) {
      if (typeof val[lang] === "string") return val[lang];
      if (typeof val[defaultLocale] === "string") return val[defaultLocale];
      if (typeof val.it === "string") return val.it;
      return "";
    }
    return val === undefined || val === null ? "" : String(val);
  };

  for (const [k, v] of Object.entries(vars)) {
    if (typeof v === "string") {
      // allow embedded {{path}} placeholders resolved against structureYaml
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

/**
 * Simple template renderer for {{key}} using a flat ctx.
 * - If key not found, leaves {{key}} intact (so it may be resolved by applyTemplateToText later).
 */
function renderVars(template: string, ctx: Record<string, any>): string {
  if (typeof template !== "string" || template.indexOf("{{") === -1) return template;

  return template.replace(/\{\{\s*([^}]+)\s*\}\}/g, (_m, expr) => {
    const key = String(expr || "").trim();
    if (!key) return "";

    if (Object.prototype.hasOwnProperty.call(ctx, key)) {
      const v = (ctx as any)[key];
      return v === undefined || v === null ? "" : String(v);
    }

    // keep placeholder for optional later pass
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
      typeof (intentDef as any).override_key === "string" && (intentDef as any).override_key.trim()
        ? (intentDef as any).override_key.trim()
        : replyKey.trim();

    // schema v2: copy_overrides at top-level by lang
    const overridesRoot = (structureYaml as any)?.copy_overrides;
    const overrideTpl =
      overridesRoot && typeof overridesRoot === "object"
        ? overridesRoot?.[lang]?.[overrideKey] ?? overridesRoot?.it?.[overrideKey]
        : undefined;

    const pack = await loadLangPack(lang);
    const itPack = overrideKey in (pack || {}) ? null : await loadLangPack("it");

    const template =
      (typeof overrideTpl === "string" && overrideTpl.trim())
        ? overrideTpl
        : (pack?.[replyKey] ?? itPack?.[replyKey]);

    if (typeof template === "string" && template.trim()) {
      // Intent vars (optional) + structure flat ctx
      const intentVars = resolveIntentVars(intentDef, structureYaml, lang);
      const ctx = buildFlatTemplateCtx(structureYaml, intentVars);

      let text = renderVars(template, ctx);
      text = applyTemplateToText(text, structureYaml);

      const buttons =
        Array.isArray(intentDef?.output?.ui?.buttons) ? intentDef.output.ui.buttons : [];

      return { text, buttons };
    }
  }

  // 2) BACKWARD COMPAT: old output schema
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
// Helper: render directly a reply_key
// Used by orchestrator for follow-up / collect / closing messages
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

  // 2) language pack (lang -> fallback it)
  const pack = await loadLangPack(lang);
  const itPack = key in (pack || {}) ? null : await loadLangPack("it");

  const template =
    (typeof overrideTpl === "string" && overrideTpl.trim())
      ? overrideTpl
      : (pack?.[key] ?? itPack?.[key]);

  if (typeof template !== "string" || !template.trim()) return "";

  // 3) render with flat ctx (structure + common sections + runtime vars)
  const ctx = buildFlatTemplateCtx(structureYaml, vars);

  let text = renderVars(template, ctx);
  text = applyTemplateToText(text, structureYaml);

  return text;
}
