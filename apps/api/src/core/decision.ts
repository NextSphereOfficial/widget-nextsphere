// Decisione su quale sorgente usare
export type Source = 'yaml' | 'yaml_followup' | 'llm' | 'none';

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
  isSingleWord?: boolean;
}

/**
 * Regole (demo-safe e conversazionali):
 * - intent sensibili/forti (wifi, emergency): YAML sempre se match
 * - YAML conf >= 0.75  → yaml
 * - YAML conf in [0.45, 0.75) o single-word → yaml_followup
 * - YAML conf < 0.45 o nessun match → llm
 */
export function decideResponse(yaml: YamlMatch): Decision {
  const c = yaml.confidence ?? 0;
  const intent = yaml.intent;

  if (yaml.matched && (intent === 'wifi' || intent === 'emergency')) {
    return { source: 'yaml', reason: 'Strong intent override', confidence: Math.max(c, 0.9), intent };
  }

  if (yaml.matched && c >= 0.75) {
    return { source: 'yaml', reason: 'High YAML confidence', confidence: c, intent };
  }

  if (yaml.matched && (yaml.isSingleWord || (c >= 0.45 && c < 0.75))) {
    return { source: 'yaml_followup', reason: 'YAML needs clarification', confidence: c || 0.55, intent };
  }

  return { source: 'llm', reason: yaml.matched ? 'Low YAML confidence' : 'No YAML match', confidence: yaml.matched ? c : 0.2, intent };
}

