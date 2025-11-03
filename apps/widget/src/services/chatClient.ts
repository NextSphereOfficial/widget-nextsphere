// src/services/chatClient.ts

export type Ctx = {
  hotel?: string;  // legacy: usato come fallback per structureId
  room?: string;
  locale?: string;
};

export type ChatResponse = {
  reply: string;
  // il backend può aggiungere altri campi (es. ok, meta.ctx) che non tipizziamo qui
};

// --- Base URL (senza /api) ---
function resolveApiBase(): string {
  const winVal = (globalThis as any)?.VITE_API_URL;
  const envVal = (import.meta as any)?.env?.VITE_API_URL;
  const base = String(winVal ?? envVal ?? "https://api.svapartments.it");
  return base.replace(/\/+$/, ""); // rimuovi slash finali
}

export const API_BASE = resolveApiBase();

const DEFAULT_TIMEOUT_MS = 20_000;

// --- Query param helper (no deps) ---
function getParam(name: string): string | null {
  try {
    return new URLSearchParams(globalThis.location?.search ?? "").get(name);
  } catch {
    return null;
  }
}

/**
 * Invio messaggio alla route pulita: POST /chat/:structureId
 * - structureId: letto da ?structure=... (fallback ctx.hotel, poi "svapartments")
 * - room: letto da ?room=... (fallback ctx.room)
 */
export async function sendChat(
  message: string,
  ctx: Ctx = {},
  opts: { signal?: AbortSignal; timeoutMs?: number } = {}
): Promise<ChatResponse> {
  if (!message || typeof message !== "string") {
    throw new Error("Messaggio non valido.");
  }

  // Risolviamo structureId e room in ordine di priorità: URL → ctx → default
  const structureId =
    getParam("structure") ||
    ctx.hotel ||                       // legacy fallback
    "svapartments";

  const room =
    getParam("room") ||
    ctx.room ||
    undefined;

  // Endpoint dinamico /chat/:structureId
  const endpoint = `${API_BASE}/chat/${encodeURIComponent(structureId)}`;

  const controller =
    !opts.signal && typeof AbortController !== "undefined"
      ? new AbortController()
      : undefined;

  const timer = controller
    ? setTimeout(() => controller.abort(), opts.timeoutMs ?? DEFAULT_TIMEOUT_MS)
    : undefined;

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // credentials: "include", // se in futuro invii cookie/Authorization
      body: JSON.stringify({
        message,             // richiesto dallo schema backend
        room,                // opzionale, usato dal resolver per gli override
        locale: ctx.locale,  // non obbligatorio, pronto per estensioni future
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
