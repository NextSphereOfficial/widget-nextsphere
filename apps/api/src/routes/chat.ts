// apps/api/src/routes/chat.ts
import type { FastifyInstance, FastifyPluginAsync } from "fastify";
import { resolve } from "node:path";
import { readFile, access } from "node:fs/promises";
import { constants as FS } from "node:fs";
import YAML from "yaml";

// -----------------------------------------------------
// Cache
// -----------------------------------------------------
const _intentsCache = new Map<string, any>();        // key: "core"
const _structuresCache = new Map<string, any>();     // key: structureId

// -----------------------------------------------------
// FS helpers
// -----------------------------------------------------
const ROOT = process.cwd();

function intentsPath(): string {
  return resolve(ROOT, "src", "intents", "intents-core.yaml");
}

// Trova il file della struttura provando più percorsi noti
async function findStructurePath(structureId: string): Promise<string> {
  const candidates = [
    resolve(ROOT, "src", "structures", `${structureId}.yaml`),
    resolve(ROOT, "src", "routes", "structures", "loaders", `${structureId}.yaml`),
    resolve(ROOT, "src", "structures", `${structureId}.yml`),
    resolve(ROOT, "src", "routes", "structures", "loaders", `${structureId}.yml`),
  ];
  for (const p of candidates) {
    try {
      await access(p, FS.F_OK);
      return p;
    } catch {}
  }
  throw new Error(`STRUCTURE_FILE_NOT_FOUND for ${structureId}\nTried:\n${candidates.join("\n")}`);
}

async function loadYaml(path: string) {
  const raw = await readFile(path, "utf8");
  return YAML.parse(raw);
}

async function getIntents(): Promise<Record<string, any>> {
  if (_intentsCache.has("core")) return _intentsCache.get("core");
  try {
    const parsed = await loadYaml(intentsPath());
    // normalizza in mappa { id: {..., id} }
    const map: Record<string, any> = {};
    for (const [id, def] of Object.entries(parsed || {})) {
      map[id] = { id, ...(def as object) };
    }
    _intentsCache.set("core", map);
    return map;
  } catch (e: any) {
    throw new Error(`INTENTS_LOAD_FAILED: ${intentsPath()} → ${e?.message || e}`);
  }
}

async function getStructure(structureId: string) {
  if (_structuresCache.has(structureId)) return _structuresCache.get(structureId);
  const p = await findStructurePath(structureId);
  const parsed = await loadYaml(p);
  _structuresCache.set(structureId, parsed);
  return parsed;
}

// -----------------------------------------------------
// NLP mini-helpers (scoring + rendering)
// -----------------------------------------------------
const norm = (s = "") => s.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");

// score con synonyms/keywords/patterns/negative
function scoreIntent(userText: string, intent: any): number {
  const t = norm(userText);
  let score = intent.priority ?? 0;

  const bags = [intent.synonyms_it, intent.synonyms_en, intent.keywords_it, intent.keywords_en];
  for (const bag of bags) {
    if (Array.isArray(bag)) {
      for (const k of bag) {
        if (k && t.includes(norm(k))) score += 5;
      }
    }
  }

  if (Array.isArray(intent.patterns)) {
    for (const p of intent.patterns) {
      try {
        if (new RegExp(p, "i").test(userText)) score += 10;
      } catch {
        /* ignore bad regex */
      }
    }
  }

  if (Array.isArray(intent.negative)) {
    for (const n of intent.negative) {
      if (n && t.includes(norm(n))) score -= 12;
    }
  }

  return score;
}

function resolveIntent(userText: string, intentsCore: Record<string, any>) {
  const intents = Object.entries(intentsCore || {}).map(([key, def]: any) => ({
    key,
    def: { id: key, ...(def || {}) },
    score: scoreIntent(userText, def || {}),
  }));
  intents.sort((a, b) => b.score - a.score);
  const top = intents[0] || { key: "fallback", def: {}, score: 0 };
  const second = intents[1];
  const ambiguous = !!(second && Math.abs((top.score ?? 0) - (second.score ?? 0)) < 8);
  return { top, ambiguous, candidates: intents.slice(0, 3) };
}

// render semplice: {{content.x.y}} / {{meta.default_locale}} ecc.
function renderFromYaml(structureYaml: any, intentKey: string, lang: "it" | "en", mode: "short" | "long") {
  const node = structureYaml?.responses?.[intentKey];
  if (!node) return { text: "", buttons: [] as any[] };

  const tpl =
    node?.[mode]?.[lang] ??
    node?.short?.[lang] ??
    "";

  const text = String(tpl || "").replace(/\{\{\s*([^#][^}]*)\s*\}\}/g, (_m, pathRaw) => {
    const path = String(pathRaw).trim();
    const val = path.split(".").reduce((acc: any, k: string) => (acc ? acc[k] : undefined), structureYaml);
    return val == null ? "" : String(val);
  });

  const rawButtons = node?.buttons?.[lang] ?? [];
  const buttons = Array.isArray(rawButtons)
    ? rawButtons.map((b: any) => ({
        label: String(b?.label ?? ""),
        action: String(b?.action ?? ""),
      }))
    : [];

  return { text, buttons };
}

function fallbackText(structureYaml: any, intentKey: string, lang: "it" | "en") {
  return (
    structureYaml?.responses?.[intentKey]?.fallback?.[lang] ??
    structureYaml?.responses?.fallback?.[lang] ??
    (lang === "en"
      ? "Sorry, I didn't understand. Could you rephrase?"
      : "Mi dispiace, non ho capito la richiesta.")
  );
}

// trova risposta usando l'intents-core refined
function findResponse(intentsCore: any, structureYaml: any, message: string) {
  const { top } = resolveIntent(message, intentsCore);
  const lang: "it" | "en" = "it"; // semplice: default it
  const defaultMode: "short" | "long" =
    (intentsCore?.[top.key]?.output?.default === "long" ? "long" : "short");

  const { text, buttons } = renderFromYaml(structureYaml, top.key, lang, defaultMode);
  if (text) return { intent: top.key, text, buttons };

  return { intent: top.key, text: fallbackText(structureYaml, top.key, lang), buttons: [] as any[] };
}

async function runEngine({ structureId, message }: { structureId: string; message: string }) {
  const intentsCore = await getIntents();
  const structureYaml = await getStructure(structureId);
  const resp = findResponse(intentsCore, structureYaml, message);

  return {
    intent: resp.intent,
    lang: "it",
    meta: {
      mode: "short",
      uiButtons: resp.buttons || [],
    },
    text: resp.text || "Mi dispiace, non ho trovato una risposta.",
  };
}

// -----------------------------------------------------
// Fastify plugin
// -----------------------------------------------------
const chatRoutes: FastifyPluginAsync = async (app: FastifyInstance) => {
  // Endpoint diagnostico
  app.get("/_debug/chat/:structureId", async (req, reply) => {
    try {
      const { structureId } = req.params as { structureId: string };
      const intentsCore = await getIntents();
      const structureYaml = await getStructure(structureId);
      return reply.send({
        ok: true,
        hasIntents: !!intentsCore && Object.keys(intentsCore).length > 0,
        hasResponses: !!structureYaml?.responses,
        sampleIntents: Object.keys(intentsCore || {}).slice(0, 5),
        sampleResponses: Object.keys(structureYaml?.responses || {}).slice(0, 5),
      });
    } catch (err: any) {
      const msg = err?.message || "Errore inatteso";
      return reply.code(500).send({ ok: false, error: msg, reply: msg });
    }
  });

  // Retrocompat: POST /chat → svapartments
  app.post("/chat", async (req, reply) => {
    try {
      const body = (req.body as any) || {};
      const message = String(body?.message ?? "").trim();
      if (!message) return reply.code(400).send({ ok: false, error: "Missing message", reply: "Missing message" });

      const out = await runEngine({ structureId: "svapartments", message });
      return reply.code(200).send({
        ok: true,
        intent: out.intent,
        lang: out.lang,
        mode: out.meta?.mode ?? "short",
        text: out.text,
        reply: out.text, // alias per il widget
        ui: { buttons: out.meta?.uiButtons ?? [] },
      });
    } catch (err: any) {
      const msg = err?.message || "Errore inatteso";
      return reply.code(500).send({ ok: false, error: msg, reply: msg });
    }
  });

  // Multistruttura: POST /chat/:structureId
  app.post("/chat/:structureId", async (req, reply) => {
    try {
      const { structureId } = req.params as { structureId: string };
      const body = (req.body as any) || {};
      const message = String(body?.message ?? "").trim();
      if (!message) return reply.code(400).send({ ok: false, error: "Missing message", reply: "Missing message" });

      const out = await runEngine({ structureId, message });
      return reply.code(200).send({
        ok: true,
        intent: out.intent,
        lang: out.lang,
        mode: out.meta?.mode ?? "short",
        text: out.text,
        reply: out.text, // alias per il widget
        ui: { buttons: out.meta?.uiButtons ?? [] },
      });
    } catch (err: any) {
      const msg = err?.message || "Errore inatteso";
      return reply.code(500).send({ ok: false, error: msg, reply: msg });
    }
  });
};

// esporti entrambi i modi (default + named) per compatibilità con l'import
export { chatRoutes };
export default chatRoutes;
