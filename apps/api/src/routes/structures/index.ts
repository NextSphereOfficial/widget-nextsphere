import type { FastifyPluginAsync } from "fastify";
import { loadConfig, getAvailableStructures } from "./resolver/loadConfig.js";
import { toLLMContext } from "./resolver/toLLMContext.js";

const structuresRoutes: FastifyPluginAsync = async (fastify) => {
  // --- elenco strutture disponibili ---
  fastify.get("/structures", async () => {
    return { ok: true, structures: getAvailableStructures() };
  });

  // --- contesto completo (con merge defaults/room) ---
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

// Retrocompat: /chat -> usa structure dal body o default "svapartments"
fastify.post<{
  Body: { message: string; room?: string; locale?: string; structure?: string };
}>("/chat", async (req, reply) => {
  const { structure = "svapartments", room, message } = req.body || {};
  // riusa la logica della route /chat/:structureId
  // (copiaincolla la parte di intent qui, oppure richiama internamente)
  const cfg = loadConfig(structure);
  const ctx = toLLMContext(cfg, room, true);
  const text = (message || "").toLowerCase().trim();

  const replyObj = (s: string) => ({ ok: true, reply: s, meta: { ctx } });
  const info = ctx.info || {};
  const isWifi = /wi[-\s]*fi|internet|rete|password|ssid/.test(text);
  const isCheckin = /check[-\s]*in|arrivo|entrare|codice (porta|porta)|smart\s*lock/.test(text);
  const isCheckout = /check[-\s]*out|uscita|partenza|orario.*(uscita|check)/.test(text);
  const isRules = /regole|rules|fumo|fumare|party|animali/.test(text);
  const isEmerg = /emergenze?|emergency|soccorso|numero.*emergenze/.test(text);
  const isFaq = /faq|domande|aiuto|help/.test(text);

  if (isWifi && info.wifi) {
    const pw = info.wifi.password ? ` — password: ${info.wifi.password}` : "";
    return replyObj(`Wi-Fi: SSID "${info.wifi.ssid}"${pw}`);
  }
  if (isCheckin && info.checkin) {
    const from = info.checkin.from ? ` dalle ${info.checkin.from}` : "";
    const method = info.checkin.method ? ` (${info.checkin.method})` : "";
    const instr = info.checkin.instructions ? `\nIstruzioni: ${info.checkin.instructions}` : "";
    return replyObj(`Check-in${from}${method}.${instr}`);
  }
  if (isCheckout && info.checkout) {
    const until = info.checkout.until ? ` entro le ${info.checkout.until}` : "";
    const instr = info.checkout.instructions ? `\nIndicazioni: ${info.checkout.instructions}` : "";
    return replyObj(`Check-out${until}.${instr}`);
  }
  if (isRules && info.rules?.length) return replyObj(`Regole: ${info.rules.join(" • ")}`);
  if (isEmerg && info.emergencies) {
    const num = info.emergencies.number ? `Numero emergenze: ${info.emergencies.number}.` : "";
    const instr = info.emergencies.instructions ? ` ${info.emergencies.instructions}` : "";
    return replyObj(`${num}${instr}`.trim() || "In caso di emergenza chiama il 112.");
  }
  if (isFaq && info.faqs?.length) {
    const first = info.faqs[0];
    return replyObj(`${first.q}\n${first.a}`);
  }
  if (info.faqs?.length) {
    const hit = info.faqs.find(f =>
      text && (f.q.toLowerCase().includes(text) || f.a.toLowerCase().includes(text))
    );
    if (hit) return replyObj(hit.a);
  }
  return replyObj(`Echo: ${message}`);
});

};

export default structuresRoutes;
