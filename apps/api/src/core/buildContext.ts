import { ENV } from './env.js';
import crypto from 'node:crypto';
import { loadStructure } from './yamlLoader.js';

export interface StructureContext {
  id: string;
  locale: string;
  brandName?: string;
  address?: string;
  wifi?: { ssid?: string; password?: string; notes?: string };
  rules?: string[];
  emergencies?: { phone?: string; notes?: string };
  checkin?: { from?: string; latePolicy?: string };
  checkout?: { until?: string; latePolicy?: string };
  surroundings?: Array<{ name: string; kind: string; distance?: string }>;
  contextVersion: string;
}

/**
 * v0 (stub sicuro): costruisce un contesto valido anche senza sorgente YAML.
 * In uno step successivo collegheremo il tuo vero loader YAML.
 */
export async function buildContext(structureId: string): Promise<StructureContext> {
  const y: any = await loadStructure(structureId); // <-- usa il loader vero

  const locale = y?.locale ?? ENV.DEFAULT_LOCALE;
  return {
    id: structureId,
    locale,
    brandName: y?.brandName ?? 'NextSphere',
    address: y?.address,
    wifi: y?.wifi ?? {},
    rules: Array.isArray(y?.rules) ? y.rules : [],
    emergencies: y?.emergencies ?? {},
    checkin: y?.checkin ?? {},
    checkout: y?.checkout ?? {},
    surroundings: Array.isArray(y?.surroundings) ? y.surroundings : [],
    contextVersion: hashObject({
      version: y?.version ?? 'v1',
      wifi: y?.wifi, rules: y?.rules, emergencies: y?.emergencies,
      checkin: y?.checkin, checkout: y?.checkout, surroundings: y?.surroundings,
      locale
    }),
  };
}

function hashObject(obj: unknown): string {
  const s = JSON.stringify(obj);
  return crypto.createHash('sha256').update(s).digest('hex').slice(0, 12);
}
