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

export function cacheGet(key: string): { hit: boolean; value?: string } {
  const e = cache.get(key);
  if (!e) return { hit: false };
  if (Date.now() > e.expiresAt) { cache.delete(key); return { hit: false }; }
  return { hit: true, value: e.value };
}

export function cacheSet(key: string, value: string, ttlSec = ENV.CACHE_TTL_S) {
  cache.set(key, { value, expiresAt: Date.now() + ttlSec * 1000 });
}

export function canCallLlm(): { ok: boolean; reason?: string } {
  runtimeResetIfNewDay();
  if (!ENV.USE_LLM) return { ok: false, reason: 'USE_LLM=false' };
  if (consecutiveLlmFailures >= ENV.CB_FAILURE_THRESHOLD) return { ok: false, reason: 'circuit_open' };
  if (spentTodayEur >= ENV.LLM_DAILY_BUDGET_EUR) return { ok: false, reason: 'budget_reached' };
  return { ok: true };
}

export function registerLlmSuccess(costEur: number) {
  consecutiveLlmFailures = 0;
  spentTodayEur += Math.max(0, costEur || 0);
}

export function registerLlmFailure() {
  consecutiveLlmFailures++;
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
