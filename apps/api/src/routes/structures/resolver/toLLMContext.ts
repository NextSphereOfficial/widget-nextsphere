// utils/toLLMContext.ts — compatibile con YAML refined, backward-friendly

export type Lang = "it" | "en";

type StructureYaml = {
  meta?: {
    structure?: { id: string; name: string };
    default_locale?: string;
    defaultLang?: string; // legacy
  };
  content?: any;
  responses?: any;
};

export type FAQ = { q: string; a: string };

export type LLMContext = {
  structureId?: string;
  name?: string;
  locale: string;
  content: any;
  hints: string[];
  /** Campo legacy che alcune route usano: ora lo forniamo sempre. */
  info?: {
    faqs: FAQ[];
  };
};

/**
 * Firma "larga" per compatibilità con chiamate legacy:
 *   toLLMContext(cfg, room, redact)
 * I parametri extra vengono ignorati.
 */
export function toLLMContext(
  yaml: StructureYaml,
  _room?: unknown,
  _redact?: unknown
): LLMContext {
  const id = yaml?.meta?.structure?.id;
  const name = yaml?.meta?.structure?.name;
  const locale = yaml?.meta?.default_locale || yaml?.meta?.defaultLang || "it-IT";

  // hints veloci
  const hints: string[] = [];
  const ssid = yaml?.content?.wifi?.ssid;
  const checkout = yaml?.content?.checkout?.time;
  const quiet = yaml?.content?.rules?.quiet_hours;
  if (ssid) hints.push(`Wi-Fi SSID: ${ssid}`);
  if (checkout) hints.push(`Check-out: ${checkout}`);
  if (quiet) hints.push(`Quiet hours: ${quiet}`);

  // supporto "legacy" per info.faqs
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
