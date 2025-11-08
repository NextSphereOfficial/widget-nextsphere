import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'yaml';

// Percorso stabile relativo a questo file
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

// Permetti override via ENV facoltativa (non obbligatoria)
const STRUCTURES_DIR_ENV = process.env.STRUCTURES_DIR;

// Candidati comuni (in ordine), più eventuale ENV
const CANDIDATE_DIRS = [
  STRUCTURES_DIR_ENV ? path.resolve(STRUCTURES_DIR_ENV) : null,
  path.resolve(__dirname, '../../structures'),            // apps/api/structures
  path.resolve(__dirname, '../../data/structures'),       // apps/api/data/structures
  path.resolve(process.cwd(), 'structures'),              // <cwd>/structures
  path.resolve(process.cwd())                             // <cwd> (file a radice)
].filter(Boolean) as string[];

export async function loadStructure(structureId: string): Promise<any> {
  const filename = `${structureId}.yaml`;

  for (const dir of CANDIDATE_DIRS) {
    const full = path.join(dir, filename);
    try {
      const buf = await fs.readFile(full, 'utf8');
      const obj = parse(buf);
      return obj ?? {};
    } catch (e: any) {
      // se ENOENT, prova prossimo candidato
      if (e?.code !== 'ENOENT') {
        // per ora silenzioso; volendo si può loggare in futuro
      }
    }
  }
  return {}; // fallback sicuro
}
