// apps/api/src/routes/chat.ts
import type { FastifyInstance, FastifyPluginAsync } from "fastify";

import { loadIntentsCore, loadStructure } from "../content/loader.js";
import { buildContextFromYaml } from "../core/buildContext.js";
import { orchestrateChat } from "../core/orchestrator.js";
import { norm, resolveIntent } from "../core/logic/intentResolver.js";
import { fallbackText, renderTemplate, resolveEffectiveLang } from "../core/logic/templateEngine.js";


import {
  clearPending,
  ensureSessionForChat,
  getRecentMessages,
  getSessionState,
  saveMessage,
  setPending,
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
  const pendingAtStart = (state as any)?.pending ?? null;
  const hasPending = !!(
  pendingAtStart &&
  typeof pendingAtStart === "object" &&
  (pendingAtStart as any).kind
);



  // 🧾 Carichiamo la struttura UNA sola volta per request (single source of truth)
  const structureYaml = await loadStructure(resolvedStructureId);

  // 🧩 Context da YAML già caricato (evita doppio load)
  const ctx = buildContextFromYaml(resolvedStructureId, structureYaml);


  // 💾 2) Salviamo il messaggio dell’utente
  await saveMessage({
    sessionId: session.id,
    role: "user",
    content: message,
    source: "user",
    intent: null,
    isFallback: null,
  });


// 🧠 3) Motore YAML (solo se NON siamo in pending)
let out: EngineOutput;

if (!hasPending) {
  out = await runEngineFromLoaded({
    structureId: resolvedStructureId,
    structureYaml,
    message,
    lang,
  });
} else {
  const effectiveLang = resolveEffectiveLang(lang, structureYaml);
  out = {
    intent: null,
    lang: effectiveLang,
    text: "",
    meta: { mode: "short", uiButtons: [], isFallback: true },
  };
}


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
 
    const orch = await orchestrateChat(
      resolvedStructureId,
      message,
      {
        matched: !hasPending && out.meta?.isFallback === false,
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

// 🧠 Pending strutturato dall’orchestrator (single owner)
const pending = (orch as any)?.pending;

if (pending && typeof pending === "object" && pending.kind && pending.intent && pending.questionId) {
  const nowIso = new Date().toISOString();

  await setPending(session.id, {
    kind: String(pending.kind),
    intent: String(pending.intent),
    questionId: String(pending.questionId),
    slot: pending.slot ? String(pending.slot) : undefined,
    format: pending.format ? String(pending.format) : undefined,
    data: pending.data && typeof pending.data === "object" ? pending.data : undefined,
    askedAt: nowIso,
  } as any);
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

    return reply.code(200).send({
      ...(orch ?? {}),
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