import { FastifyInstance } from 'fastify';

type Body = { text?: string, hotel?: string, room?: string, lang?: string };

export async function chatRoutes(app: FastifyInstance) {
  app.post('/chat', async (req, reply) => {
    const body = (req.body || {}) as Body;
    const text = body.text?.trim();
    if (!text) {
      reply.code(400);
      return { ok: false, error: "Missing 'text' in body" };
    }
    // TODO: auth api key, persist, call LLM, etc.
    const greet = "Ciao! Sono il Concierge NextSphere ✨";
    return { ok: true, reply: `${greet} Hai scritto: "${text}"` };
  });
}
