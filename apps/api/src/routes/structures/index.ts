// apps/api/src/routes/structures/index.ts
import type { FastifyInstance, FastifyPluginAsync } from "fastify";
import { readdir, readFile } from "node:fs/promises";
import { resolve, basename, extname } from "node:path";
import YAML from "yaml";

// -----------------------------
// Helpers: path & YAML loaders
// -----------------------------
const ROOT = process.cwd();
const STRUCT_DIR = resolve(ROOT, "src", "structures");

async function listYamlFiles(dir: string): Promise<string[]> {
  const files = await readdir(dir, { withFileTypes: true });
  return files
    .filter((e) => e.isFile() && (e.name.endsWith(".yaml") || e.name.endsWith(".yml")))
    .map((e) => e.name);
}

async function getAvailableStructures(): Promise<string[]> {
  try {
    const files = await listYamlFiles(STRUCT_DIR);
    return files
      .map((f) => basename(f, extname(f)))
      .filter((id) => !!id && id !== "intents-core");
  } catch {
    return [];
  }
}

async function loadYamlStructure(structureId: string): Promise<any> {
  const p = resolve(STRUCT_DIR, `${structureId}.yaml`);
  const raw = await readFile(p, "utf8");
  return YAML.parse(raw);
}

// -----------------------------
// toLLMContext (compat “larga”)
// -----------------------------
type Lang = "it" | "en";
type FAQ = { q: string; a: string };

export type LLMContext = {
  structureId?: string;
  name?: string;
  locale: string;
  content: any;
  hints: string[];
  info?: { faqs: FAQ[] };
};

function toLLMContext(yaml: any, _room?: unknown, _redact?: unknown): LLMContext {
  const id = yaml?.meta?.structure?.id;
  const name = yaml?.meta?.structure?.name;
  const locale = yaml?.meta?.default_locale || yaml?.meta?.defaultLang || "it-IT";

  const hints: string[] = [];
  const ssid = yaml?.content?.wifi?.ssid;
  const checkout = yaml?.content?.checkout?.time;
  const quiet = yaml?.content?.rules?.quiet_hours;
  if (ssid) hints.push(`Wi-Fi SSID: ${ssid}`);
  if (checkout) hints.push(`Check-out: ${checkout}`);
  if (quiet) hints.push(`Quiet hours: ${quiet}`);

  const faqs: FAQ[] = Array.isArray(yaml?.content?.faqs)
    ? yaml.content.faqs
        .filter((f: any) => f && (f.q || f.a))
        .map((f: any) => ({ q: String(f.q ?? ""), a: String(f.a ?? "") }))
    : [];

  return {
    structureId: id,
    name,
    locale,
    content: yaml?.content ?? {},
    hints,
    info: { faqs },
  };
}

// -----------------------------------------
// Legacy bridge: map content.* -> info.*
// -----------------------------------------
type Info = {
  wifi?: {
    ssid?: string;
    password?: string;
    note?: string;
  };
  checkin?: {
    from?: string;
    method?: string;
    instructions?: string;
  };
  checkout?: {
    until?: string;         // da content.checkout.time
    instructions?: string;  // da content.checkout.drop_keys.(it|en|string)
  };
  rules?: string[];         // sintetizzate
  emergencies?: {
    number?: string;        // “112 / 118 / 115”
    police?: string;
    medical?: string;
    fire?: string;
    note?: string;
    instructions?: string;  // compat: presente per evitare errori TS
  };
  faqs: FAQ[];
};

function buildInfo(ctx: LLMContext): Info {
  const content = ctx?.content ?? {};

  // WIFI
  const wifiSrc = content?.wifi ?? {};
  const wifiNote =
    wifiSrc?.note?.it ??
    wifiSrc?.note?.en ??
    (typeof wifiSrc?.note === "string" ? wifiSrc.note : undefined);

  // CHECKIN (poco usato con i nuovi YAML, ma manteniamo campi)
  const checkinSrc = content?.checkin ?? {};
  const checkin = {
    from: checkinSrc.from,
    method: checkinSrc.method,
    instructions:
      checkinSrc.instructions?.it ??
      checkinSrc.instructions?.en ??
      (typeof checkinSrc.instructions === "string" ? checkinSrc.instructions : undefined),
  };

  // CHECKOUT
  const dropKeysText =
    content?.checkout?.drop_keys?.it ??
    content?.checkout?.drop_keys?.en ??
    (typeof content?.checkout?.drop_keys === "string"
      ? content?.checkout?.drop_keys
      : undefined);
  const checkout = {
    until: content?.checkout?.time,
    instructions: dropKeysText,
  };

  // RULES (array di stringhe human-readable)
  const rulesObj = content?.rules ?? {};
  const rulesArr: string[] = [];
  if (rulesObj?.quiet_hours) rulesArr.push(`Silenzio: ${rulesObj.quiet_hours}`);
  if (typeof rulesObj?.smoking === "boolean")
    rulesArr.push(`Fumo: ${rulesObj.smoking ? "consentito" : "non consentito"}`);
  if (typeof rulesObj?.pets === "boolean")
    rulesArr.push(`Animali: ${rulesObj.pets ? "ammessi" : "non ammessi"}`);
  const rulesExtra =
    rulesObj?.extra?.it ??
    rulesObj?.extra?.en ??
    (typeof rulesObj?.extra === "string" ? rulesObj.extra : undefined);
  if (rulesExtra) rulesArr.push(rulesExtra);

  // EMERGENCIES
  const emSrc = content?.emergency ?? content?.emergencies ?? {};
  const emergencies = {
    number:
      emSrc.number ??
      (emSrc.police || emSrc.medical || emSrc.fire
        ? [emSrc.police, emSrc.medical, emSrc.fire].filter(Boolean).join(" / ")
        : undefined) ??
      undefined,
    police: emSrc.police,
    medical: emSrc.medical,
    fire: emSrc.fire,
    note: emSrc.note?.it ?? emSrc.note?.en ?? emSrc.note,
    instructions: undefined as string | undefined, // compat: campo atteso da codice legacy
  };

  // FAQ
  const faqs: FAQ[] = Array.isArray(ctx?.info?.faqs) ? ctx.info!.faqs : [];

  return {
    wifi: wifiSrc ? { ssid: wifiSrc.ssid, password: wifiSrc.password, note: wifiNote } : undefined,
    checkin,
    checkout,
    rules: rulesArr,
    emergencies,
    faqs,
  };
}

// -----------------------------------------
// Plugin Fastify con piccole utilità
// -----------------------------------------
export const structuresRoutes: FastifyPluginAsync = async (app: FastifyInstance) => {
  // List available structures
  app.get("/structures", async (_req, reply) => {
    const items = await getAvailableStructures();
    return reply.send({ ok: true, items });
  });

  // Get basic context for a structure
  app.get("/structures/:id/context", async (req, reply) => {
    const { id } = req.params as { id: string };
    try {
      const yaml = await loadYamlStructure(id);
      const ctx = toLLMContext(yaml);     // firma larga compat
      const info: Info = buildInfo(ctx);  // bridge legacy
      return reply.send({ ok: true, id, name: ctx.name, locale: ctx.locale, info, hints: ctx.hints });
    } catch (err: any) {
      req.log?.error?.({ err }, "load structure context error");
      return reply.code(404).send({ ok: false, error: "Structure not found" });
    }
  });

  // Example: small helper endpoints (optional)
  app.get("/structures/:id/rules", async (req, reply) => {
    const { id } = req.params as { id: string };
    try {
      const yaml = await loadYamlStructure(id);
      const ctx = toLLMContext(yaml);
      const info: Info = buildInfo(ctx);
      return reply.send({ ok: true, rules: info.rules ?? [] });
    } catch (err: any) {
      return reply.code(404).send({ ok: false, error: "Structure not found" });
    }
  });

  app.get("/structures/:id/emergencies", async (req, reply) => {
    const { id } = req.params as { id: string };
    try {
      const yaml = await loadYamlStructure(id);
      const ctx = toLLMContext(yaml);
      const info: Info = buildInfo(ctx);
      return reply.send({ ok: true, emergencies: info.emergencies ?? {} });
    } catch {
      return reply.code(404).send({ ok: false, error: "Structure not found" });
    }
  });

  // (Altro handler legacy che ti servisse può usare lo stesso pattern: load -> toLLMContext -> buildInfo)
};

export default structuresRoutes;
