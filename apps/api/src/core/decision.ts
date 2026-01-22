export type Source = "yaml" | "llm";

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
 * Ultra-Prudente:
 * - Se YAML matcha → YAML
 * - Altrimenti → LLM
 */
export function decideResponse(yaml: YamlMatch): Decision {
  const c = yaml.confidence ?? 0;
  const intent = yaml.intent;

  if (yaml.matched) {
    const conf = c > 0 ? c : 0.7;
    return { source: "yaml", reason: "YAML match", confidence: conf, intent };
  }

  return { source: "llm", reason: "No YAML match", confidence: 0.2, intent };
}

