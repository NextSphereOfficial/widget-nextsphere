// src/services/sessionService.ts
import { prisma } from "../db/client.js";

export type EnsureSessionInput = {
  structureId: string;      // usato come roomId per ora
  sessionId?: string;       // se esiste già, la riusiamo
  lang?: string;            // es: "it", "en"
};

export type PendingState = {
  kind: "followup" | "collect" | "confirm";
  intent: string;
  questionId: string;
  askedAt: string; // ISO
  slot?: string;
  format?: "time" | "date" | "number" | "text";
  data?: Record<string, any>;
};


export type ConversationState = {
  pending?: PendingState;
};



/**
 * Assicura che esista una sessione per questa struttura (structureId).
 * Per ora usiamo structureId direttamente come roomId nel modello Session esistente.
 */
export async function ensureSessionForChat(input: EnsureSessionInput) {
  const roomId = String(input.structureId || "").trim() || "default";

  // Se mi arriva una sessione già esistente, la validiamo e riusiamo
  if (input.sessionId) {
    const existing = await prisma.session.findUnique({
      where: { id: input.sessionId },
    });

    // Se esiste e ha lo stesso roomId, la riusiamo
    if (existing && existing.roomId === roomId) {
      return existing;
    }
  }

  // Altrimenti ne creiamo una nuova
  const session = await prisma.session.create({
    data: {
      roomId,
      lang: input.lang ?? "it",
      // niente status: usa il default se esiste, altrimenti nessun campo
    },
  });


  return session;
}

export async function saveMessage(params: {
  sessionId: string;
  role: "user" | "assistant" | "system";
  content: string;
  intent?: string | null;
  source?: string | null;
  isFallback?: boolean | null;
}) {
  return prisma.message.create({
    data: {
      sessionId: params.sessionId,
      role: params.role,
      content: params.content,
      intent: params.intent ?? null,
      source: params.source ?? null,
      isFallback:
        typeof params.isFallback === "boolean" ? params.isFallback : null,
    },
  });
}


// 🔥 NEW: leggi gli ultimi N messaggi della sessione (in ordine cronologico)
export async function getRecentMessages(params: {
  sessionId: string;
  limit?: number;
}) {
  const limit = params.limit ?? 6; // ultimi 6 messaggi per il contesto

  const rows = await prisma.message.findMany({
    where: { sessionId: params.sessionId },
    orderBy: { createdAt: "asc" },
    take: limit,
  });

  return rows;
}

export async function getSessionState(sessionId: string): Promise<ConversationState> {
  const s = await prisma.session.findUnique({
    where: { id: sessionId },
    select: { stateJson: true },
  });

  const raw = (s as any)?.stateJson;
  if (!raw || typeof raw !== "object") return {};
  return raw as ConversationState;
}

export async function setSessionState(sessionId: string, state: ConversationState) {
  return prisma.session.update({
    where: { id: sessionId },
    data: { stateJson: state as any },
  });
}

export async function clearPending(sessionId: string) {
  const state = await getSessionState(sessionId);
  if (!state?.pending) return;
  delete state.pending;
  await setSessionState(sessionId, state);
}
