// apps/api/src/routes/adminLogs.ts
import type { FastifyInstance, FastifyPluginAsync } from "fastify";
import { prisma } from "../db/client.js";

type LogsQuery = {
  page?: string;
  pageSize?: string;
  sessionId?: string;
  roomId?: string;
  from?: string; // ISO date string
  to?: string;   // ISO date string
};

const adminLogsRoutes: FastifyPluginAsync = async (app: FastifyInstance) => {

     app.addHook("preHandler", async (req, reply) => {
    const adminKey = process.env.ADMIN_KEY;

    if (!adminKey) {
      app.log.error("ADMIN_KEY non impostata nelle env");
      return reply.code(500).send({ ok: false, error: "Admin key mancante" });
    }

    const provided = req.headers["x-ns-admin-key"];

    if (!provided || provided !== adminKey) {
      return reply.code(401).send({ ok: false, error: "Unauthorized" });
    }
  });
 
  /**
   * GET /admin/logs/messages
   *
   * Restituisce gli ultimi messaggi con info di sessione,
   * con filtri e paginazione base.
   */
  app.get("/logs/messages", async (req, reply) => {
    const q = (req.query || {}) as LogsQuery;

    // --- Paginazione sicura ---
    const pageNum = Math.max(parseInt(q.page || "1", 10) || 1, 1);
    const pageSizeRaw = parseInt(q.pageSize || "50", 10) || 50;
    const pageSize = Math.min(Math.max(pageSizeRaw, 1), 200); // max 200
    const skip = (pageNum - 1) * pageSize;

    // --- Costruzione filtro ---
    const where: any = {};

    // Filtro diretto per sessionId
    if (q.sessionId) {
      where.sessionId = String(q.sessionId);
    }

    // Filtro su Session (roomId, date range)
    if (q.roomId || q.from || q.to) {
      where.session = {};

      if (q.roomId) {
        where.session.roomId = String(q.roomId);
      }

      if (q.from || q.to) {
        where.session.startedAt = {};
        if (q.from) {
          const d = new Date(q.from);
          if (!isNaN(d.getTime())) {
            where.session.startedAt.gte = d;
          }
        }
        if (q.to) {
          const d = new Date(q.to);
          if (!isNaN(d.getTime())) {
            where.session.startedAt.lte = d;
          }
        }
      }
    }

    try {
      const [rows, total] = await Promise.all([
        prisma.message.findMany({
          where,
          orderBy: { createdAt: "desc" },
          include: {
            session: true, // ci serve roomId, lang, status, ecc.
          },
          skip,
          take: pageSize,
        }),
        prisma.message.count({ where }),
      ]);

      const items = rows.map((m) => ({
        id: m.id,
        sessionId: m.sessionId,
        role: m.role,
        content: m.content,
        createdAt: m.createdAt,
        session: m.session
          ? {
              id: m.session.id,
              roomId: m.session.roomId,
              lang: m.session.lang,
              status: m.session.status,
              startedAt: m.session.startedAt,
              closedAt: m.session.closedAt,
            }
          : null,
      }));

      const hasNextPage = skip + rows.length < total;

      return reply.code(200).send({
        ok: true,
        meta: {
          page: pageNum,
          pageSize,
          total,
          hasNextPage,
        },
        data: items,
      });
    } catch (err: any) {
      app.log.error({ err }, "admin_logs_messages_error");

      return reply.code(500).send({
        ok: false,
        error: err?.message || "Errore inatteso nel recupero dei log",
      });
    }
  });

  /**
   * Endpoint semplice di test, giusto per vedere se la route è montata.
   * GET /admin/ping
   */
  app.get("/ping", async () => {
    return { ok: true, service: "admin-logs", ts: new Date().toISOString() };
  });
};

export default adminLogsRoutes;
export { adminLogsRoutes };
