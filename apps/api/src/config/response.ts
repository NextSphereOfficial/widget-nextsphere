import type { EngineConfig } from '../engine/types.js';

export const RESPONSE_CONFIG: EngineConfig = {
  threshold: 0.65,
  weights: { exact: 1.0, keyword: 0.8, regex: 0.7, fuzzy: 0.6 },
  fuzzyMaxDistance: 2,
  suggestTopN: 2,
  featureToggle: { USE_NEW_ENGINE: true }
};
