import fp from 'fastify-plugin';
import cors from '@fastify/cors';

export default fp(async (app) => {
  const allowlist = new Set<string>([
    'https://widget.nextsphere.it',
    'https://nextsphere.it',
    'http://localhost:5173', // dev vite
    'http://127.0.0.1:5173',
  ]);

  await app.register(cors, {
    origin(origin, cb) {
      if (!origin) return cb(null, true);            // curl/postman
      cb(null, allowlist.has(origin));
    },
    methods: ['GET','POST','OPTIONS'],
    allowedHeaders: ['Content-Type','Authorization'],
    exposedHeaders: [],
    credentials: false,                               // metti true SOLO se usi cookie
    preflight: true,
    maxAge: 86400,
  });
});
