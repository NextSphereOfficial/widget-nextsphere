// apps/api/src/server.ts
import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import * as Sentry from '@sentry/node';

// Plugin/route locali
import { chatRoutes } from './routes/chat.js';   // deve esportare una route POST '/chat'
import systemPlugin from './plugins/system.js';  // health/version/root info

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

// Shortcut per logger
const log = app.log;

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
      scope.setTag('route', req.routerPath ?? req.url);
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
  // HSTS 1 anno + preload
  hsts: {
    maxAge: 60 * 60 * 24 * 365,
    includeSubDomains: true,
    preload: true
  },
  contentSecurityPolicy: false // CSP gestita separatamente se/quando serve
});

// CORS allowlist: widget prod + preview Vercel (+ curl/robots senza origin)
const allowlist = new Set<string>([
  'https://widget.svapartments.it'
]);

await app.register(cors, {
  origin: (origin, cb) => {
    // Nessun origin (curl, healthcheck) → consenti
    if (!origin) return cb(null, true);
    try {
      const u = new URL(origin);
      const host = `${u.protocol}//${u.hostname}`;

      // Produzione
      if (allowlist.has(host)) return cb(null, true);

      // Preview Vercel (sottodomini *.vercel.app)
      if (/\.vercel\.app$/i.test(u.hostname)) return cb(null, true);
    } catch {
      // origin malformato → nega
    }
    cb(new Error('CORS not allowed'), false);
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false
});

// -------------------- Body/JSON limits (hardening) --------------------
app.addHook('onRoute', (routeOpts) => {
  routeOpts.bodyLimit ??= 1_000_000; // 1MB default
});
app.addHook('onRequest', async (req, reply) => {
  if (req.method !== 'GET' && !req.headers['content-type']?.includes('application/json')) {
    reply.code(415).send({ error: 'Unsupported Media Type', message: 'JSON only', statusCode: 415 });
  }
});

// -------------------- Root Info --------------------
app.get('/', async () => {
  return {
    ok: true,
    name: APP_NAME,
    description: 'Backend for NextSphere Concierge AI',
    env: ENV,
    commit: COMMIT_SHA,
    boot: BOOT_TIME_ISO,
    endpoints: { health: '/health', version: '/version', chat: '/chat' }
  };
});

// -------------------- Plugin di sistema (health/version) --------------------
await app.register(systemPlugin);

// -------------------- Chat routes --------------------
// ⚠️ Nessun prefix: la route deve essere esattamente POST /chat
await app.register(chatRoutes);

// -------------------- Error handler "pulito" --------------------
app.setErrorHandler((err, req, reply) => {
  log.error({ err }, 'Unhandled error');
  const status = (err.statusCode && err.statusCode >= 400) ? err.statusCode : 500;
  reply.code(status).send({
    error: status === 500 ? 'Internal Server Error' : err.name || 'Error',
    message: status === 500 ? 'Something went wrong' : err.message,
    statusCode: status
  });
});

// -------------------- Listen --------------------
const port = Number(process.env.PORT ?? process.env.API_PORT ?? 8081);
const host = process.env.API_HOST || '0.0.0.0';

try {
  await app.listen({ port, host });
  log.info(`✅ API listening on http://${host}:${port}`);
} catch (err) {
  log.error(err);
  process.exit(1);
}
