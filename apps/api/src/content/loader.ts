// Loader YAML robusto (dev: src/, prod: dist/)
// - cerca gli asset sia accanto al file corrente (src|dist) sia nelle cartelle fallback
// - normalizza il core (accetta {intents:{...}} o flat)
// - messaggi d’errore espliciti con path assoluti

import { readFile, stat, access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import YAML from "yaml";

type AnyObj = Record<string, any>;
type CacheEntry = { mtimeMs: number; data: AnyObj };

const __filename = fileURLToPath(import.meta.url);
const CURRENT_DIR = path.dirname(__filename);          // .../src/content  | .../dist/content
const APP_DIR = path.resolve(CURRENT_DIR, "..");       // .../src          | .../dist
const PKG_DIR = path.resolve(APP_DIR, "..");           // .../apps/api
const SRC_DIR = path.resolve(PKG_DIR, "src");          // .../apps/api/src
const DIST_DIR = path.resolve(PKG_DIR, "dist");        // .../apps/api/dist

// --- CANDIDATI: intents core
const INTENTS_CANDIDATES = [
  path.resolve(APP_DIR, "intents", "intents-core.yaml"), // preferisci path “accanto” (src|dist)
  path.resolve(DIST_DIR, "intents", "intents-core.yaml"),
  path.resolve(SRC_DIR, "intents", "intents-core.yaml"),
];

// --- CANDIDATI: structures (supporta sia loaders/ che la cartella “piana”)
const STRUCTURE_DIRS = [
  path.resolve(APP_DIR, "routes", "structures", "loaders"),
  path.resolve(APP_DIR, "routes", "structures"),
  path.resolve(DIST_DIR, "routes", "structures", "loaders"),
  path.resolve(DIST_DIR, "routes", "structures"),
  path.resolve(SRC_DIR, "routes", "structures", "loaders"),
  path.resolve(SRC_DIR, "routes", "structures"),
];

// cache semplice su mtime
const cache = new Map<string, CacheEntry>();

async function firstExisting(paths: string[]): Promise<string | null> {
  for (const p of paths) {
    try { await access(p); return p; } catch {}
  }
  return null;
}

async function loadYaml(filePath: string): Promise<AnyObj> {
  try {
    const st = await stat(filePath);
    const cached = cache.get(filePath);
    if (cached && cached.mtimeMs === st.mtimeMs) return cached.data;

    const content = await readFile(filePath, "utf-8");
    const data = YAML.parse(content) as AnyObj;
    cache.set(filePath, { mtimeMs: st.mtimeMs, data });
    return data;
  } catch (err: any) {
    err.message = `Failed to read/parse YAML at ${filePath}: ${err.message}`;
    throw err;
  }
}

export async function loadIntentsCore(): Promise<AnyObj> {
  const filePath = await firstExisting(INTENTS_CANDIDATES);
  if (!filePath) {
    throw new Error(
      "Intents core not found. Looked in:\n" +
      INTENTS_CANDIDATES.map(p => ` - ${p}`).join("\n")
    );
  }
  const raw = await loadYaml(filePath);
  // normalizza: accetta {intents:{...}} o flat
  const core = raw && typeof raw === "object" && raw.intents && typeof raw.intents === "object"
    ? raw.intents
    : raw;
  if (!core || typeof core !== "object") {
    throw new Error(`Invalid intents core shape at ${filePath}`);
  }
  return core;
}

async function resolveStructurePath(structureId: string): Promise<string> {
  const candidates = STRUCTURE_DIRS.map(dir => path.resolve(dir, `${structureId}.yaml`));
  const filePath = await firstExisting(candidates);
  if (!filePath) {
    throw new Error(
      `Structure file not found for id "${structureId}". Looked in:\n` +
      candidates.map(p => ` - ${p}`).join("\n")
    );
  }
  return filePath;
}

export async function loadStructure(structureId: string): Promise<AnyObj> {
  const filePath = await resolveStructurePath(structureId);
  const raw = await loadYaml(filePath);
  if (!raw || typeof raw !== "object" || !raw.intents || typeof raw.intents !== "object") {
    throw new Error(`Invalid structure shape at ${filePath} (missing "intents")`);
  }
  return raw;
}

export function clearYamlCache() {
  cache.clear();
}
