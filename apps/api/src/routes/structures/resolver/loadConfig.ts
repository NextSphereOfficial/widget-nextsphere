import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import YAML from "yaml";

// ESM default exports (NodeNext)
import AjvModule from "ajv";
import addFormatsModule from "ajv-formats";
const Ajv = AjvModule.default;
const addFormats = addFormatsModule.default;

import type { StructureConfig } from "../../../types/Structure.js";



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** Risolve un path relativo a questo file:
 *  - usa dist/... se esiste
 *  - fallback a src/... se non esiste
 */
function resolveAsset(relFromResolver: string) {
  const pDist = path.resolve(__dirname, relFromResolver);
  if (fs.existsSync(pDist)) return pDist;
  // fallback: sostituisci '/dist/' con '/src/'
  const pSrc = pDist.replace(`${path.sep}dist${path.sep}`, `${path.sep}src${path.sep}`);
  return pSrc;
}

const SCHEMA_PATH = resolveAsset("../schema/structure.schema.json");
const LOADERS_DIR = resolveAsset("../loaders");


const schema = JSON.parse(fs.readFileSync(SCHEMA_PATH, "utf8"));

const ajv = new Ajv({
  allErrors: true,
  strict: true,
  allowUnionTypes: true,
  strictSchema: false
});
addFormats(ajv);

// registra lo schema con il suo $id (o un fallback)
const schemaId = (schema && schema.$id) ? schema.$id : "structure.schema.json";
ajv.addSchema(schema as any, schemaId);
const validate = ajv.getSchema(schemaId)!;



type CacheEntry = { etag: string; mtimeMs: number; cfg: StructureConfig };
const cache = new Map<string, CacheEntry>();

function substituteEnv(raw: string): string {
  return raw.replace(/\$\{([A-Z0-9_]+)\}/g, (_, key) => {
    const v = process.env[key];
    return v != null ? v : `\${${key}}`;
  });
}

export function getAvailableStructures(): string[] {
  if (!fs.existsSync(LOADERS_DIR)) return [];
  return fs.readdirSync(LOADERS_DIR).filter(f => f.endsWith(".yaml")).map(f => path.basename(f, ".yaml"));
}

export function getStructurePath(structureId: string): string {
  const safe = structureId.toLowerCase().replace(/[^a-z0-9-]/g, "");
  return path.join(LOADERS_DIR, `${safe}.yaml`);
}

export function loadConfig(structureId: string): StructureConfig {
  const p = getStructurePath(structureId);
  if (!fs.existsSync(p)) throw new Error(`Structure "${structureId}" not found`);

  const stat = fs.statSync(p);
  const etag = `${stat.size}-${stat.mtimeMs}`;

  const hit = cache.get(p);
  if (hit && hit.etag === etag) return hit.cfg;

  const rawFile = fs.readFileSync(p, "utf8");
  const substituted = substituteEnv(rawFile);
  const parsed = YAML.parse(substituted);

  if (!validate(parsed)) {
    const errs = validate.errors?.map(e => `${e.instancePath || "/"} ${e.message}`).join("; ");
    throw new Error(`Invalid structure config: ${errs}`);
  }

  const cfg = parsed as StructureConfig;
  cache.set(p, { etag, mtimeMs: stat.mtimeMs, cfg });
  return cfg;
}
