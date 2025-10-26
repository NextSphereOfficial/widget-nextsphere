// src/services/chatClient.ts

export type Ctx = {
  hotel?: string;
  room?: string;
  locale?: string;
};

export type ChatResponse = {
  reply: string;
};

// --- Base URL (senza /api) ---
function resolveApiBase(): string {
  const winVal = (globalThis as any)?.VITE_API_URL;
  const envVal = (import.meta as any)?.env?.VITE_API_URL;
  const base = String(winVal ?? envVal ?? "https://api.svapartments.it");
  return base.replace(/\/+$/, ""); // rimuovi slash finali
}

export const API_BASE = resolveApiBase();
export const ENDPOINT = `${API_BASE}/chat`;

const DEFAULT_TIMEOUT_MS = 20_000;

export async function sendChat(
  message: string,
  ctx: Ctx = {},
  opts: { signal?: AbortSignal; timeoutMs?: number } = {}
): Promise<ChatResponse> {
  if (!message || typeof message !== "string") {
    throw new Error("Messaggio non valido.");
  }

  const controller =
    !opts.signal && typeof AbortController !== "undefined"
      ? new AbortController()
      : undefined;

  const timer = controller
    ? setTimeout(() => controller.abort(), opts.timeoutMs ?? DEFAULT_TIMEOUT_MS)
    : undefined;

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // credentials: "include", // se in futuro invii cookie/Authorization
      body: JSON.stringify({
        message,       // richiesto dallo schema backend
        text: message, // compat vecchia
        ...ctx,
      }),
      signal: opts.signal ?? controller?.signal,
    });

    if (!res.ok) {
      const text = await safeReadText(res);
      throw new Error(`HTTP ${res.status} ${text || res.statusText}`);
    }

    const data = (await res.json()) as unknown;
    if (!isChatResponse(data)) {
      throw new Error("Risposta inattesa dal server.");
    }
    return data;
  } catch (err: any) {
    if (err?.name === "AbortError") {
      throw new Error("Timeout o richiesta annullata.");
    }
    throw new Error(err?.message || "Errore di rete.");
  } finally {
    if (timer) clearTimeout(timer);
  }
}

// 🔁 Alias per retrocompatibilità con App.tsx
export const sendMessage = sendChat;

// --- Helpers ---

function isChatResponse(x: unknown): x is ChatResponse {
  return !!x && typeof (x as any).reply === "string";
}

async function safeReadText(res: Response): Promise<string> {
  try {
    const txt = await res.text();
    return txt.length > 500 ? txt.slice(0, 500) + "…" : txt;
  } catch {
    return "";
  }
}
