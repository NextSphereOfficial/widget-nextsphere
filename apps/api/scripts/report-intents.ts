// @ts-nocheck
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import YAML from "yaml";

const ROOT = process.cwd();
const CORE = path.join(ROOT, "src", "intents", "intents-core.yaml");
const STRUCT_DIR = path.join(ROOT, "src", "routes", "structures", "loaders");

const EMPTY_STR = (s: any) => !s || (typeof s === "string" && s.trim() === "");

async function loadYaml(file: string) {
  const raw = await readFile(file, "utf8");
  return YAML.parse(raw) ?? {};
}

async function listStructureFiles() {
  const items = await readdir(STRUCT_DIR, { withFileTypes: true });
  return items
    .filter((d) => d.isFile())
    .map((d) => d.name)
    .filter((n) => n.endsWith(".yaml") && !n.toLowerCase().includes("backup"))
    .map((n) => path.join(STRUCT_DIR, n));
}

function reportForStructure(structDoc: any, coreIntents: string[]) {
  const intents = (structDoc?.intents && typeof structDoc.intents === "object")
    ? Object.keys(structDoc.intents)
    : [];

  const missing = coreIntents.filter((k) => !intents.includes(k));
  const orphans = intents.filter((k) => !coreIntents.includes(k));

  const details = coreIntents.map((k) => {
    const node = structDoc?.intents?.[k];
    if (!node) return { intent: k, exists: false };
    const o = node.output || {};
    const shortOk = !EMPTY_STR(o.short);
    const longOk  = !EMPTY_STR(o.long);
    const defOk   = !EMPTY_STR(o.default);
    const btns    = (o.ui?.buttons && Array.isArray(o.ui.buttons)) ? o.ui.buttons.length : 0;
    const empties = ["short","long","default"].filter((f) => EMPTY_STR(o[f]));
    return {
      intent: k,
      exists: true, shortOk, longOk, defOk, btns,
      empties
    };
  });

  const covered = details.filter(d => d.exists && (d.shortOk || d.longOk || d.defOk)).length;
  const pct = coreIntents.length ? Math.round(100 * covered / coreIntents.length) : 100;

  return { missing, orphans, details, pct };
}

function fmtRow(cols: string[], widths: number[]) {
  return cols.map((c, i) => (c + " ".repeat(Math.max(0, widths[i] - c.length)))).join("  ");
}

function printTable(details: any[]) {
  const rows = [["Intent","short","long","default","buttons","note"]];
  details.forEach(d => {
    const note = d.exists ? (d.empties.length ? `manca: ${d.empties.join(",")}` : "") : "manca intent";
    rows.push([
      d.intent,
      d.exists ? (d.shortOk ? "✓" : "·") : "—",
      d.exists ? (d.longOk  ? "✓" : "·") : "—",
      d.exists ? (d.defOk   ? "✓" : "·") : "—",
      d.exists ? String(d.btns) : "—",
      note
    ]);
  });
  const widths = rows[0].map((_, i) => Math.max(...rows.map(r => r[i].length)));
  console.log(fmtRow(rows[0], widths));
  console.log(fmtRow(widths.map(w => "-".repeat(w)), widths));
  rows.slice(1).forEach(r => console.log(fmtRow(r, widths)));
}

async function main() {
  const core = await loadYaml(CORE);
  const coreIntents = Object.keys(core?.intents ?? {}).sort();

  const structFiles = await listStructureFiles();
  if (!structFiles.length) {
    console.log("(i) Nessun file struttura trovato.");
    return;
  }

  console.log(`Intents core totali: ${coreIntents.length}`);
  console.log("");

  for (const file of structFiles) {
    const name = path.basename(file, ".yaml");
    const doc = await loadYaml(file);
    const { missing, orphans, details, pct } = reportForStructure(doc, coreIntents);

    console.log(`== Struttura: ${name}  | Copertura: ${pct}%`);
    printTable(details);
    if (missing.length) {
      console.log(`• Mancano in struttura (${missing.length}): ${missing.join(", ")}`);
    }
    if (orphans.length) {
      console.log(`• Presenti solo in struttura (non in core) (${orphans.length}): ${orphans.join(", ")}`);
    }
    console.log("");
  }
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
