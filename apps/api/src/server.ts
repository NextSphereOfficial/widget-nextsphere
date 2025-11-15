// apps/api/src/server.ts
import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import * as Sentry from '@sentry/node';

import { ENV as LLM } from './core/env.js';
import systemPlugin from './plugins/system.js';
import chatRoutes from './routes/chat.js';

// -------------------- Costanti di base --------------------

const APP_NAME = 'NextSphere API';
const APP_ENV = process.env.NODE_ENV || 'development';
const COMMIT_SHA =
  process.env.COMMIT_SHA ||
  process.env.APP_COMMIT ||
  'unknown';
const BOOT_TIME_ISO = new Date().toISOString();

// -------------------- Fastify + Logger --------------------

const app = Fastify({
  trustProxy: true,
  logger: {
    level: process.env.LOG_LEVEL || 'info',
    transport:
      APP_ENV === 'development'
        ? {
            target: 'pino-pretty',
            options: { singleLine: true, colorize: true },
          }
        : undefined,
  },
});

const log = app.log;

// -------------------- Error handler globale --------------------

app.setErrorHandler((err, req, reply) => {
  log.error({ err }, 'unhandled_error');

  const status =
    err.statusCode && err.statusCode >= 400 ? err.statusCode : 500;

  reply.status(status).send({
    error: status === 500 ? 'Internal Server Error' : err.name || 'Error',
    message: status === 500 ? 'Something went wrong' : err.message,
    statusCode: status,
  });
});

// -------------------- Sentry (opzionale) --------------------

if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 0.1,
    environment: APP_ENV,
  });

  app.addHook('onError', async (request, reply, error) => {
    Sentry.captureException(error, {
      tags: {
        route: (request.routeConfig as any)?.url || request.url,
      },
      extra: {
        method: request.method,
        requestId: request.id,
      },
    });
  });
}

// -------------------- Helmet --------------------

await app.register(helmet, {
  global: true,
  hsts: {
    maxAge: 60 * 60 * 24 * 365,
    includeSubDomains: true,
    preload: true,
  },
  // Usiamo CSP custom altrove se necessario
  contentSecurityPolicy: false,
});

// -------------------- CORS --------------------

// Origin di default (widget svapartments)
// + eventuali origin extra da env: CORS_ORIGINS="https://foo.com,https://bar.com"
const defaultOrigins = ['https://widget.svapartments.it'];
const extraOrigins =
  (process.env.CORS_ORIGINS || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean) || [];

const allowlist = new Set<string>([...defaultOrigins, ...extraOrigins]);

await app.register(cors, {
  origin: (origin, cb) => {
    if (!origin) return cb(null, true); // richieste server-to-server

    try {
      const u = new URL(origin);
      const normalized = `${u.protocol}//${u.hostname}${
        u.port ? `:${u.port}` : ''
      }`;

      if (allowlist.has(normalized)) {
        return cb(null, true);
      }
    } catch {
      // origin malformata → neghiamo
    }

    cb(new Error('Origin not allowed'), false);
  },
  credentials: true,
});

// -------------------- Plugin di sistema --------------------

await app.register(systemPlugin);

// -------------------- Route chat --------------------

await app.register(chatRoutes);

// -------------------- Root info --------------------

app.get('/', async () => ({
  ok: true,
  name: APP_NAME,
  env: APP_ENV,
  commit: COMMIT_SHA,
  boot: BOOT_TIME_ISO,
  endpoints: {
    health: '/health',
    version: '/version',
    chat: '/chat',
    structures: '/structures',
  },
}));

// -------------------- Listen --------------------

const port = Number(
  process.env.PORT ?? process.env.API_PORT ?? 8081,
);
const host = process.env.API_HOST || '0.0.0.0';

async function start() {
  try {
    // Snapshot sintetico delle ENV LLM al boot
    log.info(
      {
        use_llm: LLM.USE_LLM,
        llm_provider: LLM.LLM_PROVIDER,
        model: LLM.LLM_MODEL,
        timeout_ms: LLM.LLM_TIMEOUT_MS,
        daily_budget_eur: LLM.LLM_DAILY_BUDGET_EUR,
      },
      'llm_env_loaded',
    );

    await app.ready();
    log.info('\n' + app.printRoutes());

    await app.listen({ port, host });
    log.info({ host, port }, 'api_listening');
  } catch (err) {
    log.error({ err }, 'server_start_failed');
    process.exit(1);
  }
}

start();

export default app;
