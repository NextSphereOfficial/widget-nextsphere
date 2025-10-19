// apps/widget/src/services/chatClient.ts
type ConversationCtx = {
  hotel?: string | null;
  room?: string | null;
  locale?: string | null;
};

const API_BASE = import.meta.env.VITE_API_BASE ?? 'http://localhost:8081';

export async function sendMessage(
  message: string,
  ctx: ConversationCtx
): Promise<{ reply: string }> {
  const payload = {
    text: message,                 // ⬅️ QUI: 'text' (non 'message')
    hotel: ctx.hotel ?? null,
    room: ctx.room ?? null,
    locale: ctx.locale ?? 'it'
  };

  const res = await fetch(`${API_BASE}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    console.error('[sendMessage] HTTP', res.status, text);
    throw new Error(`HTTP ${res.status} ${text}`);
  }

  return res.json();
}
