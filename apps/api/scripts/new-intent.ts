// @ts-nocheck
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import YAML from "yaml";

const ROOT = process.cwd();
const CORE = path.join(ROOT, "src", "intents", "intents-core.yaml");
const STRUCT_DIR = path.join(ROOT, "src", "routes", "structures", "loaders");

function parseArgs(argv: string[]) {
  const args = [...argv];
  const name = args.find((a) => !a.startsWith("-"));
  const sIdx = args.indexOf("--structure");
  const pIdx = args.indexOf("--priority");

  const structure = sIdx >= 0 ? args[sIdx + 1] : "svapartments";
  const priority = pIdx >= 0 ? Number(args[pIdx + 1]) : 100;

  return { name, structure, priority };
}

function isValidSlug(s: string) {
  return /^[a-z0-9_-]+$/.test(s);
}

function ensureDocIntents(obj: any) {
  if (!obj || typeof obj !== "object") return { intents: {} };
  if (!obj.intents || typeof obj.intents !== "object") obj.intents = {};
  return obj;
}

function coreIntentStub(slug: string, priority: number) {
  return {
    id: slug,
    priority,
    synonyms: [],
    keywords: [],
    patterns: [],
    negative: [],
    output: {
      default: "",
      short: "",
      long: "",
      ui: { buttons: [] },
    },
  };
}

function structureIntentStub() {
  return {
    output: {
      short: "",
      long: "",
      ui: { buttons: [] },
    },
  };
}

async function loadYaml(file: string) {
  try {
    const raw = await readFile(file, "utf8");
    return YAML.parse(raw) ?? {};
  } catch {
    return {};
  }
}

async function saveYaml(file: string, obj: any) {
  const text = YAML.stringify(obj);
  await writeFile(file, text, "utf8");
}

async function main() {
  const argv = process.argv.slice(2);
  const { name, structure, priority } = parseArgs(argv);

  if (!name) {
    console.error("Usage: pnpm new:intent <slug> [--structure <id>]");
    process.exit(1);
  }
  if (!isValidSlug(name)) {
    console.error('Errore: lo slug deve rispettare /^[a-z0-9_-]+$/. Es: "late_checkout".');
    process.exit(1);
  }

  // 1) intents-core.yaml
  const core = ensureDocIntents(await loadYaml(CORE));
  if (!core.intents[name]) {
    core.intents[name] = coreIntentStub(name, priority);
    await saveYaml(CORE, core);
    console.log(`✓ Aggiornato intents-core.yaml → intents.${name} (priority: ${priority})`);
  } else {
    console.error(`Intents core: "${name}" esiste già.`);
  }

  // 2) struttura
  const structFile = path.join(STRUCT_DIR, `${structure}.yaml`);
  const structDoc = ensureDocIntents(await loadYaml(structFile));
  if (structDoc.intents[name]) {
    console.error(`Struttura ${structure}: "${name}" esiste già.`);
  } else {
    // meta minimo se assente
    structDoc.meta = structDoc.meta ?? { id: structure, lang: "it", version: 1 };
    structDoc.intents[name] = structureIntentStub();
    await saveYaml(structFile, structDoc);
    console.log(`✓ Aggiornato ${structure}.yaml → intents.${name}`);
  }

  console.log("Fatto. Ricordati di compilare i testi (default/short/long) e i buttons se servono.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
