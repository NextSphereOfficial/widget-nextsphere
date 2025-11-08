// apps/api/src/routes/chat.ts
import type { FastifyInstance, FastifyPluginAsync } from "fastify";
import { resolve } from "node:path";
import { readFile, access } from "node:fs/promises";
import { constants as FS } from "node:fs";
import YAML from "yaml";
import { orchestrateChat } from '../core/orchestrator.js';

// -----------------------------------------------------
// Cache
// -----------------------------------------------------
const _intentsCache = new Map<string, any>();        // key: "core"
const _structuresCache = new Map<string, any>();     // key: structureId

// -----------------------------------------------------
// FS helpers
function renderTemplate(tpl: string, data: any) {
  if (!tpl) return '';
  return String(tpl).replace(/{{\s*([\w\.]+)\s*}}/g, (_m, path) => {
    const val = path.split('.').reduce((acc: any, k: string) => (acc && acc[k] != null ? acc[k] : undefined), data);
    return (val ?? '').toString();
  });
}

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

// normalizza testo: minuscole, rimuovi accenti, togli punteggiatura,
// unifica trattini/spazi per far combaciare "wi-fi" == "wifi"
function norm(s: string) {
  return String(s || '')
    .toLowerCase()
    .normalize('NFD')                  // separa accenti
    .replace(/[\u0300-\u036f]/g, '')   // rimuove accenti
    .replace(/[_\-]+/g, ' ')           // trattini → spazio
    .replace(/[^\p{L}\p{N} ]+/gu, '')  // rimuove simboli/punteggi
    .replace(/\s+/g, ' ')              // spazi multipli → singolo
    .trim();
}

// verifica pattern semplice (array di stringhe o regex)
function matchAny(text: string, list?: any[]): boolean {
  if (!list || !Array.isArray(list) || list.length === 0) return false;

  const t = norm(text);
  const tCompact = t.replace(/\s+/g, ''); // "wi fi" -> "wifi"

  for (const item of list) {
    if (!item) continue;
    if (typeof item === 'string') {
      const i = norm(item);
      const iCompact = i.replace(/\s+/g, '');
      if (t.includes(i) || tCompact.includes(iCompact)) return true;
    } else if (item instanceof RegExp) {
      if (item.test(text)) return true; // regex lasciata “grezza” (se le usi)
    }
  }
  return false;
}


function scoreIntent(intent: any, text: string) {
  // punteggio base su synonyms/keywords/patterns
  let score = 0;
  let matched = false;

  const t = norm(text);

  const synonyms = intent?.synonyms || [];
  const keywords = intent?.keywords || [];
  const patterns = intent?.patterns || [];

  if (matchAny(t, synonyms)) { score += 10; matched = true; }
  if (matchAny(t, keywords)) { score += 6; matched = true; }
  if (matchAny(t, patterns)) { score += 8; matched = true; }

  // penalità su negative
  const negative = intent?.negative || [];
  if (negative && Array.isArray(negative) && negative.length > 0) {
    for (const n of negative) {
      if (n && t.includes(norm(n))) {
        score -= 12;
        // non settiamo matched=false: un hit negativo non invalida il fatto di aver avuto un match
      }
    }
  }

  // aggiungi la priorità solo se c'è stato almeno UN match positivo
  if (matched) score += (intent.priority ?? 0);

  return { score, matched };
}

function resolveIntent(userText: string, intentsCore: Record<string, any>) {
  const t = norm(userText);

  // scoring standard
  const intents = Object.entries(intentsCore || {}).map(([key, def]: any) => {
    const { score, matched } = scoreIntent(def, userText);
    return { key, score, matched };
  });

  // 🔧 Heuristic override per gli intent base (failsafe)
  // Wi-Fi
  if (/\bwi\s*fi\b/.test(t) || t.includes('wifi') || t.includes('password wifi') || t.includes('ssid')) {
    const idx = intents.findIndex(i => i.key === 'wifi');
    if (idx >= 0) intents[idx] = { key: 'wifi', score: 999, matched: true };
    else intents.push({ key: 'wifi', score: 999, matched: true });
  }
  // Late checkout
  if (t.includes('late checkout') || /posticip(a|o)\s*il?\s*checkout/.test(t) || /checkout\s*tardi/.test(t)) {
    const idx = intents.findIndex(i => i.key === 'late_checkout');
    if (idx >= 0) intents[idx] = { key: 'late_checkout', score: 999, matched: true };
    else intents.push({ key: 'late_checkout', score: 999, matched: true });
  }
  // Emergency
  if (t.includes('emergenz') || t.includes('ambulanza') || t.includes('polizia') || t.includes('carabinieri') || t.includes('vigili del fuoco') || t.includes('incendio')) {
    const idx = intents.findIndex(i => i.key === 'emergency');
    if (idx >= 0) intents[idx] = { key: 'emergency', score: 999, matched: true };
    else intents.push({ key: 'emergency', score: 999, matched: true });
  }

  intents.sort((a, b) => b.score - a.score);
  const top = intents[0] || { key: 'fallback', score: 0, matched: false };
  return { top, intents };
}


function renderFromYaml(structureYaml: any, intentKey: string, lang: "it" | "en", mode: "short" | "long") {
  const resp = structureYaml?.responses?.[intentKey];
  if (!resp) return { text: "", buttons: [] as any[] };

  // varianti
const variant = (mode === "long" ? (resp?.long?.[lang] ?? "") : (resp?.short?.[lang] ?? ""));
const raw = String(variant || "").trim();
// Interpola usando l'intero YAML struttura (così `{{content.wifi.ssid}}` funziona)
const text = renderTemplate(raw, structureYaml);


  const buttons = Array.isArray(resp?.buttons) ? resp.buttons : [];
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
const lang: "it" | "en" = "it";
const defaultMode: "short" | "long" =
  (intentsCore?.[top.key]?.output?.default === "long" ? "long" : "short");
// Se nessun intent ha matchato davvero, NON prendere il top a score 0 → usa fallback
if (!top.matched) {
  return {
    intent: 'fallback',
    text: fallbackText(structureYaml, 'fallback', lang),
    buttons: [] as any[],
    isFallback: true
  };
}


  const { text, buttons } = renderFromYaml(structureYaml, top.key, lang, defaultMode);
  if (text) return { intent: top.key, text, buttons, isFallback: false };

  return { intent: top.key, text: fallbackText(structureYaml, top.key, lang), buttons: [] as any[], isFallback: true };
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
      isFallback: !!resp.isFallback,
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

  // Retrocompatibilità: POST /chat (default structure)
  app.post("/chat", async (req, reply) => {
    try {
      const body = (req.body as any) || {};
      const message = String(body?.message ?? "").trim();
      if (!message) return reply.code(400).send({ ok: false, error: "Missing message", reply: "Missing message" });

      const defaultStructure = "svapartments"; // retrocompat
      const out = await runEngine({ structureId: defaultStructure, message });

      // LLM fallback: se la risposta è di fallback YAML, attiva orchestratore
      if (out?.meta?.isFallback === true) {
        const llmOut = await orchestrateChat(defaultStructure, message, { matched: false, intent: out.intent, confidence: 0.3 });
        return reply.code(200).send(llmOut);
      }

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
      // LLM fallback: se la risposta è di fallback YAML, attiva orchestratore
      if (out?.meta?.isFallback === true) {
        const llmOut = await orchestrateChat(structureId, message, { matched: false, intent: out.intent, confidence: 0.3 });
        return reply.code(200).send(llmOut);
      }
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
