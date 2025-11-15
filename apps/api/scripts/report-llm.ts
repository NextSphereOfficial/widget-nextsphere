// apps/api/scripts/report-llm.ts
// Piccolo CLI per avere un report LLM in tempo reale
/* eslint-disable no-console */

async function main() {
  const apiBase = process.env.API_URL ?? "http://localhost:8081";
  const structureId = process.env.LLM_REPORT_STRUCTURE ?? "svapartments";
  const url = `${apiBase}/chat/${structureId}`;

  console.log("NextSphere Concierge AI – LLM Report");
  console.log("===================================");
  console.log(`API_BASE       : ${apiBase}`);
  console.log(`Structure      : ${structureId}`);
  console.log("");

  // corpo fittizio: una richiesta qualsiasi per leggere lo snapshot
  const body = { message: "[llm-status]" };

  let res: any;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch (err: any) {
    if (err?.code === "ECONNREFUSED") {
      console.error(`Request failed: connessione rifiutata su ${url}`);
      console.error("Suggerimento: avvia prima l'API con `pnpm dev` oppure imposta API_URL verso la prod.");
    } else {
      console.error("Request failed:", err);
    }
    process.exit(1);
  }

  if (!res.ok) {
    console.error(`Request failed with status ${res.status}`);
    process.exit(1);
  }

  const data: any = await res.json();
  const snap: any = data.snapshot ?? {};

  const spent = Number(snap.spent_today_eur ?? 0);
  const budget =
    snap.budget_eur !== undefined
      ? Number(snap.budget_eur)
      : Number(process.env.LLM_DAILY_BUDGET_EUR ?? 0);
  const remaining = budget > 0 ? budget - spent : NaN;
  const pct = budget > 0 ? (spent / budget) * 100 : NaN;

  console.log("Budget & Cost");
  console.log("-------------");
  console.log(`Budget (€/day) : ${budget || "(not set)"}`);
  console.log(`Spent today    : ${spent.toFixed(6)}`);
  if (!Number.isNaN(remaining)) {
    console.log(`Remaining      : ${remaining.toFixed(6)}`);
    console.log(`Used           : ${pct.toFixed(2)} %`);
  }
  console.log("");

  console.log("Runtime");
  console.log("-------");
  console.log(`use_llm        : ${snap.use_llm}`);
  console.log(`failures       : ${snap.failures ?? 0}`);
  console.log(`cb_threshold   : ${snap.cb_threshold ?? "?"}`);
  console.log(`cache_size     : ${snap.cache_size ?? 0}`);

  if (data.costEur !== undefined) {
    console.log("");
    console.log("Last call (this report)");
    console.log("-----------------------");
    console.log(`source         : ${data.source}`);
    console.log(`costEur        : ${data.costEur}`);
    console.log(`tokensIn       : ${data.tokensIn}`);
    console.log(`tokensOut      : ${data.tokensOut}`);
  }

  console.log("");
  console.log(
    "Note: questo comando fa UNA chiamata /chat per leggere lo snapshot (costo molto basso se usa LLM)."
  );
}

main().catch((err) => {
  console.error("report:llm failed:", err);
  process.exit(1);
});

