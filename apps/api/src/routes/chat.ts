// apps/api/src/routes/chat.ts
import type { FastifyInstance, FastifyPluginAsync } from "fastify";

import { loadIntentsCore, loadStructure } from "../content/loader.js";
import { buildContextFromYaml } from "../core/buildContext.js";
import { orchestrateChat } from "../core/orchestrator.js";
import { isOrchestratorAlwaysOn } from "../core/runtimeGuards.js";

import { norm, resolveIntent } from "../core/logic/intentResolver.js";
import { fallbackText, renderTemplate, resolveEffectiveLang } from "../core/logic/templateEngine.js";
import { noInfoText, parseTimeFromText, pickLocalizedText, sanitizeYamlReply } from "../core/logic/sanitize.js";

import {
  clearPending,
  ensureSessionForChat,
  getRecentMessages,
  getSessionState,
  saveMessage,
  setSessionState,
} from "../services/sessionService.js";




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


async function runEngineFromLoaded({
  structureId,
  structureYaml,
  message,
  lang,
}: {
  structureId: string;
  structureYaml: any;
  message: string;
  lang?: string;
}): Promise<EngineOutput> {
  const intentsCore = await loadIntentsCore();

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
  });

  // 🧠 Stato conversazionale (pending slot)
  const state = await getSessionState(session.id);

  // 🧾 Carichiamo la struttura UNA sola volta per request (single source of truth)
  const structureYaml = await loadStructure(resolvedStructureId);

  // 🧩 Context da YAML già caricato (evita doppio load)
  const ctx = buildContextFromYaml(resolvedStructureId, structureYaml);

  // Feature flag calcolata UNA volta
  const legacyMode = !isOrchestratorAlwaysOn();
  console.log("[CHAT] legacyMode =", legacyMode);
console.log("[CHAT] ORCH_ALWAYS_ON =", process.env.ORCH_ALWAYS_ON);


  // 💾 2) Salviamo il messaggio dell’utente
  await saveMessage({
    sessionId: session.id,
    role: "user",
    content: message,
    source: "user",
    intent: null,
    isFallback: null,
  });

  // ✅ Pending slot handler (solo legacy mode, prima dell’engine)
// Supporta sia pending legacy (intent+slot) sia pending semantico (kind/format)
const pendingAny = (state as any)?.pending;

if (
  legacyMode &&
  pendingAny &&
  (
    // legacy
    (pendingAny.intent && pendingAny.slot) ||
    // semantico
    (pendingAny.kind === "collect" && pendingAny.format === "time")
  )
) {

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
      const pending = pendingAny;
      const pendingIntent = String(pending.intent || "");

      // Per ora supportiamo solo slot "time"
      const isTimeSlot =
        pending.slot === "time" || (pending.kind === "collect" && pending.format === "time");

      if (isTimeSlot) {

        const time = parseTimeFromText(message);

        if (time) {
          await clearPending(session.id);

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
            intent: pendingIntent,

            source: "yaml_followup",
            isFallback: false,
          });

          return reply.code(200).send({
            ok: true,
            source: "yaml",
            intent: pendingIntent,

            confidence: 1.0,
            lang: replyLang,
            text,
            reply: text,
            sessionId: session.id,
          });
        }
      }

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
        intent: pendingIntent,

        source: "yaml_followup",
        isFallback: false,
      });

      return reply.code(200).send({
        ok: true,
        source: "yaml",
        intent: pendingIntent,

        confidence: 1.0,
        lang: replyLang,
        text: ask,
        reply: ask,
        sessionId: session.id,
      });
    }
  }

  // 🧠 3) Motore YAML
  const out = await runEngineFromLoaded({
    structureId: resolvedStructureId,
    structureYaml,
    message,
    lang,
  });

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

  // 🧠 Orchestrator ON
  if (!legacyMode) {
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
      state,
      lang,
      ctx
    );

// 🧠 Pending strutturato dall’orchestrator (compat: legacy + semantico)
const pending = (orch as any)?.pending;

if (pending && typeof pending === "object") {
  const nowIso = new Date().toISOString();

  // 1) Nuovo formato (semantico)
  if (pending.kind && pending.intent && pending.questionId) {
    await setSessionState(session.id, {
      ...(state || {}),
      pending: {
        kind: String(pending.kind),
        intent: String(pending.intent),
        questionId: String(pending.questionId),
        slot: pending.slot ? String(pending.slot) : undefined,
        format: pending.format ? String(pending.format) : undefined,
        data: pending.data && typeof pending.data === "object" ? pending.data : undefined,
        askedAt: nowIso,
      } as any,
    });
  }
  
  // 2) Non valido → clear
  else {
    await clearPending(session.id);
  }

// DEBUG LOG — DO NOT COMMIT
if (process.env.LUMO_DEBUG === "1") {
  const newState = await getSessionState(session.id);
  console.log(
    JSON.stringify({
      t: new Date().toISOString(),
      phase: "PENDING_PERSISTED",
      userMessage: message,
      persisted_pending: (newState as any)?.pending ?? null,
    })
  );
}




} else {
  await clearPending(session.id);
}


    // 💾 Salviamo SEMPRE la risposta assistant dall’orchestrator
    const assistantText = (orch as any)?.reply ?? (orch as any)?.text ?? "";
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

// DEBUG LOG — DO NOT COMMIT
if (process.env.LUMO_DEBUG === "1") {
  const st2 = await getSessionState(session.id);
  console.log(JSON.stringify({
    t: new Date().toISOString(),
    phase: "ORCH_RETURN",
    userMessage: message,
    out_intent: out.intent ?? null,
    out_conf: out.meta?.intentConfidence ?? null,
    out_singleWord: out.meta?.isSingleWord ?? null,
    state_pending_in: (state as any)?.pending ?? null,
    orch_source: (orch as any)?.source ?? null,
    orch_pending_out: (orch as any)?.pending ?? null,
    persisted_pending_after: (st2 as any)?.pending ?? null,
  }));
}





    return reply.code(200).send({
      ...(orch ?? {}),
      sessionId: session.id,
    });
  }

  // ------------------------------
  // Legacy path (orchestrator OFF)
  // ------------------------------

  // LLM fallback: delega all’orchestrator senza cache qui
  if (out?.meta?.isFallback === true) {
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
      state,
      lang,
      ctx
    );

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

    return reply.code(200).send({
      ...(llmOut ?? {}),
      sessionId: session.id,
    });
  }

  // ✅ Risposta YAML “normale”
  const replyLang = (out.lang ?? lang ?? "it").toLowerCase();
  const replyTextRaw = out.text;
  const replyText = pickLocalizedText(replyTextRaw, replyLang).trim();
  const baseReply = replyText ? replyText : noInfoText(replyLang);
  const safeReply =
    sanitizeYamlReply(baseReply, message, out.intent ?? undefined) || noInfoText(replyLang);

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