import { FastifyInstance } from 'fastify';

type Body = { text?: string, hotel?: string, room?: string, lang?: string };

export async function chatRoutes(app: FastifyInstance) {
  app.post('/chat', {
    // 🔒 rate limit locale: 10 richieste / 10 secondi
    // (sovrascrive quello globale)
    config: {
      rateLimit: {
        max: 10,
        timeWindow: 10000, // ms
      },
    } as any, // <- in TS, per evitare warning dei tipi

    // ✅ (consigliato) validazione minima del body
    schema: {
      body: {
        type: 'object',
        required: ['message'],
        additionalProperties: false,
        properties: {
          message: { type: 'string', minLength: 1, maxLength: 1000 },
          lang: { type: 'string', enum: ['it','en','fr','de'], nullable: true },
        },
      },
      response: {
        200: {
          type: 'object',
          properties: {
            reply: { type: 'string' },
          },
        },
      },
    },
  }, async (req, reply) => {
    const { message } = req.body as { message: string };
    // … tua logica …
    return { reply: `Echo: ${message}` };
  });
}
