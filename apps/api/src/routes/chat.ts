import { FastifyInstance } from 'fastify';

// Local (NodeNext: usa .js)
import { run as runEngine } from '../engine/index.js';
import { RESPONSE_CONFIG } from '../config/response.js';
import type { Lang, StructureYaml, IntentsMap } from '../engine/types.js';

// Built-in + YAML
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import YAML from 'yaml';

/**
 * Helpers YAML inline con cache — nessuna folder nuova.
 * process.cwd() con "pnpm -C apps/api dev" punta a <repo>/apps/api
 */
let _intentsCoreCache: IntentsMap | null = null;
const _structuresCache = new Map<string, StructureYaml>();

async function loadStructureYaml(structureId: string): Promise<StructureYaml> {
  const cached = _structuresCache.get(structureId);
  if (cached) return cached;

  // ⬇️ Path aggiornato come richiesto:
  // apps/api/src/routes/structures/loaders/<structureId>.yaml
  const filePath = resolve(
    process.cwd(),
    'src',
    'routes',
    'structures',
    'loaders',
    `${structureId}.yaml`
  );

  const raw = await readFile(filePath, 'utf-8');
  const data = YAML.parse(raw) as StructureYaml;

  _structuresCache.set(structureId, data);
  return data;
}

async function loadIntentsCore(): Promise<IntentsMap> {
  if (_intentsCoreCache) return _intentsCoreCache;

  // Intents core: lascia questo path se il file è in apps/api/src/intents/intents-core.yaml
  const corePath = resolve(process.cwd(), 'src', 'intents', 'intents-core.yaml');
  const raw = await readFile(corePath, 'utf-8');
  const parsed = YAML.parse(raw) as Record<string, any>;

  const intents: IntentsMap = {};
  for (const [id, def] of Object.entries(parsed)) {
    intents[id] = { id, ...(def as object) } as any;
  }
  _intentsCoreCache = intents;
  return intents;
}

// (opzionale) invalidazione cache per hot-reload
function invalidateYamlCache(structureId?: string) {
  if (structureId) _structuresCache.delete(structureId);
  else _structuresCache.clear();
  _intentsCoreCache = null;
}

// Normalizza lang esterna (schema ammette 'it','en','fr','de' ma l'engine usa 'it'|'en')
function normalizeLang(l?: string | null): Lang | null {
  if (!l) return null;
  const v = l.toLowerCase();
  if (v === 'it' || v === 'en') return v;
  // fallback: per ora mappiamo fr/de → en
  if (v === 'fr' || v === 'de') return 'en';
  return null;
}

export async function chatRoutes(app: FastifyInstance) {

  /**
   * BACK-COMPAT: /chat → usa structureId da query (?structure=...) o body.hotel, default "svapartments"
   * Manteniamo il tuo schema di risposta: { reply: string }
   */
  app.post('/chat', {
    config: { rateLimit: { max: 10, timeWindow: 10_000 } },
    schema: {
      body: {
        type: 'object',
        required: ['message'],
        additionalProperties: false,
        properties: {
          message: { type: 'string', minLength: 1, maxLength: 1000 },
          room: { type: 'string', nullable: true },
          hotel: { type: 'string', nullable: true },     // per retrocompat
          lang: { type: 'string', enum: ['it','en','fr','de'], nullable: true }
        }
      },
      response: {
        200: {
          type: 'object',
          additionalProperties: false,
          properties: { reply: { type: 'string' } }
        }
      }
    }
  }, async (req, reply) => {
    const { message, room = null, lang: langRaw = null, hotel = null } = req.body as {
      message: string; room?: string | null; lang?: string | null; hotel?: string | null;
    };

    // Prende structure da querystring (?structure=...) o body.hotel, altrimenti default
    const qs = (req.query ?? {}) as Record<string, string>;
    const structureId = (qs['structure'] || hotel || 'svapartments').toString();

    try {
      const structureYaml = await loadStructureYaml(structureId);
      const intentsCore = await loadIntentsCore();

      const out = await runEngine({
        message,
        structureId,
        room: room ?? null,
        lang: normalizeLang(langRaw),
        structureYaml,
        intentsCore,
        config: RESPONSE_CONFIG
      });

      // Manteniamo il contratto esistente di questa route: { reply: string }
      return reply.code(200).send({ reply: out.text });
    } catch (err: any) {
      req.log.error({ err }, 'chat (back-compat) handler error');
      return reply.code(500).send({ reply: 'Si è verificato un errore inatteso.' });
    }
  });

  /**
   * NUOVA ROUTE: /chat/:structureId — multistruttura esplicita
   * Stesso schema di risposta minimale { reply: string } per compatibilità con il widget.
   */
  app.post<{
    Params: { structureId: string };
    Body: { message: string; room?: string | null; lang?: string | null };
  }>('/chat/:structureId', {
    config: { rateLimit: { max: 10, timeWindow: 10_000 } },
    schema: {
      params: {
        type: 'object',
        required: ['structureId'],
        properties: { structureId: { type: 'string', minLength: 1 } }
      },
      body: {
        type: 'object',
        required: ['message'],
        additionalProperties: false,
        properties: {
          message: { type: 'string', minLength: 1, maxLength: 1000 },
          room: { type: 'string', nullable: true },
          lang: { type: 'string', enum: ['it','en','fr','de'], nullable: true }
        }
      },
      response: {
        200: {
          type: 'object',
          additionalProperties: false,
          properties: { reply: { type: 'string' } }
        }
      }
    }
  }, async (req, reply) => {
    const { structureId } = req.params;
    const { message, room = null, lang: langRaw = null } = req.body;

    try {
      const structureYaml = await loadStructureYaml(structureId);
      const intentsCore = await loadIntentsCore();

      const out = await runEngine({
        message,
        structureId,
        room: room ?? null,
        lang: normalizeLang(langRaw),
        structureYaml,
        intentsCore,
        config: RESPONSE_CONFIG
      });

      return reply.code(200).send({ reply: out.text });
    } catch (err: any) {
      req.log.error({ err }, 'chat (multistructure) handler error');
      return reply.code(500).send({ reply: 'Si è verificato un errore inatteso.' });
    }
  });
}

