import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json()); // 👈 deve stare prima delle API

// ---------- API NON-STREAM ----------
app.get('/api/ping', (_req, res) => {
  res.json({ ok: true });
});

app.post('/api/chat', (req, res) => {
  const { message, meta, text } = req.body || {};
  const finalMessage = message ?? text ?? '';
  const finalMeta = meta ?? {};
  console.log('[CHAT] payload:', { message: finalMessage, meta: finalMeta });

  const locale = finalMeta.locale === 'en' ? 'en' : 'it';
  const reply =
    locale === 'en'
      ? 'Thanks! We received your message.'
      : 'Grazie! Abbiamo ricevuto il tuo messaggio.';

  res.json({ reply });
});

// --- Streaming: POST /api/chat/stream --- //
app.post('/api/chat/stream', async (req, res) => {
  // Intestazioni per stream (no buffering, keep-alive)
  res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');

  // Flush immediato degli header (quando disponibile)
  if (res.flushHeaders) res.flushHeaders();

  try {
    const { message, meta } = req.body || {};
    const locale = meta?.locale === 'en' ? 'en' : 'it';

    const fullReply =
      locale === 'en'
        ? `Thanks for your message about "${message}". I'm preparing local tips for ${meta?.hotel} – room ${meta?.room}.`
        : `Grazie per il tuo messaggio su "${message}". Sto preparando suggerimenti utili per ${meta?.hotel} — stanza ${meta?.room}.`;

    const tokens = fullReply.split(' ').filter(Boolean);

    // DEBUG: log veloce per confermare che entriamo qui e che ci sono token
    console.log('[SSE] tokens:', tokens.length);

    // 1) Primo chunk IMMEDIATO (evita che il client mostri solo "pending")
    if (tokens.length > 0) {
      res.write(tokens[0] + ' ');
    } else {
      res.write((locale === 'en' ? 'Empty reply.' : 'Risposta vuota.') + ' ');
    }

    // 2) Restanti chunk a intervalli
    let i = 1;
    const interval = setInterval(() => {
      if (i >= tokens.length) {
        res.write('\n'); // newline finale
        clearInterval(interval);
        return res.end();
      }
      res.write(tokens[i] + ' ');
      i++;
    }, 80); // regola liberamente

    // 3) Se il client chiude, interrompi
    req.on('close', () => {
      clearInterval(interval);
      res.end();
    });

  } catch (e) {
    console.error('SSE error', e);
    res.write((req.body?.meta?.locale === 'en' ? 'Server error.' : 'Errore del server.') + '\n');
    return res.end();
  }
});


// ---------- STATICO ----------
const publicDir = path.join(__dirname, '..', 'public');
app.use(express.static(publicDir));

// ---------- FALLBACK SPA (Express 5) ----------
app.use((_req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

// ---------- AVVIO ----------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`All set on http://localhost:${PORT}`);
});
