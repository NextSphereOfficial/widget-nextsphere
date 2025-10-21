import Fastify from 'fastify';
import cors from '@fastify/cors';
import rateLimit from '@fastify/rate-limit';
import { chatRoutes } from './routes/chat.js';

const app = Fastify({ logger: true });

// Middleware base
await app.register(cors, { origin: true });
await app.register(rateLimit, { max: 60, timeWindow: '1 minute' });

// Route principali
app.register(chatRoutes, { prefix: '/api' });

// Healthcheck route
app.get('/health', async () => {
  return { status: 'ok', message: 'NextSphere API running ✅' };
});

// Root route (utile per debug e tunnel)
app.get('/', async () => {
  return {
    message: 'Welcome to NextSphere Concierge AI API 🌐',
    endpoints: ['/api/chat', '/health']
  };
});

// Server setup
const port = Number(process.env.API_PORT) || 8081;
const host = process.env.API_HOST || '0.0.0.0';

try {
  await app.listen({ port, host });
  app.log.info(`✅ API listening on http://${host}:${port}`);
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
