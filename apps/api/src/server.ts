import Fastify from 'fastify';
import cors from '@fastify/cors';
import rateLimit from '@fastify/rate-limit';
import { chatRoutes } from './routes/chat.js';

const app = Fastify({ logger: true });
const log = app.log as any;
await app.register(cors, {
  origin: [
    'https://widget-nextsphere-widget-test.vercel.app',
    'http://localhost:5173'
  ],
  methods: ['GET','POST','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
});
await app.register(rateLimit, { max: 60, timeWindow: '1 minute' });

app.register(chatRoutes, { prefix: '/api' });

app.get('/health', async () => ({ status: 'ok', message: 'NextSphere API running ✅' }));
app.get('/', async () => ({ message: 'Welcome to NextSphere Concierge AI API 🌐', endpoints: ['/api/chat','/health'] }));

const port = Number(process.env.PORT ?? process.env.API_PORT ?? 8081);
const host = process.env.API_HOST || '0.0.0.0';

try {
  await app.listen({ port, host });
  log.info(`✅ API listening on http://${host}:${port}`);
} catch (err) {
  log.error(err);
  process.exit(1);
}
