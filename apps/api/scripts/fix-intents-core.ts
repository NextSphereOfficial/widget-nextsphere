// @ts-nocheck
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import YAML from "yaml";

const ROOT = process.cwd();
const INTENTS_CORE = path.join(ROOT, "src", "intents", "intents-core.yaml");

function toArrayOfStrings(x: any): string[] {
  if (x == null) return [];
  if (Array.isArray(x)) return x.map(String).filter(Boolean);
  if (typeof x === "string") return [x];
  if (typeof x === "object") {
    // Esempi:
    // followups: { it: ["..."], en: ["..."] }
    // actions: { cta: { it: "Chiama adesso", en: "Call now" } }
    const out: string[] = [];
    for (const [k, v] of Object.entries(x)) {
      if (Array.isArray(v)) {
        out.push(...v.map(String).filter(Boolean));
      } else if (typeof v === "string") {
        out.push(v);
      } else if (typeof v === "object" && v) {
        // es. { it: "Chiama adesso", en: "Call now" } → aggiungo le stringhe
        for (const vv of Object.values(v)) {
          if (typeof vv === "string") out.push(vv);
          else if (Array.isArray(vv)) out.push(...vv.map(String).filter(Boolean));
        }
        // in ogni caso conservo anche la “chiave azione” come etichetta
        if (k) out.push(String(k));
      } else {
        out.push(String(v));
      }
    }
    // deduplica mantenendo l’ordine
    return Array.from(new Set(out.filter(Boolean)));
  }
  return [String(x)];
}

async function main() {
  const raw = await readFile(INTENTS_CORE, "utf8");
  const doc = YAML.parse(raw) ?? {};
  if (!doc.intents || typeof doc.intents !== "object") {
    throw new Error("File non valido: manca la chiave `intents` in intents-core.yaml");
  }

  for (const [intentName, intentVal] of Object.entries<any>(doc.intents)) {
    if (intentVal && typeof intentVal === "object") {
      // followups → array<string>
      if ("followups" in intentVal) {
        intentVal.followups = toArrayOfStrings(intentVal.followups);
      }
      // actions → array<string>
      if ("actions" in intentVal) {
        intentVal.actions = toArrayOfStrings(intentVal.actions);
      }
      // output.rich: lascio com'è; lo schema ora accetta quasi tutto
    }
    doc.intents[intentName] = intentVal;
  }

  const next = YAML.stringify(doc);
  await writeFile(INTENTS_CORE, next, "utf8");
  console.log("✓ intents-core.yaml normalizzato (followups/actions → array<string>)");
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
