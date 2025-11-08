import { ENV } from './env.js';

export interface LlmResult {
  ok: boolean;
  text?: string;
  tokensIn?: number;
  tokensOut?: number;
  costEur?: number;
  error?: string;
  latencyMs?: number;
}

/**
 * Client LLM reale (OpenAI).
 * - usa fetch nativo (Node >=18)
 * - rispetta ENV.LLM_TIMEOUT_MS
 * - calcola token e costo da `usage` quando presente
 * - in assenza di API key, ritorna errore controllato
 */
export async function callLlm(query: string, opts?: { locale?: string; systemPrompt?: string }): Promise<LlmResult> {
  const start = Date.now();

  if (!ENV.LLM_API_KEY) {
    return { ok: false, error: 'LLM_API_KEY missing', latencyMs: 0 };
  }

  const system = (opts?.systemPrompt ?? `
Sei un Concierge d'hotel NextSphere. Rispondi in ${opts?.locale ?? 'it'}.
Regole:
- Non inventare dati: usa solo il contesto fornito.
- Se mancano dati, chiedi una breve chiarificazione o proponi alternative.
- Tono: gentile, sintetico, professionale.
- Se la richiesta è fuori ambito o sensibile, rifiuta cortesemente.
  `).trim();

  const user = `Domanda: """${sanitize(query)}"""`;

  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), ENV.LLM_TIMEOUT_MS);

  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      signal: controller.signal,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ENV.LLM_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: ENV.LLM_MODEL,
        temperature: 0.2,
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: user }
        ]
      })
    });

    clearTimeout(t);

    if (!res.ok) {
      const errTxt = await safeText(res);
      return { ok: false, error: `HTTP ${res.status}: ${errTxt}`, latencyMs: Date.now() - start };
    }

    const data: any = await res.json();
    const text: string = data?.choices?.[0]?.message?.content?.trim?.() ?? '';
    const usage = data?.usage ?? {};
    const tokensIn = usage.prompt_tokens ?? undefined;
    const tokensOut = usage.completion_tokens ?? undefined;

    const costEur = estimateCost(tokensIn, tokensOut); // placeholder conservativo
    return { ok: true, text, tokensIn, tokensOut, costEur, latencyMs: Date.now() - start };
  } catch (e: any) {
    clearTimeout(t);
    return { ok: false, error: e?.name === 'AbortError' ? 'Timeout' : String(e?.message ?? e), latencyMs: Date.now() - start };
  }
}

function sanitize(s: string): string {
  return String(s).replace(/\s+/g, ' ').slice(0, 1200);
}

async function safeText(r: Response): Promise<string> {
  try { return await r.text(); } catch { return ''; }
}

// Stima costo “safe” (adatta ai tuoi prezzi reali quando vuoi)
function estimateCost(tokensIn?: number, tokensOut?: number): number {
  const IN = tokensIn ?? 400;
  const OUT = tokensOut ?? 300;
  const perTokenEur = 0.0000005;
  return (IN + OUT) * perTokenEur;
}
