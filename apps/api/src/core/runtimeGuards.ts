import { ENV } from './env.js';

type CacheEntry = { value: string; expiresAt: number };
const cache = new Map<string, CacheEntry>();

let consecutiveLlmFailures = 0;
let spentTodayEur = 0;
let lastResetMs = Date.now();

export function runtimeResetIfNewDay() {
  const now = Date.now();
  if (now - lastResetMs > 24 * 60 * 60 * 1000) {
    lastResetMs = now;
    spentTodayEur = 0;
    consecutiveLlmFailures = 0;
  }
}

export function cacheGet(key: string): string | null {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    cache.delete(key);
    return null;
  }
  return entry.value;
}

export function cacheSet(key: string, value: string, ttlMs = 5 * 60 * 1000) {
  cache.set(key, {
    value,
    expiresAt: Date.now() + ttlMs,
  });
}

export function canCallLlm() {
  runtimeResetIfNewDay();

  if (!ENV.USE_LLM) {
    return { ok: false as const, reason: 'disabled' as const };
  }

  if (spentTodayEur >= ENV.LLM_DAILY_BUDGET_EUR) {
    return { ok: false as const, reason: 'budget' as const };
  }

  if (consecutiveLlmFailures >= ENV.CB_FAILURE_THRESHOLD) {
    return { ok: false as const, reason: 'circuit-breaker' as const };
  }

  return { ok: true as const };
}

/**
 * Registra un successo della chiamata LLM.
 * costEur è opzionale: se non lo passi, non incrementa il budget.
 */
export function registerLlmSuccess(costEur?: number) {
  consecutiveLlmFailures = 0;
  if (typeof costEur === 'number' && isFinite(costEur) && costEur > 0) {
    spentTodayEur += costEur;
  }
}

/**
 * Registra un fallimento della chiamata LLM.
 * costEur è opzionale: se non lo passi, non incrementa il budget.
 */
export function registerLlmFailure(costEur?: number) {
  consecutiveLlmFailures++;
  if (typeof costEur === 'number' && isFinite(costEur) && costEur > 0) {
    spentTodayEur += costEur;
  }
}

export function getRuntimeSnapshot() {
  return {
    use_llm: ENV.USE_LLM,
    cb_threshold: ENV.CB_FAILURE_THRESHOLD,
    failures: consecutiveLlmFailures,
    spent_today_eur: Number(spentTodayEur.toFixed(4)),
    budget_eur: ENV.LLM_DAILY_BUDGET_EUR,
    cache_size: cache.size,
  };
}
