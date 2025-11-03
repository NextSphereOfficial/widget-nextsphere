import type { Defaults } from "../../../types/Structure.js";

function isPlainObject(v: any): v is Record<string, any> {
  return v && typeof v === "object" && !Array.isArray(v);
}

export function deepMerge<T>(base: T, patch: Partial<T>): T {
  if (Array.isArray(base) && Array.isArray(patch)) {
    return patch as any;
  }
  if (isPlainObject(base) && isPlainObject(patch)) {
    const out: Record<string, any> = { ...base };
    for (const k of Object.keys(patch)) {
      const a = (base as any)[k];
      const b = (patch as any)[k];
      out[k] = (isPlainObject(a) || Array.isArray(a)) && (isPlainObject(b) || Array.isArray(b))
        ? deepMerge(a, b)
        : b;
    }
    return out as T;
  }
  return (patch as any) ?? base;
}

export function mergeDefaultsWithOverrides(defaults: Defaults, overrides?: Partial<Defaults>): Defaults {
  if (!overrides) return defaults;
  return deepMerge(defaults, overrides);
}
