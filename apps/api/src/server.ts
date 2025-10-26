import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import * as Sentry from '@sentry/node';

// Plugin/route locali
import { chatRoutes } from './routes/chat.js';
import systemPlugin from './plugins/system.js';

// -------------------- App --------------------
const app = Fastify({ logger: true });
const log = app.log as any;

// -------------------- Sentry --------------------
Sentry.init({
  dsn: process.env.SENTRY_DSN || "https://80884f7caf09e54b1f67953d37457791@o4510256421863424.ingest.de.sentry.io/4510256449454160",
  tracesSampleRate: Number(process.env.SENTRY_TRACES_SAMPLE_RATE ?? 0) || 0,
  environment: process.env.NODE_ENV || 'production',
  release: process.env.COMMIT_SHA || process.env.VERCEL_GIT_COMMIT_SHA || undefined,
});

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
    contentSecurityPolicy: false,       // la CSP la gestiamo noi in report-only
    crossOriginEmbedderPolicy: false,   // compatibilità ampia (widget, ecc.)
    // Opzionali (puoi scommentare se desideri forzarli):
    // referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
    // hidePoweredBy: true,
    // xFrameOptions: 'SAMEORIGIN',
  } as any);
}

// -------------------- Plugin/Routes --------------------
await app.register(systemPlugin);
await app.register(chatRoutes);

// Health & Version (se non già presenti in systemPlugin)
app.get('/health', async () => ({ status: 'ok' }));
app.get('/version', async () => ({
  version: process.env.COMMIT_SHA || process.env.VERCEL_GIT_COMMIT_SHA || 'dev',
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


