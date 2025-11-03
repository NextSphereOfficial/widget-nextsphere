import type { FastifyPluginAsync } from "fastify";
import { loadConfig, getAvailableStructures } from "./resolver/loadConfig.js";
import { toLLMContext } from "./resolver/toLLMContext.js";

const structuresRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get("/structures", async () => {
    return { ok: true, structures: getAvailableStructures() };
  });

  fastify.get<{
    Params: { structureId: string };
    Querystring: { room?: string; redact?: string };
  }>("/structures/:structureId/context", async (req, reply) => {
    const { structureId } = req.params;
    const { room, redact } = req.query;
    try {
      const cfg = loadConfig(structureId);
      const ctx = toLLMContext(cfg, room, redact === "true");
      return { ok: true, context: ctx };
    } catch (err: any) {
      reply.code(400);
      return { ok: false, error: err.message ?? "Invalid structure config" };
    }
  });

  // Optional: enriched echo for testing
  fastify.post<{
    Params: { structureId: string };
    Body: { message: string; room?: string };
  }>("/chat/:structureId", async (req) => {
    const { structureId } = req.params;
    const { room, message } = req.body;
    const cfg = loadConfig(structureId);
    const ctx = toLLMContext(cfg, room, true);
    return { ok: true, reply: `Echo: ${message}`, meta: { ctx } };
  });
};

export default structuresRoutes;
