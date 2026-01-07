// apps/api/src/routes/chat.ts
import type { FastifyInstance, FastifyPluginAsync } from "fastify";

import { orchestrateChat } from "../core/orchestrator.js";
import { loadIntentsCore, loadStructure, loadLangPack } from "../content/loader.js";
import { norm, resolveIntent } from "../core/logic/intentResolver.js";
import { renderTemplate, fallbackText, resolveEffectiveLang } from "../core/logic/templateEngine.js";
import { pickLocalizedText, sanitizeYamlReply, noInfoText, parseTimeFromText } from "../core/logic/sanitize.js";


import { cacheGet, cacheSet } from "../core/runtimeGuards.js";
import {
  ensureSessionForChat,
  saveMessage,
  getRecentMessages,
  getSessionState,
  setSessionState,
  clearPending,
} from "../services/sessionService.js";


import { isOrchestratorAlwaysOn } from "../core/runtimeGuards.js";

import path from "node:path";


// -----------------------------------------------------


// -----------------------------------------------------
// Cache

const LLM_CACHE_PREFIX = "llm:chat:";

function buildLlmCacheKey(structureId: string, message: string, lang?: string) {
  const s = norm(message);
  const l = String(lang || "it").slice(0, 2).toLowerCase();
  return `${LLM_CACHE_PREFIX}${structureId}:${l}:${s}`;
}

// -----------------------------------------------------
// Types

type IntentResolution = {
  key: string;
  matched: boolean;
  score: number;
  secondScore: number;
  margin: number;
  confidence: number; // 0..1
  isSingleWord: boolean;
};


type IntentMatch = {
  key: string;
  score: number;
  matched: boolean;
};

type EngineOutput = {
  intent: string | null;
  lang: string;
  text: string;
  meta: {
    mode: "short" | "long";
    uiButtons: any[];
    isFallback: boolean;

    // NEW: telemetria intent (non cambia il comportamento)
    intentScore?: number;
    intentSecondScore?: number;
    intentMargin?: number;
    intentConfidence?: number;
    isSingleWord?: boolean;
  };
};


// Engine
// -----------------------------------------------------



async function findResponse(
  intentsCore: any,
  structureYaml: any,
  message: string,
  lang: string
) {
  const mode: "short" | "long" = "short";

  const intentRes = resolveIntent(message, intentsCore);
  const intentKey = intentRes.key;

  // 1) fallback "puro" (nessun match): qui ha senso l'LLM
  if (intentKey === "fallback") {
    return {
      intent: intentKey,
      text: fallbackText(structureYaml, intentKey, lang),
      buttons: [] as any[],
      isFallback: true,

      // NEW: telemetria intent
      intentScore: intentRes.score,
      intentSecondScore: intentRes.secondScore,
      intentMargin: intentRes.margin,
      intentConfidence: intentRes.confidence,
      isSingleWord: intentRes.isSingleWord,
    };
  }

  // 2) Qualsiasi altro intent: risposta YAML (anche se usa output.fallback interno)
  const rendered = await renderTemplate(structureYaml, intentKey, lang, mode);
  const baseText =
    (rendered.text && String(rendered.text).trim())
      ? rendered.text
      : (fallbackText(structureYaml, intentKey, lang) || "");

  return {
    intent: intentKey,
    text: baseText,
    buttons: rendered.buttons ?? [],
    isFallback: false,

    // NEW: telemetria intent
    intentScore: intentRes.score,
    intentSecondScore: intentRes.secondScore,
    intentMargin: intentRes.margin,
    intentConfidence: intentRes.confidence,
    isSingleWord: intentRes.isSingleWord,
  };
}


async function runEngine({
  structureId,
  message,
  lang,
}: {
  structureId: string;
  message: string;
  lang?: string;
}): Promise<EngineOutput> {
  const intentsCore = await loadIntentsCore();
  const structureYaml = await loadStructure(structureId);

  const effectiveLang = resolveEffectiveLang(lang, structureYaml);

  const resp = await findResponse(intentsCore, structureYaml, message, effectiveLang);

 return {
  intent: resp.intent,
  lang: effectiveLang,
  meta: {
    mode: "short",
    uiButtons: resp.buttons,
    isFallback: resp.isFallback,

    // NEW: telemetria intent
    intentScore: resp.intentScore,
    intentSecondScore: resp.intentSecondScore,
    intentMargin: resp.intentMargin,
    intentConfidence: resp.intentConfidence,
    isSingleWord: resp.isSingleWord,
  },
  text: resp.text,
};

}

// -----------------------------------------------------
// Routes
// -----------------------------------------------------

// Helpers (shared)




type ChatMode = "default" | "future";

async function handleChatRequest(
  req: any,
  reply: any,
  resolvedStructureId: string
) {
  const body = (req.body as any) || {};
  const message = String(body?.message ?? "").trim();
  const clientSessionId = body?.sessionId ? String(body.sessionId) : undefined;
  const lang = body?.lang ? String(body.lang) : undefined;

  if (!message) {
    return reply.code(400).send({
      ok: false,
      error: "Missing message",
      reply: "Missing message",
    });
  }

  // 1) Sessione
  const session = await ensureSessionForChat({
    structureId: resolvedStructureId,
    sessionId: clientSessionId,
    lang,
    // roomId: body?.room ? String(body.room) : undefined, // opzionale
  });

  // 🧠 Stato conversazionale (pending slot)
const state = await getSessionState(session.id);


  // 💾 2) Salviamo il messaggio dell’utente
  await saveMessage({
    sessionId: session.id,
    role: "user",
    content: message,
    source: "user",
    intent: null,
    isFallback: null,
  });

  // ✅ Pending slot handler (prima del motore intent)
if (state?.pending?.intent && state?.pending?.slot) {
    // 🧯 Escape hatch: se l’utente chiede chiaramente altro (wifi/emergency), non forzare pending
  const t = norm(message);
  const looksWifi = /\bwi\s*fi\b/.test(t) || t.includes("wifi") || t.includes("ssid");
  const looksEmergency =
    t.includes("emergenz") ||
    t.includes("ambulanza") ||
    t.includes("polizia") ||
    t.includes("carabinieri") ||
    t.includes("fuoco") ||
    t.includes("incendio");

  if (looksWifi || looksEmergency) {
    await clearPending(session.id);
  } else {
    // (continua con handler pending normale)

  // Per ora supportiamo solo slot "time"
  if (state.pending.slot === "time") {
    const time = parseTimeFromText(message);

    if (time) {
      // Puliamo pending
      await clearPending(session.id);

      // Risposta deterministica, senza LLM: rimanda all’host come da policy
      const replyLang = (lang || session.lang || "it").slice(0, 2).toLowerCase();

      const text =
        replyLang === "en"
          ? `Got it — around ${time}. For late checkout, please message the host to confirm availability.`
          : replyLang === "de"
          ? `Alles klar — gegen ${time}. Für Late Checkout bitte den Gastgeber kontaktieren, um die Verfügbarkeit zu bestätigen.`
          : replyLang === "fr"
          ? `D’accord — vers ${time}. Pour un late checkout, contacte l’hôte pour confirmer la disponibilité.`
          : replyLang === "es"
          ? `Perfecto — sobre las ${time}. Para late checkout, contacta con el anfitrión para confirmar disponibilidad.`
          : `Perfetto — verso le ${time}. Per il late checkout, contatta l’host per confermare la disponibilità.`;

      await saveMessage({
        sessionId: session.id,
        role: "assistant",
        content: text,
        intent: state.pending.intent,
        source: "yaml_followup",
        isFallback: false,
      });

      return reply.code(200).send({
        ok: true,
        source: "yaml",
        intent: state.pending.intent,
        confidence: 1.0,
        lang: replyLang,
        text,
        reply: text,
        sessionId: session.id,
      });
    }}

    // Se non capiamo l’orario → una domanda guidata (UNA)
    const replyLang = (lang || session.lang || "it").slice(0, 2).toLowerCase();

    const ask =
      replyLang === "en"
        ? "What time exactly? (e.g., 13:00)"
        : replyLang === "de"
        ? "Welche Uhrzeit genau? (z.B. 13:00)"
        : replyLang === "fr"
        ? "À quelle heure exactement ? (ex. 13:00)"
        : replyLang === "es"
        ? "¿A qué hora exactamente? (p. ej., 13:00)"
        : "A che ora esattamente? (es. 13:00)";

    await saveMessage({
      sessionId: session.id,
      role: "assistant",
      content: ask,
      intent: state.pending.intent,
      source: "yaml_followup",
      isFallback: false,
    });

    return reply.code(200).send({
      ok: true,
      source: "yaml",
      intent: state.pending.intent,
      confidence: 1.0,
      lang: replyLang,
      text: ask,
      reply: ask,
      sessionId: session.id,
    });
  }
}


  // 🧠 3) Motore YAML
  const out = await runEngine({ structureId: resolvedStructureId, message, lang });

  // 🔁 History breve (serve per orchestrator / contesto)
const historyRows = await getRecentMessages({
  sessionId: session.id,
  limit: 6,
});

const history = historyRows.map(
  (m): { role: "assistant" | "user"; content: string } => ({
    role: m.role === "assistant" ? "assistant" : "user",
    content: m.content,
  })
);

// 🧠 Orchestrator always-on (dietro feature flag)
if (isOrchestratorAlwaysOn()) {
  const orch = await orchestrateChat(
    resolvedStructureId,
    message,
    {
      matched: out.meta?.isFallback === false,
      intent: out.intent ?? undefined,
      confidence:
        typeof out.meta?.intentConfidence === "number"
          ? out.meta.intentConfidence
          : out.meta?.isFallback
          ? 0
          : 0.6,
      replyText: out.text,
      buttons: out.meta?.uiButtons ?? [],
      history,
      lang: out.lang,
      isSingleWord: !!out.meta?.isSingleWord,
    },
    lang
  );

// 🧠 Pending strutturato dall’orchestrator
const pending = (orch as any)?.pending;
if (pending && typeof pending === "object" && pending.intent && pending.slot) {
  await setSessionState(session.id, {
    ...(state || {}),
    pending: {
      intent: String(pending.intent),
      slot: String(pending.slot),
      askedAt: new Date().toISOString(),
    },
  });
} else {
  // se non c’è pending, puliamo eventuale pending precedente per sicurezza
  await clearPending(session.id);
}




  // 💾 Salviamo SEMPRE la risposta assistant dall’orchestrator
  const assistantText =
    (orch as any)?.reply ?? (orch as any)?.text ?? "";

  if (assistantText) {
    await saveMessage({
      sessionId: session.id,
      role: "assistant",
      content: String(assistantText),
      intent: out.intent ?? null,
      source: orch.source ?? "orchestrator",
      isFallback: orch.source === "llm",
    });
  }

  return reply.code(200).send({
    ...(orch ?? {}),
    sessionId: session.id,
  });
}


  // LLM fallback: se la risposta è di fallback YAML, attiva orchestratore + cache
  if (out?.meta?.isFallback === true) {
    const cacheKey = buildLlmCacheKey(
      resolvedStructureId,
      message,
      out.lang ?? lang ?? "it"
    );

    // 1) Prova cache
    const cachedRaw: any = cacheGet(cacheKey);
    if (cachedRaw) {
      try {
        const cached = JSON.parse(String(cachedRaw));

        const resp = {
          ...cached,
          source: (cached as any).source ?? "llm_cache",
          cacheHit: true,
          sessionId: session.id,
        };

        // 💾 salviamo anche la risposta cached come assistant
        const assistantText =
          (cached as any)?.reply ?? (cached as any)?.text ?? "";
        if (assistantText) {
          await saveMessage({
            sessionId: session.id,
            role: "assistant",
            content: String(assistantText),
            intent: out.intent ?? null,
            source: "llm",
            isFallback: true,
          });
        }

        return reply.code(200).send(resp);
      } catch {
        // cache corrotta → proseguiamo senza cache
      }
    }

    // 2) Se niente cache → chiamiamo LLM con history
    const historyRows = await getRecentMessages({
      sessionId: session.id,
      limit: 6,
    });

    const history = historyRows.map(
      (m): { role: "assistant" | "user"; content: string } => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: m.content,
      })
    );

    const llmOut = await orchestrateChat(
      resolvedStructureId,
      message,
      {
        matched: false,
        intent: out.intent ?? undefined,
        confidence: 0.3,
        history,
        lang: out.lang ?? lang ?? "it",
      },
      lang // reqLang dal widget
    );

    // 3) Se la risposta è valida, salviamo in cache (serializzata)
    if (llmOut && (llmOut as any).ok !== false) {
      cacheSet(cacheKey, JSON.stringify(llmOut));
    }

    // 💾 4) Salviamo il messaggio dell’assistente (se c’è testo)
    const assistantText = (llmOut as any)?.reply ?? (llmOut as any)?.text ?? "";
    if (assistantText) {
      await saveMessage({
        sessionId: session.id,
        role: "assistant",
        content: String(assistantText),
        intent: out.intent ?? null,
        source: "llm",
        isFallback: true,
      });
    }

    const resp = {
      ...(llmOut ?? {}),
      sessionId: session.id,
    };

    return reply.code(200).send(resp);
  }

  // ✅ Risposta YAML “normale” (mai vuota / mai oggetto non risolto)
  const replyLang = (out.lang ?? lang ?? "it").toLowerCase();
  const replyTextRaw = out.text;
  const replyText = pickLocalizedText(replyTextRaw, replyLang).trim();
  const baseReply = replyText ? replyText : noInfoText(replyLang);
  const safeReply = sanitizeYamlReply(baseReply, message, out.intent ?? undefined) || noInfoText(replyLang);


  // 💾 Salviamo SEMPRE una risposta assistant (safeReply non è mai vuota)
  await saveMessage({
    sessionId: session.id,
    role: "assistant",
    content: String(safeReply),
    intent: out.intent ?? null,
    source: "yaml",
    isFallback: false,
  });

  return reply
    .header("X-NS-Source", "yaml")
    .code(200)
    .send({
      ok: true,
      source: "yaml",
      intent: out.intent,
      confidence: 1.0,
      lang: out.lang,
      mode: out.meta?.mode ?? "short",
      text: safeReply,
      reply: safeReply,
      ui: { buttons: out.meta?.uiButtons ?? [] },
      sessionId: session.id,
    });
}

const chatRoutes: FastifyPluginAsync = async (app: FastifyInstance) => {
  // Debug: GET /_debug/chat/:structureId?q=...
  app.get("/_debug/chat/:structureId", async (req, reply) => {
    try {
      const { structureId } = req.params as { structureId: string };
      const { q } = (req.query as any) || {};

      const intentsCore = await loadIntentsCore();
      const structureYaml = await loadStructure(structureId);
      const intentMatch = resolveIntent(String(q ?? ""), intentsCore);

      return reply.code(200).send({
        ok: true,
        structureId,
        query: q,
        intentMatch,
        sampleYaml: {
          meta: structureYaml?.meta,
          hasIntents: !!structureYaml?.intents,
          intentsKeys: Object.keys(structureYaml?.intents || {}),
          responsesKeys: Object.keys(structureYaml?.responses || {}),
          sampleIntents: Object.keys(intentsCore || {}).slice(0, 5),
          sampleResponses: Object.keys(structureYaml?.responses || {}).slice(0, 5),
        },
      });
    } catch (err: any) {
      const msg = err?.message || "Errore inatteso";
      return reply.code(500).send({ ok: false, error: msg, reply: msg });
    }
  });

  // Retrocompatibilità: POST /chat (default structure + support ?hotel=SV001)
  app.post("/chat", async (req, reply) => {
    try {
      const body = (req.body as any) || {};

      const modeRaw = (body?.mode ?? "default") as string;
      const mode: ChatMode = modeRaw === "future" ? "future" : "default";

      const defaultStructure =
        mode === "future" ? "nextsphere-future" : "nextsphere";

      const hotel = body?.hotel ? String(body.hotel) : undefined;
      // const room  = body?.room  ? String(body.room)  : undefined; // opzionale

      // Se hotel è passato dal widget, lo usiamo come structureId.
      // Altrimenti manteniamo il comportamento attuale.
      const structureId = hotel || defaultStructure;

      return await handleChatRequest(req, reply, structureId);
    } catch (err: any) {
      const msg = err?.message || "Errore inatteso";
      return reply.code(500).send({ ok: false, error: msg, reply: msg });
    }
  });

  // Multistruttura: POST /chat/:structureId (+ mode future -> suffix -future)
  app.post("/chat/:structureId", async (req, reply) => {
    try {
      const { structureId } = req.params as { structureId: string };
      const body = (req.body as any) || {};

      const modeRaw = (body?.mode ?? "default") as string;
      const mode: ChatMode = modeRaw === "future" ? "future" : "default";

      const effectiveStructureId =
        mode === "future" ? `${structureId}-future` : structureId;

      return await handleChatRequest(req, reply, effectiveStructureId);
    } catch (err: any) {
      const msg = err?.message || "Errore inatteso";
      return reply.code(500).send({ ok: false, error: msg, reply: msg });
    }
  });
};

export default chatRoutes;
export { chatRoutes };
