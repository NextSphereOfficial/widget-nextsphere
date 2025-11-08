// apps/api/src/server.ts
import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import * as Sentry from '@sentry/node';
import { ENV as LLM } from './core/env.js'; // alias per le ENV LLM
import { buildContext } from './core/buildContext.js'; // in cima al file, con gli altri import
import { decideResponse } from './core/decision.js';
import { cacheGet, cacheSet, canCallLlm, registerLlmFailure, registerLlmSuccess, getRuntimeSnapshot } from './core/runtimeGuards.js';
import { orchestrateChat } from './core/orchestrator.js';



// Plugin/route locali
import systemPlugin from './plugins/system.js';               // health/version/root info
import  chatRoutes  from './routes/chat.js';

// -------------------- Costanti --------------------
const APP_NAME = 'NextSphere API';
const ENV = process.env.NODE_ENV || 'development';
const COMMIT_SHA = process.env.COMMIT_SHA || 'unknown';
const BOOT_TIME_ISO = new Date().toISOString();

// -------------------- Logger --------------------
const app = Fastify({
  trustProxy: true,
  logger: {
    level: process.env.LOG_LEVEL || 'info',
    transport: ENV === 'development'
      ? { target: 'pino-pretty', options: { singleLine: true, colorize: true } }
      : undefined
  }
});
const log = app.log;
// TEMP: snapshot ENV LLM al boot
log.info({
  use_llm: LLM.USE_LLM,
  llm_provider: LLM.LLM_PROVIDER,
  model: LLM.LLM_MODEL,
  timeout_ms: LLM.LLM_TIMEOUT_MS,
  daily_budget_eur: LLM.LLM_DAILY_BUDGET_EUR,
}, 'llm_env_loaded_boot');


// -------------------- Error handler (PRIMA di tutto) --------------------
app.setErrorHandler((err, req, reply) => {
  log.error({ err }, 'Unhandled error');
  const status = (err.statusCode && err.statusCode >= 400) ? err.statusCode : 500;
  reply.code(status).send({
    error: status === 500 ? 'Internal Server Error' : err.name || 'Error',
    message: status === 500 ? 'Something went wrong' : err.message,
    statusCode: status
  });
});

// -------------------- Sentry --------------------
if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 0.1,
    environment: ENV,
    release: COMMIT_SHA
  });

  app.addHook('onError', async (req, reply, err) => {
    Sentry.withScope((scope) => {
      scope.setTag('route', (req as any).routerPath ?? req.url);
      scope.setExtra('method', req.method);
      scope.setExtra('query', req.query);
      scope.setExtra('params', req.params);
      scope.setExtra('body', req.body);
      Sentry.captureException(err);
    });
  });
}

// -------------------- Security --------------------
await app.register(helmet, {
  global: true,
  hsts: { maxAge: 60 * 60 * 24 * 365, includeSubDomains: true, preload: true },
  contentSecurityPolicy: false
});

// -------------------- CORS --------------------
const allowlist = new Set<string>(['https://widget.svapartments.it']);
await app.register(cors, {
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);
    try {
      const u = new URL(origin);
      const host = `${u.protocol}//${u.hostname}`;
      if (allowlist.has(host)) return cb(null, true);
      if (/\.vercel\.app$/i.test(u.hostname)) return cb(null, true);
    } catch {}
    cb(new Error('CORS not allowed'), false);
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false
});

// -------------------- Body/JSON limits --------------------
app.addHook('onRoute', (routeOpts) => {
  routeOpts.bodyLimit ??= 1_000_000;
});
app.addHook('onRequest', async (req, reply) => {
  const m = req.method;
  if (m !== 'GET' && m !== 'HEAD' && m !== 'OPTIONS') {
    const ct = req.headers['content-type'] || '';
    if (!ct.includes('application/json')) {
      reply.code(415).send({ error: 'Unsupported Media Type', message: 'JSON only', statusCode: 415 });
      return;
    }
  }
});

// -------------------- Root Info --------------------
app.get('/', async () => ({
  ok: true,
  name: APP_NAME,
  description: 'Backend for NextSphere Concierge AI',
  env: ENV,
  commit: COMMIT_SHA,
  boot: BOOT_TIME_ISO,
  endpoints: { health: '/health', version: '/version', chat: '/chat', structures: '/structures' }
}));

// -------------------- Plugin di sistema --------------------
await app.register(systemPlugin);

// -------------------- Route multi-struttura (chat + retrocompat) --------------------
await app.register(chatRoutes);

// -------------------- Listen --------------------
const port = Number(process.env.PORT ?? process.env.API_PORT ?? 8081);
const host = process.env.API_HOST || '0.0.0.0';

try {
  await app.ready();
  log.info('\n' + app.printRoutes()); // debug routes (rimuovilo quando vuoi)
  await app.listen({ port, host });
  log.info(`✅ API listening on http://${host}:${port}`);
} catch (err) {
  log.error(err);
  process.exit(1);
}

// NEW: log sintetico delle ENV LLM caricate
// Evita doppio listen in modalità watch
if (!app.listen) {
  try {
    await app.ready();
    app.log.info({
      use_llm: LLM.USE_LLM,
      llm_provider: LLM.LLM_PROVIDER,
      model: LLM.LLM_MODEL,
      timeout_ms: LLM.LLM_TIMEOUT_MS,
      daily_budget_eur: LLM.LLM_DAILY_BUDGET_EUR,
    }, 'llm_env_loaded');

    app.log.info('\n' + app.printRoutes());
    await app.listen({ port, host });
    log.info(`✅ API listening on http://${host}:${port}`);
  } catch (err) {
    log.error(err);
    process.exit(1);
  }
}

// … dopo await app.ready():
try {
  const ctx = await buildContext('svapartments'); // id reale della tua struttura
  log.info({ ctxVer: ctx.contextVersion, locale: ctx.locale }, 'buildContext_ok');
} catch (e) {
  log.error(e, 'buildContext_fail');
}
// --- decision stub self-test (TEMP) ---
const d1 = decideResponse({ matched: true, intent: 'wifi', confidence: 0.85 });
log.info(d1, 'decision_test_high_yaml');

const d2 = decideResponse({ matched: true, intent: 'wifi', confidence: 0.45 });
log.info(d2, 'decision_test_borderline');

const d3 = decideResponse({ matched: false });
log.info(d3, 'decision_test_no_match');
// --- fine self-test ---

// --- runtime guards & cache self-test (TEMP) ---
cacheSet('demo', 'hello', 2); // TTL 2s
const c1 = cacheGet('demo');
log.info({ c1 }, 'cache_test_hit');

const perm1 = canCallLlm();
log.info({ perm1, snapshot: getRuntimeSnapshot() }, 'llm_perm_before');

registerLlmFailure();
registerLlmFailure();
const perm2 = canCallLlm();
log.info({ perm2, snapshot: getRuntimeSnapshot() }, 'llm_perm_after_failures');

registerLlmSuccess(0.0012); // 0.0012 €
const perm3 = canCallLlm();
log.info({ perm3, snapshot: getRuntimeSnapshot() }, 'llm_perm_after_success');
// --- fine self-test ---


// --- orchestrator self-test (TEMP) ---
const o1 = await orchestrateChat('svapartments', 'Ciao, qual è la password del Wi-Fi?');
log.info(o1, 'orchestrator_test');
