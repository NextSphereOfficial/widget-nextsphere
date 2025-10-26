import fp from 'fastify-plugin'
import { FastifyInstance, FastifyPluginAsync } from 'fastify'

const systemPlugin: FastifyPluginAsync = fp(async (app: FastifyInstance) => {
  // Build metadata da env (iniettate in CI/CD o settate manualmente)
  const VERSION = process.env.APP_VERSION ?? '0.0.0'
  const COMMIT_SHA = process.env.APP_COMMIT ?? 'unknown'
  const BUILD_TIME = process.env.APP_BUILD_TIME ?? 'unknown'
  const ENV = process.env.NODE_ENV ?? 'development'

  // Header no-cache per endpoint diagnostici
  const noCache = { 'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate' }

  // /health: leggerissimo, nessuna chiamata esterna
  app.get('/health', {
    schema: {
      response: {
        200: {
          type: 'object',
          properties: {
            status: { type: 'string', enum: ['ok', 'degraded', 'down'] },
            uptimeSec: { type: 'number' },
            timestamp: { type: 'string' }
          },
          required: ['status', 'uptimeSec', 'timestamp']
        }
      }
    }
  }, async (_req, reply) => {
    const payload = {
      status: 'ok' as const,
      uptimeSec: process.uptime(),
      timestamp: new Date().toISOString()
    }
    return reply.headers(noCache).send(payload)
  })

  // /version: info build per diagnosi rapida
  app.get('/version', {
    schema: {
      response: {
        200: {
          type: 'object',
          properties: {
            version: { type: 'string' },
            commit: { type: 'string' },
            buildTime: { type: 'string' },
            env: { type: 'string' }
          },
          required: ['version', 'commit', 'buildTime', 'env']
        }
      }
    }
  }, async (_req, reply) => {
    const payload = {
      version: VERSION,
      commit: COMMIT_SHA,
      buildTime: BUILD_TIME,
      env: ENV
    }
    return reply.headers(noCache).send(payload)
  })
})

export default systemPlugin
