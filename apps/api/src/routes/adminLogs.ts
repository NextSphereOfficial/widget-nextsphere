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
  // 🔐 Protezione con ADMIN_KEY per tutte le route /admin/*
  app.addHook("preHandler", async (req, reply) => {
    const adminKey = process.env.ADMIN_KEY;

    if (!adminKey) {
      app.log.error("ADMIN_KEY non impostata nelle env");
      return reply
        .code(500)
        .send({ ok: false, error: "Admin key mancante" });
    }

    const provided = req.headers["x-ns-admin-key"];

    if (!provided || provided !== adminKey) {
      return reply
        .code(401)
        .send({ ok: false, error: "Unauthorized" });
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
          const dFrom = new Date(q.from);
          if (!isNaN(dFrom.getTime())) {
            where.session.startedAt.gte = dFrom;
          }
        }

        if (q.to) {
          const dTo = new Date(q.to);
          if (!isNaN(dTo.getTime())) {
            where.session.startedAt.lte = dTo;
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
            session: true,
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

             // 🔥 nuovi campi per la dashboard
             intent: m.intent,
             source: m.source,
             isFallback: m.isFallback,

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
   * GET /admin/stats/overview
   *
   * Statistiche aggregate base su Session e Message.
   * (Per ora niente YAML/LLM: lo aggiungiamo quando avremo i campi nel DB)
   */
  app.get("/stats/overview", async (_req, reply) => {
    const now = new Date();
    const last7 = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    try {
      const [
        totalSessions,
        openSessions,
        closedSessions,
        totalMessages,
        messagesLast7,
        sessionsLast7,
        userMessages,
        assistantMessages,
        systemMessages,
      ] = await Promise.all([
        prisma.session.count(),
        prisma.session.count({ where: { status: "open" } }),
        prisma.session.count({ where: { status: "closed" } }),
        prisma.message.count(),
        prisma.message.count({
          where: { createdAt: { gte: last7 } },
        }),
        prisma.session.count({
          where: { startedAt: { gte: last7 } },
        }),
        prisma.message.count({ where: { role: "user" } }),
        prisma.message.count({ where: { role: "assistant" } }),
        prisma.message.count({ where: { role: "system" } }),
      ]);

      return reply.code(200).send({
        ok: true,
        data: {
          generatedAt: now,
          totalSessions,
          openSessions,
          closedSessions,
          totalMessages,
          sessionsLast7Days: sessionsLast7,
          messagesLast7Days: messagesLast7,
          userMessages,
          assistantMessages,
          systemMessages,
        },
      });
    } catch (err: any) {
      app.log.error({ err }, "admin_stats_overview_error");

      return reply.code(500).send({
        ok: false,
        error: err?.message || "Errore inatteso nel calcolo delle stats",
      });
    }
  });

  /**
   * GET /admin/ping
   */
  app.get("/ping", async () => {
    return {
      ok: true,
      service: "admin-logs",
      ts: new Date().toISOString(),
    };
  });
};

export default adminLogsRoutes;
export { adminLogsRoutes };
