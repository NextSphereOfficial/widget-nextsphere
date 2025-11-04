import type { EngineConfig, IntentsMap, MatchResult, Lang } from './types.js';

function levenshtein(a: string, b: string): number {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i-1] === b[j-1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i-1][j] + 1, dp[i][j-1] + 1, dp[i-1][j-1] + cost);
    }
  }
  return dp[m][n];
}

export function matchIntent(text: string, lang: Lang, intents: IntentsMap, config: EngineConfig): MatchResult[] {
  const results: MatchResult[] = [];
  const tokens = text.split(' ').filter(Boolean);

  for (const [id, def] of Object.entries(intents)) {
    const priority = def.priority ?? 0;
    let score = 0;
    let reason: MatchResult['reason'] = 'none';

    const synonyms = (lang === 'it' ? def.synonyms_it : def.synonyms_en) ?? [];
    const keywords = (lang === 'it' ? def.keywords_it : def.keywords_en) ?? [];
    const regexes = (lang === 'it' ? def.regex_it : def.regex_en) ?? [];

    const exactHit = synonyms.find(s => s && text.includes(s.toLowerCase()));
    if (exactHit) { score = config.weights.exact; reason = 'exact'; }

    if (!score && keywords.length > 0) {
      const allPresent = keywords.every(k => text.includes(k.toLowerCase()));
      if (allPresent) { score = config.weights.keyword; reason = 'keyword'; }
    }

    if (!score && regexes.length > 0) {
      for (const pattern of regexes) {
        try {
          const re = new RegExp(pattern, 'i');
          if (re.test(text)) { score = config.weights.regex; reason = 'regex'; break; }
        } catch {}
      }
    }

    if (!score && synonyms.length > 0) {
      outer: for (const syn of synonyms) {
        const synTok = syn.toLowerCase().split(' ').filter(Boolean);
        if (synTok.length === 1) {
          for (const t of tokens) {
            // @ts-ignore - we know fuzzyMaxDistance exists
            if (levenshtein(t, synTok[0]) <= (config.fuzzyMaxDistance as number)) {
              score = config.weights.fuzzy; reason = 'fuzzy'; break outer;
            }
          }
        }
      }
    }

    if (score > 0) {
      const maxW = Math.max(...Object.values(config.weights));
      const normalized = score / maxW;
      results.push({ intentId: id, score: normalized + priority * 1e-6, reason, priority });
    }
  }

  results.sort((a, b) => b.score - a.score || (b.priority - a.priority));
  return results;
}
