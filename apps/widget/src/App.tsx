import { useMemo } from 'react';
import { getInitialContext } from './utils/params';
import { sendMessage } from './services/chatClient';

import React, { useEffect, useRef, useState } from 'react';

type Msg = { role: 'user' | 'assistant'; content: string };

export default function App() {
  // Contesto iniziale da URL (hotel, room, lang/locale)
  const ctx = getInitialContext(); // { hotel, room, langParam, locale }
  const locale = useMemo(() => ctx.locale, []);
  const conversationCtx = useMemo(
    () => ({
      hotel: ctx.hotel,
      room: ctx.room,
      locale: ctx.locale
    }),
    []
  );

  // UI strings localizzate
  const t = useMemo(
    () =>
      locale === 'en'
        ? {
            title: 'NextSphere',
            placeholder: 'Type a message...',
            send: 'Send',
            serverError: "Oops, I can't reach the server 😅"
          }
        : {
            title: 'NextSphere',
            placeholder: 'Scrivi un messaggio...',
            send: 'Invia',
            serverError: 'Ops, non riesco a contattare il server 😅'
          },
    [locale]
  );

  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [text, setText] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  // Autoscroll all'ultimo messaggio
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs]);

  // Invio messaggio: usa sendMessage() con metadati (hotel/room/locale)
  async function send() {
    const value = text.trim();
    if (!value) return;

    const userMsg: Msg = { role: 'user', content: value };
    setMsgs((m) => [...m, userMsg]);
    setText('');

    try {
      const data = await sendMessage(value, conversationCtx);
      setMsgs((m) => [
        ...m,
        { role: 'assistant', content: data?.reply ?? '...' }
      ]);
    } catch (err) {
      console.error('Errore chiamata /api/chat', err);
      setMsgs((m) => [
        ...m,
        { role: 'assistant', content: t.serverError }
      ]);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!open && (
        <button
          className="rounded-full p-3 shadow bg-black text-white"
          onClick={() => setOpen(true)}
          aria-label={locale === 'en' ? 'Open chat' : 'Apri chat'}
        >
          💬
        </button>
      )}

      {open && (
        <div className="w-96 max-w-[92vw] h-96 rounded-2xl shadow-xl overflow-hidden bg-white/80 backdrop-blur-md border border-black/5 flex flex-col">
          {/* Header minimal, senza testo/brand name visibile */}
          <header className="h-12 flex items-center justify-between px-3 bg-gradient-to-r from-gray-50 via-white to-gray-50 border-b border-black/5">
            {/* Icona tonda come marchio "muto" */}
            <div className="flex items-center gap-2">
              <span
                className="inline-block h-6 w-6 rounded-full bg-black/80"
                aria-hidden
              />
              <span className="sr-only">NextSphere</span>
            </div>

            {/* Pulsante chiudi (manteniamo solo close, niente minimize per ora) */}
            <button
              className="h-8 w-8 grid place-items-center rounded-lg hover:bg-black/5 transition"
              aria-label={locale === 'en' ? 'Close chat' : 'Chiudi chat'}
              onClick={() => setOpen(false)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </header>

      {/* Area messaggi */}
          <div className="flex-1 overflow-auto p-4 space-y-3 chat-scroll">
       {msgs.map((m, i) => (
    <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div
        className={
          m.role === 'user'
            ? 'max-w-[85%] rounded-2xl px-3 py-2 text-sm md:text-[0.95rem] leading-snug bg-black text-white shadow-sm'
            : 'max-w-[85%] rounded-2xl px-3 py-2 text-sm md:text-[0.95rem] leading-snug bg-white border border-black/10 shadow-sm'
        }
      >
        {m.content}
      </div>
    </div>
       ))}
       <div ref={endRef} />
       
        </div>

{/* Barra input glass + micro-interactions */}
<div className="flex items-center gap-2 p-2 border-t bg-white/60 backdrop-blur-md">
  <input
    className="flex-1 border border-black/10 rounded-xl px-3 py-2 text-sm 
               focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black/20
               placeholder:text-gray-400 transition-shadow"
    value={text}
    onChange={(e) => setText(e.target.value)}
    onKeyDown={onKeyDown}
    placeholder={t.placeholder}
    aria-label={locale === 'en' ? 'Message input' : 'Input messaggio'}
  />
  <button
    className={`px-3 py-2 rounded-xl text-sm font-medium transition
                ${text.trim()
                  ? 'bg-black text-white hover:opacity-90 active:scale-[0.98] shadow-sm'
                  : 'bg-black/10 text-gray-500 cursor-not-allowed'
                }`}
    onClick={send}
    disabled={!text.trim()}
    aria-label={locale === 'en' ? 'Send message' : 'Invia messaggio'}
    title={locale === 'en' ? 'Press Enter to send' : 'Premi Invio per inviare'}
  >
    {t.send}
  </button>
</div>

        </div>
      )}
    </div>
  );
}
