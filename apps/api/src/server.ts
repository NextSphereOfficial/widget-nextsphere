import Fastify from 'fastify';
import cors from '@fastify/cors';
import rateLimit from '@fastify/rate-limit';
import { chatRoutes } from './routes/chat.js';


const app = Fastify({ logger: true });

await app.register(cors, { origin: true });
await app.register(rateLimit, { max: 60, timeWindow: '1 minute' });

app.register(chatRoutes, { prefix: '/api' });

const port = Number(process.env.API_PORT) || 8080;
const host = process.env.API_HOST || '0.0.0.0';

app.listen({ port, host }).then(() => {
  app.log.info(`API listening on http://${host}:${port}`);
}).catch((err) => {
  app.log.error(err);
  process.exit(1);
});
