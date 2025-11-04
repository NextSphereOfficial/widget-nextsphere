import type { FastifyPluginAsync } from "fastify";
import { loadConfig, getAvailableStructures } from "./resolver/loadConfig.js";
import { toLLMContext } from "./resolver/toLLMContext.js";

function buildReply(message: string, ctx: ReturnType<typeof toLLMContext>) {
  return { ok: true, reply: message, meta: { ctx } };
}

function makeResponder(text: string, ctx: ReturnType<typeof toLLMContext>) {
  const t = text.toLowerCase().trim();
  const info = ctx.info || {};
  const isWifi = /wi[-\s]*fi|internet|rete|password|ssid/.test(t);
  const isCheckin = /check[-\s]*in|arrivo|entrare|codice (porta|porta)|smart\s*lock/.test(t);
  const isCheckout = /check[-\s]*out|uscita|partenza|orario.*(uscita|check)/.test(t);
  const isRules = /regole|rules|fumo|fumare|party|animali/.test(t);
  const isEmerg = /emergenze?|emergency|soccorso|numero.*emergenze/.test(t);
  const isFaq = /faq|domande|aiuto|help/.test(t);

  if (isWifi && info.wifi) {
    const pw = info.wifi.password ? ` — password: ${info.wifi.password}` : "";
    return buildReply(`Wi-Fi: SSID "${info.wifi.ssid}"${pw}`, ctx);
  }
  if (isCheckin && info.checkin) {
    const from = info.checkin.from ? ` dalle ${info.checkin.from}` : "";
    const method = info.checkin.method ? ` (${info.checkin.method})` : "";
    const instr = info.checkin.instructions ? `\nIstruzioni: ${info.checkin.instructions}` : "";
    return buildReply(`Check-in${from}${method}.${instr}`, ctx);
  }
  if (isCheckout && info.checkout) {
    const until = info.checkout.until ? ` entro le ${info.checkout.until}` : "";
    const instr = info.checkout.instructions ? `\nIndicazioni: ${info.checkout.instructions}` : "";
    return buildReply(`Check-out${until}.${instr}`, ctx);
  }
  if (isRules && info.rules?.length) {
    return buildReply(`Regole: ${info.rules.join(" • ")}`, ctx);
  }
  if (isEmerg && info.emergencies) {
    const num = info.emergencies.number ? `Numero emergenze: ${info.emergencies.number}.` : "";
    const instr = info.emergencies.instructions ? ` ${info.emergencies.instructions}` : "";
    const msg = `${num}${instr}`.trim() || "In caso di emergenza chiama il 112.";
    return buildReply(msg, ctx);
  }
  if (isFaq && info.faqs?.length) {
    const first = info.faqs[0];
    return buildReply(`${first.q}\n${first.a}`, ctx);
  }
  if (info.faqs?.length) {
    const hit = info.faqs.find(f => t && (f.q.toLowerCase().includes(t) || f.a.toLowerCase().includes(t)));
    if (hit) return buildReply(hit.a, ctx);
  }

  return buildReply(`Echo: ${text}`, ctx);
}

const structuresRoutes: FastifyPluginAsync = async (fastify) => {
  // elenco strutture
  fastify.get("/structures", async () => {
    return { ok: true, structures: getAvailableStructures() };
  });

  // contesto struttura
  fastify.get<{
    Params: { structureId: string };
    Querystring: { room?: string; redact?: string };
  }>("/structures/:structureId/context", async (req, reply) => {
    const { structureId } = req.params;
    const { room, redact } = req.query;
    try {
      const cfg = loadConfig(structureId);
      const ctx = toLLMContext(cfg, room, redact === "true");
      return { ok: true, context: ctx };
    } catch (err: any) {
      reply.code(400);
      return { ok: false, error: err.message ?? "Invalid structure config" };
    }
  });

  // chat "pulita": /chat/:structureId
  fastify.post<{
    Params: { structureId: string };
    Body: { message: string; room?: string; locale?: string };
  }>("/chat/:structureId", async (req) => {
    const { structureId } = req.params;
    const { room, message } = req.body || { message: "" };
    const cfg = loadConfig(structureId);
    const ctx = toLLMContext(cfg, room, true);
    return makeResponder(message ?? "", ctx);
  });

  // retrocompat: /chat (usa body.structure o default "svapartments")
  fastify.post<{
    Body: { message: string; room?: string; locale?: string; structure?: string };
  }>("/chat", async (req) => {
    const { structure = "svapartments", room, message } = req.body || { message: "" };
    const cfg = loadConfig(structure);
    const ctx = toLLMContext(cfg, room, true);
    return makeResponder(message ?? "", ctx);
  });
};

export default structuresRoutes;
