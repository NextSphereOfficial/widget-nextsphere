// apps/api/src/core/env.ts
import { config } from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// env.ts sta in: apps/api/src/core/env.ts
// il .env sta in: apps/api/.env  → sali di 2 livelli (src/core → .env)
const ENV_PATH = path.resolve(__dirname, '../../.env');

// Carica e sovrascrivi eventuali variabili già presenti
config({ path: ENV_PATH, override: true });

export const ENV = {
  USE_LLM: process.env.USE_LLM === 'true',
  LLM_PROVIDER: process.env.LLM_PROVIDER ?? 'openai',
  LLM_MODEL: process.env.LLM_MODEL ?? 'gpt-4o-mini',
  LLM_API_KEY: process.env.LLM_API_KEY ?? '',
  LLM_TIMEOUT_MS: Number(process.env.LLM_TIMEOUT_MS ?? 3500),
  LLM_DAILY_BUDGET_EUR: Number(process.env.LLM_DAILY_BUDGET_EUR ?? 10),
  CACHE_TTL_S: Number(process.env.CACHE_TTL_S ?? 43200),
  CB_FAILURE_THRESHOLD: Number(process.env.CB_FAILURE_THRESHOLD ?? 5),
  DEFAULT_LOCALE: process.env.DEFAULT_LOCALE ?? 'it',
} as const;
