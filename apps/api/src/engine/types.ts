export type Lang = 'it' | 'en';

export interface EngineConfig {
  threshold: number;
  weights: { exact: number; keyword: number; regex: number; fuzzy: number; };
  fuzzyMaxDistance: number;
  suggestTopN: number;
  featureToggle?: { USE_NEW_ENGINE?: boolean; };
}

export interface IntentDef {
  id: string;
  synonyms_it?: string[];
  synonyms_en?: string[];
  keywords_it?: string[];
  keywords_en?: string[];
  regex_it?: string[];
  regex_en?: string[];
  priority?: number;
  template_it?: string;
  template_en?: string;
}

export interface IntentsMap { [id: string]: IntentDef; }

export interface MatchResult {
  intentId: string;
  score: number;
  reason: 'exact' | 'keyword' | 'regex' | 'fuzzy' | 'none';
  priority: number;
}

export interface StructureYaml {
  meta?: { name?: string; defaultLang?: Lang; };
  wifi?: Record<string, any>;
  checkin?: Record<string, any>;
  rules?: { quiet_hours?: string; smoking?: boolean; pets?: boolean; [k: string]: any; };
  emergency?: Record<string, any>;
  contacts?: Record<string, any>;
  intents?: IntentsMap;
  [k: string]: any;
}

export interface EngineContext {
  message: string;
  structureId: string;
  room?: string | null;
  lang?: Lang | null;
  structureYaml: StructureYaml;
  intentsCore: IntentsMap;
  config: EngineConfig;
}

export interface EngineOutput {
  text: string;
  intent: string | null;
  confidence: number;
  lang: Lang;
  meta: {
    structureId: string;
    room?: string | null;
    source: string;
    reason?: string;
    candidates?: Array<{ intentId: string; score: number }>;
  };
}
