// config/mergeconfig.ts — shim minimale per evitare errori di tipo/import

export type DeepPartial<T> = { [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K] };

export type ResponseConfig = {
  defaultMode: "short" | "long";
  maxButtons: number;
};

export const DEFAULT_RESPONSE_CONFIG: ResponseConfig = {
  defaultMode: "short",
  maxButtons: 3,
};

export function mergeConfig<T extends object>(base: T, override?: DeepPartial<T>): T {
  if (!override) return base;
  const out: any = Array.isArray(base) ? [...(base as any)] : { ...(base as any) };
  for (const [k, v] of Object.entries(override)) {
    if (v && typeof v === "object" && !Array.isArray(v)) {
      out[k] = mergeConfig((out[k] ?? {}) as any, v as any);
    } else {
      out[k] = v;
    }
  }
  return out as T;
}
