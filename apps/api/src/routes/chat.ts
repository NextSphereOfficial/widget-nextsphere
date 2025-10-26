import { FastifyInstance } from 'fastify';

type Body = { text?: string, hotel?: string, room?: string, lang?: string };

export async function chatRoutes(app: FastifyInstance) {

  app.post('/chat', {
  config: { rateLimit: { max: 10, timeWindow: 10_000 } }, // ripristinato
  schema: {
    body: {
      type: 'object',
      required: ['message'],
      additionalProperties: false,
      properties: {
        message: { type: 'string', minLength: 1, maxLength: 1000 },
        lang: { type: 'string', enum: ['it','en','fr','de'], nullable: true }
      }
    },
    response: {
      200: {
        type: 'object',
        additionalProperties: false,
        properties: { reply: { type: 'string' } }
      }
    }
  }
}, async (req, reply) => {
  const { message } = req.body as { message: string };
  // … tua logica …
  return { reply: `Echo: ${message}` };
});
}
