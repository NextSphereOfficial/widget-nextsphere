// apps/widget/src/.../chatClient.ts

export type Ctx = {
  hotel?: string;
  room?: string;
  locale?: string;
};

export type ChatResponse = {
  reply: string;
};

// --- Base URL (senza /api) ---
// Ordine di risoluzione:
// 1) window.VITE_API_URL (override runtime, utile per debug)
// 2) import.meta.env.VITE_API_URL (build-time, Vercel/local .env)
// 3) fallback: prod canonical
function resolveApiBase(): string {
  const winVal = (globalThis as any)?.VITE_API_URL;
  const envVal = (import.meta as any)?.env?.VITE_API_URL;
  const base = String(winVal ?? envVal ?? "https://api.svapartments.it");
  return base.replace(/\/+$/, ""); // rimuovi slash finali
}

// Costruzione sicura dell’endpoint, evitando //chat o /api/chat
export const API_BASE = resolveApiBase();
export const ENDPOINT = `${API_BASE}/chat`;

// Opzionale: timeout di rete per non bloccare la UI
const DEFAULT_TIMEOUT_MS = 20_000;

export async function sendChat(
  message: string,
  ctx: Ctx = {},
  opts: { signal?: AbortSignal; timeoutMs?: number } = {}
): Promise<ChatResponse> {
  if (!message || typeof message !== "string") {
    throw new Error("Messaggio non valido.");
  }

  const controller = !opts.signal && (typeof AbortController !== "undefined")
    ? new AbortController()
    : undefined;

  const timer = controller
    ? setTimeout(() => controller.abort(), opts.timeoutMs ?? DEFAULT_TIMEOUT_MS)
    : undefined;

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // Se un domani passi cookie/Authorization, abilita:
      // credentials: "include",
      body: JSON.stringify({
        message,       // richiesto dallo schema backend
        text: message, // compat vecchia (safe to keep)
        ...ctx,
      }),
      signal: opts.signal ?? controller?.signal,
    });

    // HTTP non-OK -> errore leggibile
    if (!res.ok) {
      const text = await safeReadText(res);
      throw new Error(`HTTP ${res.status} ${text || res.statusText}`);
    }

    // Risposta attesa: { reply: string }
    const data = (await res.json()) as unknown;
    if (!isChatResponse(data)) {
      throw new Error("Risposta inattesa dal server.");
    }
    return data;
  } catch (err: any) {
    // Messaggi chiari su timeout/abort o errori di rete
    if (err?.name === "AbortError") {
      throw new Error("Timeout o richiesta annullata.");
    }
    throw new Error(err?.message || "Errore di rete.");
  } finally {
    if (timer) clearTimeout(timer);
  }
}

// --- Helpers ---

function isChatResponse(x: unknown): x is ChatResponse {
  return !!x && typeof (x as any).reply === "string";
}

async function safeReadText(res: Response): Promise<string> {
  try {
    const txt = await res.text();
    // Evita stampe chilometriche
    return txt.length > 500 ? txt.slice(0, 500) + "…" : txt;
  } catch {
    return "";
  }
}

