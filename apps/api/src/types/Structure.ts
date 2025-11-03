export type FAQ = { q: string; a: string };

export type Defaults = {
  wifi?: { ssid: string; password?: string };
  checkin?: { from?: string; method?: string; instructions?: string };
  checkout?: { until?: string; instructions?: string };
  rules?: string[];
  emergencies?: { number?: string; instructions?: string };
  faqs?: FAQ[];
  [k: string]: unknown;
};

export type Room = {
  id: string;
  name: string;
  overrides?: {
    wifi?: Defaults["wifi"];
    checkin?: Defaults["checkin"];
    checkout?: Defaults["checkout"];
    rules?: Defaults["rules"];
    emergencies?: Defaults["emergencies"];
    faqs?: Defaults["faqs"];
    assets?: { photos?: string[]; documents?: string[] };
  };
};

export type StructureMeta = {
  id: string;
  name: string;
  locale: string;
  timezone: string;
};

export type StructureConfig = {
  version: string;
  structure: StructureMeta;
  defaults: Defaults;
  rooms: Room[];
  translations?: Record<string, Record<string, string>>;
};
