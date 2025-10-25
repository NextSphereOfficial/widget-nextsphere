type Ctx = { hotel?: string; room?: string; locale?: string };

function getBase() {
  const base =
    (window as any).VITE_API_URL ??
    import.meta.env.VITE_API_URL ??
    import.meta.env.VITE_API_BASE ??
    "";
  return String(base).replace(/\/+$/, "");
}

export async function sendMessage(message: string, ctx?: Ctx) {
  const BASE = getBase();
  const ENDPOINT = `${BASE}/api/chat`;

  // 👇 log a runtime, in produzione
  console.log("[chatClient] BASE =", BASE, "ENDPOINT =", ENDPOINT);

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
