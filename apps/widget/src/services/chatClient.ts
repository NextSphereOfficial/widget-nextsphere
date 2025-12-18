// src/services/chatClient.ts

// --- Tipi ---
export type Ctx = {
  hotel?: string; // legacy: usato come fallback per structureId
  room?: string;
  locale?: string; // può essere "it", "en", "auto", "en-GB", ecc.
  mode?: "default" | "future";
};

// 🔥 NEW: ora la risposta può contenere sessionId
export type ChatResponse = {
  reply: string;
  sessionId?: string;
};

// --- Costanti ---
const DEFAULT_TIMEOUT_MS = 15000;

// Inferisci l'API_BASE in modo robusto
function resolveApiBase(): string {
  try {
    const win = window as any;
    const envBase = win?.VITE_API_BASE || import.meta?.env?.VITE_API_BASE;
    if (typeof envBase === "string" && envBase.trim().length > 0) {
      return envBase.replace(/\/+$/, "");
    }
  } catch {
    // ignore
  }

  try {
    const loc = window.location;
    const origin = loc.origin || `${loc.protocol}//${loc.host}`;
    // in prod: stessa origin + /api
    return origin.replace(/\/+$/, "") + "/api";
  } catch {
    // fallback estremo
    return "https://api.nextsphere.it";
  }
}

// Base URL dell'API
const API_BASE = resolveApiBase();

// --- Utils interni ---

/**
 * Legge un parametro dalla query string (?foo=bar).
 * Nota: qui leggiamo SOLO l'URL dell'iframe/widget.
 * In questo progetto la configurazione principale passa via data-* (ctx.locale).
 */
function getParam(name: string): string | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    const url = new URL(window.location.href);
    const val = url.searchParams.get(name);
    return val && val.trim() ? val.trim() : undefined;
  } catch {
    return undefined;
  }
}

/**
 * Normalizza la lingua in formato ISO-2 (it/en/fr/de/...).
 * Gestisce "auto" e protegge dal vecchio bug "au".
 */
function resolveLang(input?: string): string {
  const raw = String(input ?? "").trim().toLowerCase();

  // "auto" (o vuoto) → usa la lingua del browser
  if (!raw || raw === "auto" || raw === "au") {
    const nav = typeof navigator !== "undefined" ? navigator.language : "it";
    return (nav || "it").slice(0, 2).toLowerCase();
  }

  // Supporta "en", "en-GB", "it_IT", ecc.: prendiamo la prima coppia di lettere
  const m = raw.match(/[a-z]{2}/);
  return (m?.[0] ?? "it").toLowerCase();
}

/**
 * Legge in modo sicuro un testo da una Response (max 500 caratteri).
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
 * - lang: da ?lang=… (se presente) altrimenti ctx.locale (data-lang), poi navigator.language
 */
export async function sendChat(
  message: string,
  ctx: Ctx = {},
  opts: { signal?: AbortSignal; timeoutMs?: number } = {}
): Promise<ChatResponse> {
  let structureId = getParam("structure") || ctx.hotel || "nextsphere";
  if (structureId === "NS001") structureId = "nextsphere";

  const room = getParam("room") || ctx.room || undefined;

  const path = `/chat/${encodeURIComponent(structureId)}`;
  const url = `${API_BASE}${path}`;

  const body: Record<string, any> = { message };

  // per retro-compat / analytics lato API
  if (ctx.hotel) body.hotel = ctx.hotel;
  if (room) body.room = room;

  // lingua: URL (?lang=xx) -> ctx.locale (data-lang) -> navigator.language -> "it"
  const urlLang = getParam("lang") || getParam("locale");
  body.lang = resolveLang(urlLang || ctx.locale);

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
      signal: opts.signal ?? controller?.signal,
    });
  } catch (e: any) {
    if (timer) clearTimeout(timer);
    throw new Error(`Fetch failed @ ${url}: ${e?.message || e}`);
  }
  if (timer) clearTimeout(timer);

  if (!res.ok) {
    const txt = await safeReadText(res);
    throw new Error(`API error ${res.status} @ ${url} – body: ${txt || "<empty>"}`);
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
