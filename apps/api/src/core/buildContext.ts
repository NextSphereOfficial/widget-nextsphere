import { ENV } from './env.js';
import crypto from 'node:crypto';
import { loadStructure } from '../content/loader.js';

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
 * Builder “puro”: costruisce il contesto da YAML già caricato.
 * Questa è la versione usata dal routing chat.ts per evitare doppio load.
 */
export function buildContextFromYaml(structureId: string, y: any): StructureContext {
  // --- Locale ---
  let locale: string | undefined = y?.locale;

  if (!locale) {
    const lang =
      y?.meta?.language ||
      y?.meta?.default_lang ||
      y?.language;

    if (lang) {
      if (lang === 'it') locale = 'it-IT';
      else if (lang === 'en') locale = 'en-US';
      else locale = String(lang);
    }
  }

  if (!locale) {
    locale = ENV.DEFAULT_LOCALE;
  }

  // --- Brand / address ---
  const brandName: string | undefined =
    y?.brandName ?? y?.meta?.name ?? 'NextSphere';
  const address: string | undefined = y?.address ?? y?.meta?.address;

  // --- Content section (refined YAML) ---
  const content = y?.content ?? {};

  // Wi-Fi
  const contentWifi = content?.wifi ?? {};
  const rootWifi = y?.wifi ?? {};
  const wifi = {
    ssid: contentWifi.ssid ?? rootWifi.ssid,
    password: contentWifi.password ?? rootWifi.password,
    notes: contentWifi.notes ?? rootWifi.notes,
  };

  // Regole
  const contentRules = Array.isArray(content?.rules) ? content.rules : undefined;
  const rules =
    contentRules ??
    (Array.isArray(y?.rules) ? y.rules : []);

  // Emergenze
  const contentEmergency = content?.emergency ?? {};
  const rootEmergencies = y?.emergencies ?? {};
  const emergencies = {
    phone: contentEmergency.phone ?? rootEmergencies.phone,
    notes:
      contentEmergency.note ??
      contentEmergency.notes ??
      rootEmergencies.notes,
  };

  // Check-in
  const contentCheckin = content?.checkin ?? {};
  const rootCheckin = y?.checkin ?? {};
  const checkin = {
    from: contentCheckin.from ?? rootCheckin.from,
    latePolicy:
      contentCheckin.late_policy ??
      contentCheckin.latePolicy ??
      rootCheckin.latePolicy,
  };

  // Check-out
  const contentCheckout = content?.checkout ?? {};
  const rootCheckout = y?.checkout ?? {};
  const checkout = {
    until: contentCheckout.until ?? rootCheckout.until,
    latePolicy:
      contentCheckout.late_policy ??
      contentCheckout.latePolicy ??
      rootCheckout.latePolicy,
  };

  // Surroundings
  const contentSurroundings = Array.isArray(content?.surroundings)
    ? content.surroundings
    : undefined;
  const surroundings =
    contentSurroundings ??
    (Array.isArray(y?.surroundings) ? y.surroundings : []);

  return {
    id: structureId,
    locale,
    brandName,
    address,
    wifi,
    rules,
    emergencies,
    checkin,
    checkout,
    surroundings,
    contextVersion: hashObject({
      version: y?.version ?? y?.meta?.version ?? 'v1',
      wifi,
      rules,
      emergencies,
      checkin,
      checkout,
      surroundings,
      locale,
    }),
  };
}

/**
 * Wrapper compatibile: carica YAML e poi delega al builder puro.
 */
export async function buildContext(structureId: string): Promise<StructureContext> {
  const y: any = await loadStructure(structureId);
  return buildContextFromYaml(structureId, y);
}

function hashObject(obj: unknown): string {
  const s = JSON.stringify(obj);
  return crypto.createHash('sha256').update(s).digest('hex').slice(0, 12);
}


