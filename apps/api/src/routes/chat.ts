import { FastifyInstance } from "fastify";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import YAML from "yaml";
import { run as runEngine, type Lang } from "../engine/index.js";
import { access } from "node:fs/promises";
import { constants as FS } from "node:fs";
// cache semplice
let _intentsCore: Record<string, any> | null = null;
const _structures = new Map<string, any>();

function intentsPath() {
  return resolve(process.cwd(), "src", "intents", "intents-core.yaml");
}
function structurePath(structureId: string) {
  return resolve(process.cwd(), "src", "structures", `${structureId}.yaml`);
}
async function loadYaml(filePath: string) {
  const raw = await readFile(filePath, "utf8");
  return YAML.parse(raw);
}

async function getIntents() {
  if (_intentsCore) return _intentsCore;
  try {
    const parsed = await loadYaml(intentsPath());
    const map: Record<string, any> = {};
    for (const [id, def] of Object.entries(parsed || {})) map[id] = { id, ...(def as object) };
    _intentsCore = map;
    return map;
  } catch (e: any) {
    throw new Error(`INTENTS_LOAD_FAILED: ${intentsPath()} → ${e?.message || e}`);
  }
}
async function findStructurePath(structureId: string): Promise<string> {
  const candidates = [
    // standard proposto
    resolve(process.cwd(), "src", "structures", `${structureId}.yaml`),

    // tuo path attuale
    resolve(process.cwd(), "src", "routes", "structures", "loaders", `${structureId}.yaml`),

    // variante .yml (per sicurezza)
    resolve(process.cwd(), "src", "structures", `${structureId}.yml`),
    resolve(process.cwd(), "src", "routes", "structures", "loaders", `${structureId}.yml`),
  ];

  for (const p of candidates) {
    try {
      await access(p, FS.F_OK);
      return p;
    } catch {}
  }
  throw new Error(`STRUCTURE_FILE_NOT_FOUND for ${structureId} in candidates:\n${candidates.join("\n")}`);
}
async function getStructure(structureId: string) {
  if (_structures.has(structureId)) return _structures.get(structureId);
  const p = await findStructurePath(structureId);
  const parsed = await loadYaml(p);
  _structures.set(structureId, parsed);
  return parsed;
}

function normalizeLang(input?: string | null): Lang {
  const s = String(input || "").toLowerCase();
  if (s.startsWith("en")) return "en";
  return "it";
}

export async function chatRoutes(app: FastifyInstance) {
  app.get("/_debug/chat/:structureId", async (req, reply) => {
  try {
    const { structureId } = req.params as { structureId: string };
    const [intentsCore, structureYaml] = await Promise.all([
      getIntents(),
      getStructure(structureId),
    ]);
    return reply.send({
      ok: true,
      hasIntents: !!intentsCore && Object.keys(intentsCore).length > 0,
      hasResponses: !!structureYaml?.responses,
      sampleIntents: Object.keys(intentsCore).slice(0, 5),
      sampleResponses: Object.keys(structureYaml?.responses || {}).slice(0, 5),
    });
  } catch (e: any) {
    return reply.code(500).send({ ok: false, error: String(e?.message || e) });
  }
});

  // retrocompat
  app.post("/chat", async (req, reply) => {
    (req.params as any) = { structureId: "svapartments" };
    return (app as any).routing.find(
      (r: any) => r.method === "POST" && r.opts?.url === "/chat/:structureId"
    ).handler(req, reply);
  });

  app.post("/chat/:structureId", async (req, reply) => {
    try {
      const { structureId } = req.params as { structureId: string };
      const body = (req.body as any) || {};
      const message = String(body?.message ?? "").trim();
      const langRaw = (body?.lang ?? req.headers["accept-language"] ?? "") as string;

      if (!message) {
        return reply.code(400).send({ ok: false, error: "Missing message" });
      }

      const [intentsCore, structureYaml] = await Promise.all([
        getIntents(),
        getStructure(structureId).catch(async () => {
          if (structureId !== "svapartments") return getStructure("svapartments");
          throw new Error("Structure YAML not found");
        }),
      ]);

      const out = await runEngine({
        message,
        lang: normalizeLang(langRaw),
        structureYaml,
        intentsCore,
        structureId,
      });

      return reply.code(200).send({
        ok: true,
        intent: out.intent,
        lang: out.lang,
        mode: out.meta?.mode ?? "short",
        text: out.text,
        ui: { buttons: out.meta?.uiButtons ?? [] },
        // debug opzionale:
        // candidates: out.meta?.candidates ?? []
      });
    } catch (err: any) {
  const msg = String(err?.message || err || "Unknown error");
  req.log?.error?.({ err, msg }, "chat handler error");

  const isDev = process.env.NODE_ENV !== "production";
  const detail = isDev ? msg : "Errore inatteso";
  return reply.code(500).send({ ok: false, error: detail });
}
  });
}
