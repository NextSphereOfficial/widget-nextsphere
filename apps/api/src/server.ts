import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import * as Sentry from '@sentry/node';

// Plugin/route locali
import { chatRoutes } from './routes/chat.js';
import systemPlugin from './plugins/system.js';

// -------------------- App --------------------
const app = Fastify({
  logger: true,
  trustProxy: true,
  bodyLimit: 1 * 1024 * 1024, // 1MB: blocca payload eccessivi
  ajv: {
    customOptions: {
      coerceTypes: true,          // coerce numeri/stringhe quando sensato
      removeAdditional: 'all',    // rimuove campi extra non previsti dallo schema
      useDefaults: true,          // applica default dai tuoi schema
      allErrors: false,           // fail-fast
      allowUnionTypes: true
    }
  }
});
const log = app.log as any;

// -------------------- Sentry --------------------
Sentry.init({
  dsn: process.env.SENTRY_DSN || "https://80884f7caf09e54b1f67953d37457791@o4510256421863424.ingest.de.sentry.io/4510256449454160",
  tracesSampleRate: Number(process.env.SENTRY_TRACES_SAMPLE_RATE ?? 0) || 0,
  environment: process.env.NODE_ENV || 'production',
  release: process.env.COMMIT_SHA || process.env.VERCEL_GIT_COMMIT_SHA || undefined,
});

app.setErrorHandler((err, req, reply) => {
  // Errori di validazione Fastify/AJV
  if ((err as any).validation || (err.code === 'FST_ERR_VALIDATION')) {
    const issues = (err as any).validation || [];
    const details = issues.slice(0, 3).map((v: any) => ({
      field: v.instancePath || v.dataPath || v.params?.missingProperty || 'unknown',
      message: v.message || 'invalid'
    }));
    return reply.code(400).send({
      statusCode: 400,
      error: 'Bad Request',
      message: 'Invalid request payload',
      details
    });
  }

  // default: lascia 500 ma senza leak
  req.log.error({ err }, 'Unhandled error');
  return reply.code(err.statusCode || 500).send({
    statusCode: err.statusCode || 500,
    error: 'Internal Server Error',
    message: 'Unexpected error'
  });
});

// --- Canonical host redirect ---
const ENABLE_CANONICAL_REDIRECT = (process.env.ENABLE_CANONICAL_REDIRECT ?? 'true') === 'true';
const CANONICAL_HOST = process.env.CANONICAL_HOST || 'api.svapartments.it';

if (ENABLE_CANONICAL_REDIRECT) {
  app.addHook('onRequest', (req, reply, done) => {
    // ✅ NON toccare i preflight: i browser non seguono redirect su OPTIONS
    if (req.method === 'OPTIONS') return done();

    const host = req.headers.host || '';
    if (host && host !== CANONICAL_HOST) {
      reply.redirect(308, `https://${CANONICAL_HOST}${req.url}`);
      return;
    }
    done();
  });
}


// Cattura tutti gli errori runtime
app.addHook('onError', (req, reply, err, done) => {
  Sentry.captureException(err, { extra: { url: req.url, method: req.method, requestId: (req as any).id } });
  done();
});

// -------------------- CORS (allowlist + echo) --------------------
const ALLOWED_ORIGINS = (process.env.CORS_ALLOWED_ORIGINS ?? '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

const PREVIEW_REGEX = process.env.CORS_PREVIEW_REGEX
  ? new RegExp(process.env.CORS_PREVIEW_REGEX)
  : null;

const ORIGIN_SET = new Set(ALLOWED_ORIGINS);

await app.register(cors, {
  origin: (origin, cb) => {
    if (!origin) return cb(null, true); // server-to-server
    const allowed = ORIGIN_SET.has(origin) || (PREVIEW_REGEX ? PREVIEW_REGEX.test(origin) : false);
    if (allowed) return cb(null, origin); // echo esplicito (necessario con credentials:true)
    return cb(null, false);
  },
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: [
    'Authorization',
    'Content-Type',
    'X-Requested-With',
    // Sentry browser tracing headers
    'sentry-trace',
    'baggage',
  ],
  credentials: true,
  maxAge: 600,
});

// -------------------- Helmet (senza CSP) --------------------
const ENABLE_SECURITY_HEADERS = (process.env.ENABLE_SECURITY_HEADERS ?? 'true') === 'true';
if (ENABLE_SECURITY_HEADERS) {
  await app.register(helmet, {
  contentSecurityPolicy: false,      // CSP la gestiamo noi in report-only
  crossOriginEmbedderPolicy: false,  // compatibilità
  hsts: {
    maxAge: 31536000,                // 🔒 12 mesi
    includeSubDomains: true,
    preload: true,                   // opzionale ma consigliato
  },
} as any);

}

import rateLimit, { RateLimitOptions } from '@fastify/rate-limit';


const REQUIRE_JSON = (process.env.REQUIRE_JSON ?? 'true') === 'true';
if (REQUIRE_JSON) {
  app.addHook('onRequest', (req, reply, done) => {
    // Applica solo alle POST/PUT/PATCH
    const m = req.method;
    if (m === 'POST' || m === 'PUT' || m === 'PATCH') {
      const ct = (req.headers['content-type'] || '').toLowerCase();
      if (!ct.includes('application/json')) {
        reply.code(415).send({
          statusCode: 415,
          error: 'Unsupported Media Type',
          message: 'Use application/json'
        });
        return;
      }
    }
    done();
  });
}



// -------------------- Plugin/Routes --------------------
await app.register(systemPlugin);
await app.register(chatRoutes);
// ✅ Rate limit (Fastify v4 + @fastify/rate-limit v7)
await app.register(import('@fastify/rate-limit'), {
  global: true,            // applica a tutte le route nello scope
  max: 60,                 // 60 richieste
  timeWindow: 60_000,      // 60s (in ms) — puoi usare anche '1 minute'
  ban: 0,                  // niente ban, solo 429
  skipOnError: true,       // se il limiter ha problemi, non bloccare l'API
  nameSpace: 'global',
  keyGenerator: (req) =>
    (req.headers['cf-connecting-ip'] as string) || req.ip || 'anonymous',
  // ❗usa allowList per ESCLUDERE health/version/csp-report e i preflight
  allowList: (req /*, key */) => {
    if (req.method === 'OPTIONS') return true; // preflight
    const p = req.url;
    return p === '/health' || p === '/version' || p === '/csp-report';
  },
});

// --- Friendly root route ---
app.get('/', async () => ({
  ok: true,
  name: 'NextSphere API',
  description: 'Backend for NextSphere Concierge AI',
  endpoints: {
    health: '/health',
    version: '/version',
    chat: '/chat'
  }
}));


// Endpoint per i report CSP
app.post('/csp-report', {
  schema: { body: { type: 'object', additionalProperties: true } }
}, async (req, reply) => {
  try {
    const report = req.body;
    req.log.warn({ cspReport: report }, 'CSP report-only violation');
  } catch (e) {
    req.log.error({ err: e }, 'Error processing CSP report');
  }
  return reply.code(204).send();
});

// -------------------- CSP (report-only) hard-override --------------------
const ENABLE_CSP_REPORT_ONLY = (process.env.ENABLE_CSP_REPORT_ONLY ?? 'true') === 'true';
const API_CSP_REPORT_ONLY = [
  "default-src 'none'",
  "base-uri 'none'",
  "form-action 'none'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "img-src 'none'",
  "script-src 'none'",
  "style-src 'none'",
  "connect-src 'self'",
  "report-uri /csp-report",
].join('; ');

// Registriamo l’hook DOPO plugin/route per vincere su qualsiasi set precedente
await app.after();
if (ENABLE_CSP_REPORT_ONLY) {
  app.addHook('onSend', (req, reply, payload, done) => {
    reply.removeHeader('Content-Security-Policy');
    reply.removeHeader('Content-Security-Policy-Report-Only');
    reply.header('Content-Security-Policy-Report-Only', API_CSP_REPORT_ONLY);
    done();
  });
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


