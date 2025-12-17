// src/services/chatClient.ts

// --- Tipi ---
export type Ctx = {
  hotel?: string;   // legacy: usato come fallback per structureId
  room?: string;
  locale?: string;
  mode?: 'default' | 'future';   // 👈 nuovo
};


// 🔥 NEW: ora la risposta può contenere sessionId
export type ChatResponse = { 
  reply: string,
  sessionId?: string,
};

// --- Costanti ---

const DEFAULT_TIMEOUT_MS = 15000;

// Inferisci l'API_BASE in modo robusto
// - se hai una ENV VITE_API_BASE la usi
// - altrimenti costruisci l'URL in base all'origin corrente
function resolveApiBase(): string {
  try {
    const win = window as any;
    const envBase = win?.VITE_API_BASE || import.meta?.env?.VITE_API_BASE;
    if (typeof envBase === "string" && envBase.trim().length > 0) {
      return envBase.replace(/\/+$/, "");
    }
  } catch {
    // siamo probabilmente in SSR, fallback dopo
  }

  try {
    const loc = window.location;
    const origin = loc.origin || `${loc.protocol}//${loc.host}`;
    // 👇 qui punti all'API "ufficiale"
    return origin.replace(/\/+$/, "") + "/api";
  } catch {
    // fallback estremo
    return "https://api.nextsphere.it";
  }
}

// Base URL dell'API:
// - in dev: viene da .env.local → VITE_API_BASE=http://localhost:8081
// - in prod: viene da .env o dalle env di Vercel/Render
const API_BASE =
  (import.meta as any).env?.VITE_API_BASE || "http://localhost:8081";



// --- Utils interni ---

/**
 * Legge un parametro dalla query string (?foo=bar).
 */
function getParam(name: string): string | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    const url = new URL(window.location.href);
    const val = url.searchParams.get(name);
    return val || undefined;
  } catch {
    return undefined;
  }
}

/**
 * Legge in modo sicuro un testo da una Response (max 500 caratteri per sicurezza).
 */
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

if (ctx.hotel) body.hotel = ctx.hotel;
if (ctx.room)  body.room  = ctx.room;

// --- lingua: URL (?lang=en) -> ctx.locale -> navigator.language -> "it"
const urlLang =
  (getParam("lang") || getParam("locale")) ?? undefined;

const uiLang =
  (urlLang ||
    ctx.locale ||
    (typeof navigator !== "undefined" ? navigator.language : undefined) ||
    "it")
    .slice(0, 2)
    .toLowerCase();

body.lang = uiLang;

if (ctx.mode) body.mode = ctx.mode;

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
    throw new Error(
      `API error ${res.status} @ ${url} – body: ${txt || "<empty>"}`
    );
  }

  const json = (await res.json()) as any;

  // 🔥 NEW: salviamo eventuale sessionId restituito dall'API
  if (json?.sessionId && typeof json.sessionId === "string") {
    currentSessionId = json.sessionId;
  }

  const reply = String(json?.reply ?? "");

  return { reply, sessionId: currentSessionId };
}


// --- Gestione sessionId lato widget ---

let currentSessionId: string | undefined = undefined;

/**
 * Imposta manualmente una sessione (se vuoi forzarla da fuori).
 */
export function setSession(sessionId: string | undefined) {
  currentSessionId = sessionId;
}

/**
 * Restituisce la sessione corrente (se impostata).
 */
export function getSession(): string | undefined {
  return currentSessionId;
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
