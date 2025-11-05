import { FastifyPluginAsync } from "fastify";
import { resolve } from "node:path";
import { readFile } from "node:fs/promises";
import YAML from "yaml";

const chatRoutes: FastifyPluginAsync = async (app) => {
  const ROOT = process.cwd();
  const intentsPath = resolve(ROOT, "src", "intents", "intents-core.yaml");

  const _intentsCache = new Map<string, any>();
  const _structuresCache = new Map<string, any>();

  async function loadYaml(path: string) {
    const raw = await readFile(path, "utf8");
    return YAML.parse(raw);
  }

  async function getIntents() {
    if (_intentsCache.has("core")) return _intentsCache.get("core");
    const parsed = await loadYaml(intentsPath);
    _intentsCache.set("core", parsed);
    return parsed;
  }

  async function findStructurePath(structureId: string): Promise<string> {
    const candidates = [
      resolve(ROOT, "src", "structures", `${structureId}.yaml`),
      resolve(ROOT, "src", "routes", "structures", "loaders", `${structureId}.yaml`),
      resolve(ROOT, "src", "structures", `${structureId}.yml`),
      resolve(ROOT, "src", "routes", "structures", "loaders", `${structureId}.yml`),
    ];
    for (const p of candidates) {
      try {
        await readFile(p, "utf8");
        return p;
      } catch {}
    }
    throw new Error(`STRUCTURE_FILE_NOT_FOUND for ${structureId}`);
  }

  async function getStructure(structureId: string) {
    if (_structuresCache.has(structureId)) return _structuresCache.get(structureId);
    const p = await findStructurePath(structureId);
    const parsed = await loadYaml(p);
    _structuresCache.set(structureId, parsed);
    return parsed;
  }

  function findResponse(intentsCore: any, structureYaml: any, message: string) {
    const text = message.toLowerCase();
    const responses = structureYaml?.responses || {};
    const intents = intentsCore || {};

    for (const [intent, intentData] of Object.entries(intents)) {
      const match = (intentData as any)?.match || [];
      const hasMatch = match.some((m: string) => text.includes(m.toLowerCase()));
      if (hasMatch && responses[intent]) {
        return { intent, ...responses[intent] };
      }
    }

    // fallback generico
    return { intent: "fallback", text: "Mi dispiace, non ho capito la richiesta." };
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
        uiButtons: resp?.buttons || [],
      },
      text: resp?.short?.it || resp?.text || "Mi dispiace, non ho trovato una risposta.",
    };
  }

  // ----------------------------------------
  // ROUTES
  // ----------------------------------------

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
      return reply.code(500).send({
        ok: false,
        error: err?.message || "Errore inatteso",
        reply: err?.message || "Errore inatteso",
      });
    }
  });

  // POST /chat (default -> svapartments)
  app.post("/chat", async (req, reply) => {
    try {
      const body = req.body as { message: string };
      const out = await runEngine({ structureId: "svapartments", message: body.message });

      return reply.code(200).send({
        ok: true,
        intent: out.intent,
        lang: out.lang,
        mode: out.meta?.mode ?? "short",
        text: out.text,
        reply: out.text, // alias richiesto dal widget
        ui: { buttons: out.meta?.uiButtons ?? [] },
      });
    } catch (err: any) {
      return reply.code(500).send({
        ok: false,
        error: err?.message || "Errore inatteso",
        reply: err?.message || "Errore inatteso",
      });
    }
  });

  // POST /chat/:structureId
  app.post("/chat/:structureId", async (req, reply) => {
    try {
      const { structureId } = req.params as { structureId: string };
      const body = req.body as { message: string };
      const out = await runEngine({ structureId, message: body.message });

      return reply.code(200).send({
        ok: true,
        intent: out.intent,
        lang: out.lang,
        mode: out.meta?.mode ?? "short",
        text: out.text,
        reply: out.text, // alias richiesto dal widget
        ui: { buttons: out.meta?.uiButtons ?? [] },
      });
    } catch (err: any) {
      return reply.code(500).send({
        ok: false,
        error: err?.message || "Errore inatteso",
        reply: err?.message || "Errore inatteso",
      });
    }
  });
};
export { chatRoutes };   
export default chatRoutes;
