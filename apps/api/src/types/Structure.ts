// apps/api/src/Structure.ts
// Schema tipi allineato ai nuovi YAML (versione 1.1.0).
// Sicuro da usare anche solo come typing: mantiene un export runtime per non rompere import di valore.

export type Locale = "it" | "en";

export type Meta = {
  structure: { id: string; name: string };
  /** Nuovo campo (preferito) */
  default_locale?: string;        // es. "it-IT"
  /** Campo legacy ancora supportato nel codice */
  defaultLang?: string;           // es. "it-IT"
  timezone?: string;              // es. "Europe/Rome"
  location?: { city?: string; province?: string };
  room_aware?: boolean;
};

export type Privacy = {
  wifi?: { mask_password?: boolean };
  contacts?: { show_in_emergency?: boolean };
};

export type Content = {
  wifi?: {
    ssid?: string;
    password?: string;
    note?: Partial<Record<Locale, string>>;
    help?: Partial<Record<Locale, string>>;
  };
  checkout?: {
    time?: string;
    drop_keys?: Partial<Record<Locale, string>>;
    late_option?: {
      policy?: Partial<Record<Locale, string>>;
      request_channel?: Partial<Record<Locale, string>>;
    };
  };
  rules?: {
    quiet_hours?: string;
    smoking?: boolean;
    pets?: boolean;
    extra?: Partial<Record<Locale, string>>;
  };
  emergency?: {
    police?: string;
    medical?: string;
    fire?: string;
    note?: Partial<Record<Locale, string>>;
  };
  contacts?: {
    host?: { phone?: string; whatsapp?: string; email?: string };
  };
  // permette estensioni future senza rompere i tipi
  [k: string]: unknown;
};

export type Button = { label: string; action: string };

export type Responses = {
  [intent: string]: {
    short?: Partial<Record<Locale, string>>;
    long?: Partial<Record<Locale, string>>;
    troubleshooting?: Partial<Record<Locale, string[]>>;
    buttons?: Partial<Record<Locale, Button[]>>;
    fallback?: Partial<Record<Locale, string>>;
    /** opzionale: prompt di chiarimento diretto nella struttura */
    followup?: Partial<Record<Locale, string>>;
  };
};

export type StructureYaml = {
  version?: string;  // es. "1.1.0"
  meta?: Meta;
  privacy?: Privacy;
  content?: Content;
  responses?: Responses;
};



export type Structure = StructureYaml;

/** Alias per compatibilità con import legacy */
export type StructureConfig = StructureYaml;

export function isStructureYaml(v: any): v is StructureYaml {
  return v && typeof v === "object" && ("content" in v || "responses" in v || "meta" in v);
}

export const __structure_schema_version = "1.1.0";

