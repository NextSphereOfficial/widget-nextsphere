// Decisione minimale su quale sorgente usare
export type Source = 'yaml' | 'llm' | 'none';

export interface Decision {
  source: Source;
  reason: string;
  confidence: number; // 0..1
  intent?: string;
}

interface YamlMatch {
  matched: boolean;
  intent?: string;
  confidence?: number; // 0..1
}

/**
 * Regole semplici:
 * - YAML conf >= 0.70  → usa YAML
 * - YAML conf >= 0.40  → passa all'LLM (borderline)
 * - nessun match       → LLM
 */
export function decideResponse(yaml: YamlMatch): Decision {
  const c = yaml.confidence ?? 0;
  if (yaml.matched && c >= 0.70) {
    return { source: 'yaml', reason: 'High YAML confidence', confidence: c, intent: yaml.intent };
  }
  if (yaml.matched && c >= 0.40) {
    return { source: 'llm', reason: 'Borderline YAML, defer to LLM', confidence: c, intent: yaml.intent };
  }
  return { source: 'llm', reason: 'No YAML match', confidence: 0.20 };
}
