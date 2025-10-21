// apps/widget/src/services/chatClient.ts
type Ctx = { hotel?: string; room?: string; locale?: string };

const BASE = (
  (window as any).VITE_API_URL ??
  import.meta.env.VITE_API_URL ??
  import.meta.env.VITE_API_BASE ??
  ""
).replace(/\/+$/, "");

const ENDPOINT = `${BASE}/api/chat`;

export async function sendMessage(message: string, ctx?: Ctx) {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, ...ctx }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status} ${text}`);
  }
  return res.json();
}
