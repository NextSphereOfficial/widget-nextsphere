// src/services/chatClient.ts

// --- Tipi ---
export type Ctx = {
  hotel?: string;   // legacy: usato come fallback per structureId
  room?: string;
  locale?: string;
};

// 🔥 NEW: ora la risposta può contenere sessionId
export type ChatResponse = { 
  reply: string,
  sessionId?: string,
};

// --- Base URL (senza /api) ---
function resolveApiBase(): string {
  // Ordine robusto: window → import.meta.env → process.env → fallback
  try {
    const winVal = (globalThis as any)?.VITE_API_URL;
    if (typeof winVal === "string" && winVal.trim()) return winVal.replace(/\/+$/, "");
  } catch {}

  try {
    const envVal = (import.meta as any)?.env?.VITE_API_URL;
    if (typeof envVal === "string" && envVal.trim()) return envVal.replace(/\/+$/, "");
  } catch {}

  try {
    const procVal = (globalThis as any)?.process?.env?.VITE_API_URL;
    if (typeof procVal === "string" && procVal.trim()) return procVal.replace(/\/+$/, "");
  } catch {}

  // Fallback sicuro in prod
  return "https://api.nextsphere.it";
}

const API_BASE = resolveApiBase();
const DEFAULT_TIMEOUT_MS = 20_000;

// 🔥 NEW: sessione mantenuta internamente dal widget
let currentSessionId: string | null = null;
export function resetChatSession() {
  currentSessionId = null;
}
export function getCurrentSessionId() {
  return currentSessionId;
}

// --- Utils ---
function getParam(name: string): string | null {
  try { return new URLSearchParams(globalThis.location?.search ?? "").get(name); }
  catch { return null; }
}

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

/**
 * Invia un messaggio all'API:
 * - POST /chat/:structureId
 * - structureId: da ?structure=…, fallback ctx.hotel, poi "nextsphere"
 * - room: da ?room=…, fallback ctx.room
 * - locale: passato come "lang"
 */
export async function sendChat(
  message: string,
  ctx: Ctx = {},
  opts: { signal?: AbortSignal; timeoutMs?: number } = {}
): Promise<ChatResponse> {

  let structureId = getParam("structure") || ctx.hotel || "nextsphere";
  if (structureId === "NS001") structureId = "nextsphere";

  const room =
    getParam("room") ||
    ctx.room ||
    undefined;

  const path = `/chat/${encodeURIComponent(structureId)}`;
  const url = `${API_BASE}${path}`;

  const body: Record<string, any> = { message };

  if (room) body.room = room;
  if (ctx.locale) body.lang = ctx.locale;

  // 🔥 NEW: inviamo sessionId se esiste
  body.sessionId = currentSessionId;

  const controller =
    !opts.signal && typeof AbortController !== "undefined"
      ? new AbortController()
      : undefined;

  const timer = controller
    ? setTimeout(() => controller.abort(), opts.timeoutMs ?? DEFAULT_TIMEOUT_MS)
    : undefined;

  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: opts.signal ?? controller?.signal
    });
  } catch (e: any) {
    if (timer) clearTimeout(timer);
    throw new Error(`Fetch failed @ ${url}: ${e?.message || e}`);
  }
  if (timer) clearTimeout(timer);

  if (!res.ok) {
    const txt = await safeReadText(res);
    throw new Error(`API ${res.status} ${res.statusText} @ ${url} – ${txt}`);
  }

  const data = (await res.json()) as unknown;

  if (!isChatResponse(data)) {
    throw new Error(`Invalid response shape: ${JSON.stringify(data).slice(0, 200)}…`);
  }

  // 🔥 NEW: aggiorniamo la sessione interna al widget
  if ((data as any).sessionId) {
    currentSessionId = (data as any).sessionId;
  }

  return data;
}

/** Alias retro-compatibile per App.tsx */
export async function sendMessage(
  text: string,
  ctx?: Ctx,
  opts?: { signal?: AbortSignal; timeoutMs?: number }
): Promise<ChatResponse> {
  return sendChat(text, ctx, opts);
}

// Debug minimal (rimuovi quando hai verificato)
if (typeof console !== "undefined") {
  // eslint-disable-next-line no-console
  console.info("[Widget] API_BASE =", API_BASE);
}
