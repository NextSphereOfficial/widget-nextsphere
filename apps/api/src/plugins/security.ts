import fp from 'fastify-plugin';
import helmet from '@fastify/helmet';

export default fp(async (app) => {
  await app.register(helmet, {
    // CSP in reportOnly per non bloccare in debug
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        "default-src": ["'self'"],
        "img-src": ["'self'", "data:"],
        "style-src": ["'self'", "'unsafe-inline'"],
        "script-src": ["'self'"],
        "connect-src": ["'self'", "https://api.nextsphere.it"],
      },
      reportOnly: true,
    },
    crossOriginResourcePolicy: { policy: "cross-origin" },
  });
});
