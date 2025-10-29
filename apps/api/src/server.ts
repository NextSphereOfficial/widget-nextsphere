// apps/api/src/server.ts

import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import * as Sentry from '@sentry/node';

// Plugin/route locali
import { chatRoutes } from './routes/chat.js';
import systemPlugin from './plugins/system.js';

// -------------------- Costanti runtime --------------------
const APP_NAME = 'NextSphere API';
const ENV = process.env.NODE_ENV || 'development';
const COMMIT_SHA = process.env.COMMIT_SHA || 'unknown';
const BOOT_TIME_ISO = new Date().toISOString();

// -------------------- App --------------------
const app = Fastify({
  logger: true, // usa pino integrato
});

// alias comodo
const log = app.log;

// -------------------- Sentry (se DSN presente) --------------------
if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: ENV,
    release: COMMIT_SHA,
    tracesSampleRate: 0.0, // niente tracing per ora
  });

  app.addHook('onError', async (req, reply, err) => {
    try {
      Sentry.withScope((scope) => {
        scope.setTag('route', req.routerPath || req.raw.url || 'unknown');
        scope.setTag('method', req.method);
        scope.setTag('env', ENV);
        scope.setExtra('requestId', (req as any).id);
        Sentry.captureException(err);
      });
    } catch (e) {
      log.warn({ err: e }, 'sentry-capture-failed');
    }
  });
}

// -------------------- Sicurezza --------------------
await app.register(cors, {
  origin: (origin, cb) => {
    // Allowlist di esempio minimale; adatta se hai già la tua
    const allow = [
      'https://widget.svapartments.it',
      'https://svapartments.it',
      'http://localhost:5173',
    ];
    if (!origin || allow.includes(origin)) return cb(null, true);
    return cb(new Error('CORS not allowed'), false);
  },
  credentials: true,
});

await app.register(helmet, {
  // HSTS 1 anno
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  },
  // CSP in report-only se vuoi, qui lasciamo minimale
  contentSecurityPolicy: false,
});

// -------------------- Metriche semplici in-memory --------------------
const metrics = {
  startTimeIso: BOOT_TIME_ISO,
  reqTotal: 0,
  reqByRoute: {} as Record<string, number>,
  fiveXxCount: 0,
  rateLimitWarns: 0,
};

// Conta richieste + warning vicino al rate limit (se header presenti)
app.addHook('onResponse', async (req, reply) => {
  try {
    metrics.reqTotal += 1;
    const route = (req.routeOptions && (req.routeOptions.url as string)) || req.raw.url || 'unknown';
    metrics.reqByRoute[route] = (metrics.reqByRoute[route] || 0) + 1;

    const status = reply.statusCode || 0;
    if (status >= 500) metrics.fiveXxCount += 1;

    const remaining = reply.getHeader('x-ratelimit-remaining');
    if (typeof remaining === 'string' || typeof remaining === 'number') {
      const num = Number(remaining);
      if (!Number.isNaN(num) && num <= 1) {
        metrics.rateLimitWarns += 1;
        log.warn(
          {
            msg: 'Near rate limit',
            route,
            requestId: (req as any).id,
            remaining: num,
            ip: (req as any).ip,
          },
          'rate-limit-warning',
        );
      }
    }
  } catch (err) {
    log.error({ err }, 'metrics-hook-error');
  }
});

// -------------------- Error handler compatto --------------------
app.setErrorHandler((err, req, reply) => {
  log.error({ err, requestId: (req as any).id }, 'unhandled-error');
  reply.status(err.statusCode || 500).send({ ok: false, errorId: (req as any).id });
});

// -------------------- Plugin/Routes locali --------------------
await app.register(systemPlugin); // ATTENZIONE: potrebbe già registrare /version e /health
await app.register(chatRoutes, { prefix: '/chat' });

// -------------------- /version (prova a registrare, altrimenti warn) --------------------
try {
  app.get('/version', async (req, reply) => {
    const uptimeSec = Math.floor(process.uptime());
    return reply.send({
      ok: true,
      name: APP_NAME,
      env: ENV,
      commit: COMMIT_SHA,
      buildTime: BOOT_TIME_ISO,
      uptimeSec,
    });
  });
} catch (err: any) {
  // Se la route esiste già (esposta da systemPlugin), non fermare il boot
  if (err && err.code === 'FST_ERR_DUPLICATED_ROUTE') {
    log.warn('Route /version già registrata da un altro plugin. Uso quella esistente.');
  } else {
    throw err;
  }
}

// -------------------- /metrics (nuova) --------------------
try {
  app.get('/metrics', async (req, reply) => {
    return reply.send({
      ok: true,
      startTimeIso: metrics.startTimeIso,
      uptimeSec: Math.floor(process.uptime()),
      reqTotal: metrics.reqTotal,
      fiveXxCount: metrics.fiveXxCount,
      rateLimitWarns: metrics.rateLimitWarns,
      reqByRoute: metrics.reqByRoute,
    });
  });
} catch (err: any) {
  if (err && err.code === 'FST_ERR_DUPLICATED_ROUTE') {
    log.warn('Route /metrics già registrata. Uso quella esistente.');
  } else {
    throw err;
  }
}

// -------------------- Root informativa (se non già definita altrove) --------------------
try {
  app.get('/', async () => {
    return {
      ok: true,
      name: APP_NAME,
      description: 'Backend for NextSphere Concierge AI',
      endpoints: { health: '/health', version: '/version', chat: '/chat' },
    };
  });
} catch (err: any) {
  if (err && err.code === 'FST_ERR_DUPLICATED_ROUTE') {
    // ignoriamo se già definita
  } else {
    throw err;
  }
}

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



