// src/services/sessionService.ts
import { prisma } from '../db/client.js';

export type EnsureSessionInput = {
  structureId: string;      // userId / roomId / struttura – per ora lo mappiamo su roomId
  sessionId?: string;       // se esiste già, la riusiamo
  lang?: string;            // es: "it", "en"
};

/**
 * Assicura che esista una sessione per questa struttura (structureId).
 * Per ora usiamo structureId direttamente come roomId nel modello Session esistente.
 */
export async function ensureSessionForChat(input: EnsureSessionInput) {
  const roomId = String(input.structureId || '').trim() || 'default';

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
      lang: input.lang ?? 'it',
    },
  });

  return session;
}

export async function saveMessage(params: {
  sessionId: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
}) {
  return prisma.message.create({
    data: {
      sessionId: params.sessionId,
      role: params.role,
      content: params.content,
    },
  });
}
