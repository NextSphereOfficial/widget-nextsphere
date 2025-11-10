// apps/api/src/content/loader.ts
import { readFile, stat, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import YAML from 'yaml';

type AnyObj = Record<string, any>;

type CacheEntry = {
  mtimeMs: number;
  data: AnyObj;
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Base: .../apps/api/src
const SRC_DIR = path.resolve(__dirname, '..');

// Percorsi assoluti
const INTENTS_PATH = path.resolve(SRC_DIR, 'intents', 'intents-core.yaml');

// Supporta entrambe le collocazioni della struttura:
// 1) .../routes/structures/loaders/<id>.yaml   (attuale)
// 2) .../routes/structures/<id>.yaml           (fallback)
const STRUCTURE_DIRS = [
  path.resolve(SRC_DIR, 'routes', 'structures', 'loaders'),
  path.resolve(SRC_DIR, 'routes', 'structures'),
];

// Cache semplice: path -> { mtimeMs, data }
const cache: Map<string, CacheEntry> = new Map();

async function loadYaml(filePath: string): Promise<AnyObj> {
  const st = await stat(filePath);
  const cached = cache.get(filePath);
  if (cached && cached.mtimeMs === st.mtimeMs) {
    return cached.data;
  }
  const content = await readFile(filePath, 'utf-8');
  const data = YAML.parse(content) as AnyObj;
  cache.set(filePath, { mtimeMs: st.mtimeMs, data });
  return data;
}

async function tryResolveStructurePath(structureId: string): Promise<string | null> {
  for (const dir of STRUCTURE_DIRS) {
    const candidate = path.resolve(dir, `${structureId}.yaml`);
    try {
      await access(candidate);
      return candidate;
    } catch {
      // prova prossimo
    }
  }
  return null;
}

export async function loadIntentsCore(): Promise<AnyObj> {
  try {
    const raw = await loadYaml(INTENTS_PATH);
    // 🔧 Normalizza: accetta sia {intents:{...}} sia root flat
    const core = (raw && typeof raw === 'object' && raw.intents && typeof raw.intents === 'object')
      ? raw.intents
      : raw;
    if (!core || typeof core !== 'object') {
      throw new Error(`Invalid intents core shape at ${INTENTS_PATH}`);
    }
    return core;
  } catch (err: any) {
    err.message = `Failed to read/parse intents core at ${INTENTS_PATH}: ${err.message}`;
    throw err;
  }
}

export async function loadStructure(structureId: string): Promise<AnyObj> {
  const filePath = await tryResolveStructurePath(structureId);
  if (!filePath) {
    throw new Error(
      `Structure file not found for id "${structureId}". Looked in:\n` +
      STRUCTURE_DIRS.map(d => ` - ${d}\\${structureId}.yaml`).join('\n')
    );
  }
  try {
    const raw = await loadYaml(filePath);
    // Le structure devono avere { meta, intents }
    if (!raw || typeof raw !== 'object' || !raw.intents || typeof raw.intents !== 'object') {
      throw new Error(`Invalid structure shape at ${filePath} (missing "intents")`);
    }
    return raw;
  } catch (err: any) {
    err.message = `Failed to read/parse YAML at ${filePath}: ${err.message}`;
    throw err;
  }
}

// Facoltativo: per test/admin
export function clearYamlCache() {
  cache.clear();
}