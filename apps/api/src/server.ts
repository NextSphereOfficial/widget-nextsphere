import Fastify from 'fastify'
import cors from '@fastify/cors'
import rateLimit from '@fastify/rate-limit'
import helmet from '@fastify/helmet'
import * as Sentry from '@sentry/node'

import { chatRoutes } from './routes/chat.js'
import systemPlugin from './plugins/system.js'
const app = Fastify({ logger: true })
const log = app.log as any

Sentry.init({
  dsn: "https://80884f7caf09e54b1f67953d37457791@o4510256421863424.ingest.de.sentry.io/4510256449454160",
  environment: process.env.NODE_ENV ?? 'production',
  release: process.env.COMMIT_SHA ?? 'local',
  tracesSampleRate: 0.0,
  sendDefaultPii: true,
});
// subito dopo Sentry.init(...)
app.get('/sentry-sdk-test', async () => {
  Sentry.captureMessage('Sentry connectivity test');
  await Sentry.flush(2000); // aspetta fino a 2s l’invio
  return { sent: true };
});




// Cattura tutti gli errori runtime
app.addHook('onError', (req, reply, err, done) => {
  Sentry.captureException(err, {
    extra: { url: req.url, method: req.method, requestId: (req as any).id },
  });
  done();
});

// Route di test
app.get('/boom', () => {
  throw new Error('Sentry test: backend boom');
});
app.get('/sentry-test', async () => {
  Sentry.captureMessage('Sentry connectivity test');
  await Sentry.flush(2000); // aspetta fino a 2s l’invio
  return { sent: true };
});



// ---------- CORS (env-driven) ----------
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean)

await app.register(cors, {
  origin: (origin, cb) => {
    if (!origin) return cb(null, true) // server-to-server / curl
    if (ALLOWED_ORIGINS.length === 0) return cb(null, true)
    const ok = ALLOWED_ORIGINS.includes(origin)
    cb(ok ? null : new Error('CORS blocked'), ok)
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
})

// ---------- Rate limit (flag) ----------
const ENABLE_RATE_LIMIT = (process.env.ENABLE_RATE_LIMIT || 'true') === 'true'
if (ENABLE_RATE_LIMIT) {
  await app.register(rateLimit, {
    max: Number(process.env.RATE_LIMIT_MAX || 60),
    timeWindow: process.env.RATE_LIMIT_WINDOW || '1 minute'
  })
}

// ---------- Security headers (helmet, flag) ----------
const ENABLE_SECURITY_HEADERS = (process.env.ENABLE_SECURITY_HEADERS || 'true') === 'true'
if (ENABLE_SECURITY_HEADERS) {
  await app.register(helmet, {
    // CSP la gestiamo in report-only sotto, via header custom
    contentSecurityPolicy: false
  })
}

// ---------- CSP report-only (flag) ----------
const ENABLE_CSP_REPORT_ONLY = (process.env.ENABLE_CSP_REPORT_ONLY || 'true') === 'true'
const CSP_REPORT_URI = process.env.CSP_REPORT_URI || '/csp-report'
if (ENABLE_CSP_REPORT_ONLY) {
  app.addHook('onRequest', async (req, reply) => {
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "connect-src 'self' https: http:",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      `report-uri ${CSP_REPORT_URI}`
    ].join('; ')
    reply.header('Content-Security-Policy-Report-Only', csp)
  })

  app.post(CSP_REPORT_URI, async (req, _reply) => {
    try {
      const body: any = req.body
      app.log.warn({ cspReport: body }, 'CSP Report')
      return { ok: true }
    } catch {
      return { ok: false }
    }
  })
}

// ---------- Sentry (opt-in) ----------
if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV || 'development',
    tracesSampleRate: Number(process.env.SENTRY_TRACES_SAMPLE_RATE || 0.0),
  })
  app.setErrorHandler((err, req, reply) => {
    Sentry.captureException(err, { tags: { route: (req as any).routerPath || req.url } })
    req.log.error(err)
    reply.status(err.statusCode || 500).send({ ok: false, error: 'Internal error' })
  })
}

// ---------- System endpoints ----------
await app.register(systemPlugin)

// ---------- API business ----------
app.register(chatRoutes, { prefix: '/api' })

// ---------- Root ----------
app.get('/', async () => ({
  message: 'Welcome to NextSphere Concierge AI API 🌐',
  endpoints: ['/health', '/version', '/api/chat']
}))

// ---------- Listen ----------
const port = Number(process.env.PORT ?? process.env.API_PORT ?? 8081)
const host = process.env.API_HOST || '0.0.0.0'

try {
  await app.listen({ port, host })
  log.info(`✅ API listening on http://${host}:${port}`)
} catch (err) {
  log.error(err)
  process.exit(1)
}

