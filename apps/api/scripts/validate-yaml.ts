// ESM-friendly, eseguibile con tsx
import { readFile, readdir } from "node:fs/promises";
import type { Dirent } from "node:fs";
import path from "node:path";
import YAML from "yaml";
import { fileURLToPath } from "node:url";

// --- AJV ESM/CJS INTEROP SHIM (compatibile con moduleResolution: Node16) ---
import AjvImport from "ajv";
import addFormatsImport from "ajv-formats";

type AjvCtor = new (opts?: any) => {
  compile: (schema: any) => (data: unknown) => boolean;
};



const Ajv = ((AjvImport as any).default ?? AjvImport) as AjvCtor;
const addFormats = ((addFormatsImport as any).default ?? addFormatsImport) as (ajv: any) => void;
// ---------------------------------------------------------------------------
type SchemaLike = Record<string, unknown>;
type ErrorLike = { instancePath?: string; message?: string; params?: unknown };
type ValidateFn = ((data: unknown) => boolean) & { errors?: ErrorLike[] };

// (il resto dei tuoi import/typen alias può restare uguale)
type AnyObj = Record<string, unknown>;

const __dirname = path.dirname(fileURLToPath(import.meta.url)); // .../apps/api/scripts
const ROOT = path.resolve(__dirname, "..");                      // .../apps/api

const INTENTS_CORE_PATH = path.join(ROOT, "src", "intents", "intents-core.yaml");
const STRUCTURES_DIR = path.join(ROOT, "src", "routes", "structures", "loaders");
const SCHEMAS_DIR = path.join(ROOT, "src", "schemas");
const ajv = new Ajv({ allErrors: true, strict: false }) as unknown;
(addFormats as unknown as (a: unknown) => void)(ajv);


async function readJsonSchema(file: string) {
  const raw = await readFile(path.join(SCHEMAS_DIR, file), "utf8");
  return JSON.parse(raw);
}

async function parseYaml(filePath: string): Promise<AnyObj> {
  const text = await readFile(filePath, "utf8");
  return YAML.parse(text) ?? {};
}

async function listYamlFiles(dir: string) {
  const files = (await readdir(dir, { withFileTypes: true })) as any[];
  return files
    .filter((d: any) => d.isFile())
    .map((d: any) => d.name)
    .filter((name: string) => name.toLowerCase().endsWith(".yaml"))
    .filter((name: string) => !name.toLowerCase().includes("backup"))   // <-- escludi backup
    .map((name: string) => path.join(dir, name));
}

function reportAjvErrors(errors: ErrorLike[] | null | undefined) {
  if (!errors?.length) return "-";
  return errors
    .map((e) => {
      const loc = e.instancePath || "/";
      const msg = e.message || "validation error";
      const extra = e.params ? ` (${JSON.stringify(e.params)})` : "";
      return `• ${loc}: ${msg}${extra}`;
    })
    .join("\n");
}



async function validateOne(
  ajv: { compile: (schema: SchemaLike) => ValidateFn },
  schema: SchemaLike,
  targetPath: string,
  kind: "intents-core" | "structure"
) {
  const data = await parseYaml(targetPath);
  const validate = ajv.compile(schema);
  const ok = validate(data);

  if (ok) {
    console.log(`✔ OK [${kind}] ${path.relative(ROOT, targetPath)}`);
    return true;
  } else {
    console.error(`✖ FAIL [${kind}] ${path.relative(ROOT, targetPath)}`);
    console.error(reportAjvErrors(validate.errors));
    return false;
  }
}



async function main() {
  const ajv = new Ajv({ allErrors: true, strict: false });
  addFormats(ajv);

  const intentsSchema = await readJsonSchema("intent-core.schema.json");
  const structureSchema = await readJsonSchema("structure.schema.json");

  let success = true;

  // 1) valida intents-core.yaml
  success &&= await validateOne(ajv, intentsSchema, INTENTS_CORE_PATH, "intents-core");

  // 2) valida tutte le structure .yaml
  const structureFiles = await listYamlFiles(STRUCTURES_DIR);
  if (!structureFiles.length) {
    console.warn(`(i) Nessun file struttura trovato in ${path.relative(ROOT, STRUCTURES_DIR)}`);
  }
  for (const file of structureFiles) {
    const ok = await validateOne(ajv, structureSchema, file, "structure");
    success &&= ok;
  }

  if (!success) {
    process.exitCode = 1;
  } else {
    console.log("✓✓ Tutti i file YAML sono validi.");
  }
}

main().catch((err) => {
  console.error("Errore nello script di validazione:", err);
  process.exitCode = 1;
});
