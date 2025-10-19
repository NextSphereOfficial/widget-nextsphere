// public/widget.js

(function () {
  const ctx = window.NS_CONCIERGE_BOOT || {
    hotel: 'ns-apartment',
    room: 'A1',
    lang: 'en',
    source: 'qr'
  };

  const locale = ctx.lang === 'it' ? 'it' : 'en';
  const T = locale === 'it'
    ? {
        title: 'Concierge NextSphere',
        wifi: 'Wi-Fi',
        checkout: 'Orari check-out',
        taxi: 'Taxi',
        inputPh: 'Scrivi un messaggio…',
        send: 'Invia',
        serverErr: 'Ops, non riesco a contattare il server 😅',
        welcome: 'Ciao! Sono NextSphere. Come posso aiutarti?'
      }
    : {
        title: 'NextSphere Concierge',
        wifi: 'Wi-Fi',
        checkout: 'Check-out time',
        taxi: 'Taxi',
        inputPh: 'Type a message…',
        send: 'Send',
        serverErr: "Oops, I can't reach the server 😅",
        welcome: 'Hi! I’m NextSphere . How can I help?'
      };

  // Mount point
  const root = document.getElementById('ns-concierge');
  if (!root) return;

  // --- UI skeleton ---
  root.innerHTML = `
    <div style="display:flex; flex-direction:column; gap:12px;">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <strong>${T.title}</strong>
        <small style="color:#6b7280">${ctx.hotel} • ${ctx.room} • ${locale.toUpperCase()}</small>
      </div>

      <div id="ns-actions" class="actions">
        <button data-prompt="wifi">${T.wifi}</button>
        <button data-prompt="checkout">${T.checkout}</button>
        <button data-prompt="taxi">${T.taxi}</button>
      </div>

      <div id="ns-messages" style="height:280px; overflow:auto; border:1px solid var(--ring); border-radius:12px; padding:10px; background:#fff;">
        <!-- messages -->
      </div>

      <div style="display:flex; gap:8px;">
        <input id="ns-input" placeholder="${T.inputPh}" aria-label="Message"
               style="flex:1; border:1px solid var(--ring); border-radius:10px; padding:10px; font-size:14px;" />
        <button id="ns-send" style="border-radius:10px; border:1px solid var(--ring); padding:10px 14px; background:#111827; color:#fff;">
          ${T.send}
        </button>
      </div>
    </div>
  `;

  const $msgs = root.querySelector('#ns-messages');
  const $input = root.querySelector('#ns-input');
  const $send = root.querySelector('#ns-send');
  const $actions = root.querySelector('#ns-actions');

  // --- Helpers ---
function appendMsg(role, text) {
  const wrap = document.createElement('div');
  wrap.style.margin = '6px 0';
  wrap.style.textAlign = role === 'user' ? 'right' : 'left';

  const bubble = document.createElement('span');
  bubble.textContent = text;
  bubble.style.display = 'inline-block';
  bubble.style.padding = '6px 8px';
  bubble.style.borderRadius = '10px';
  bubble.style.fontSize = '14px';
  bubble.style.background = role === 'user' ? '#eef2ff' : '#f3f4f6';

  wrap.appendChild(bubble);
  $msgs.appendChild(wrap);
  $msgs.scrollTop = $msgs.scrollHeight;

  return wrap;
}



async function sendToServer(text, targetWrap) {
  const body = {
    message: text,
    meta: {
      hotel: ctx.hotel,
      room: ctx.room,
      locale: locale,
      userAgent: navigator.userAgent,
      source: ctx.source || 'qr'
    }
  };

  // riferimento alla bolla
  const span = targetWrap?.querySelector('span');
  if (!span) return '';

  try {
    console.log('[client] start stream → /api/chat/stream');
    const res = await fetch('/api/chat/stream', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (!res.ok || !res.body || !res.body.getReader) {
      throw new Error('Stream not available');
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let reply = '';

    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      reply += decoder.decode(value, { stream: true });
      span.textContent = reply;                 // aggiorna SOLO questa bolla
      $msgs.scrollTop = $msgs.scrollHeight;
    }
    console.log('[client] stream DONE');
    return reply.trim();
  } catch (e) {
    console.warn('[client] stream failed, fallback to /api/chat', e);
    // FALLBACK non streaming
    try {
      const res2 = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res2.json();
      const reply = data?.reply ?? (locale === 'en' ? 'Server error.' : 'Errore del server.');
      span.textContent = reply;
      return reply;
    } catch (e2) {
      console.error('[client] fallback /api/chat failed', e2);
      span.textContent = T.serverErr;
      return '';
    }
  }
}





async function handleSend(text) {
  const value = (text ?? $input.value).trim();
  if (!value) return;

  console.log('[client] handleSend:', value);
  appendMsg('user', value);
  $input.value = '';

  // crea SUBITO bolla dell’assistente **dedicata a questa richiesta**
  const targetWrap = appendMsg('assistant', '…');

  // avvia stream (con fallback automatico)
  const final = await sendToServer(value, targetWrap);

  // rifinitura finale
  if (final && targetWrap?.querySelector('span')) {
    targetWrap.querySelector('span').textContent = final;
  }
}




  // --- Welcome message ---
  appendMsg('assistant', T.welcome);

  // --- Actions (quick prompts) ---
  const canned = {
    wifi: locale === 'it'
      ? 'Quali sono le credenziali Wi-Fi?'
      : 'What are the Wi-Fi credentials?',
    checkout: locale === 'it'
      ? 'A che ora è il check-out?'
      : 'What time is check-out?',
    taxi: locale === 'it'
      ? 'Puoi aiutarmi a prenotare un taxi?'
      : 'Can you help me book a taxi?'
  };

  $actions.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    const key = btn.getAttribute('data-prompt');
    if (!key || !canned[key]) return;
    handleSend(canned[key]);
  });

  // --- Input events ---
  $send.addEventListener('click', () => handleSend());
  $input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  });
})();
