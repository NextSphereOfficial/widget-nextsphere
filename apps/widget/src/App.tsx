import React, { useEffect, useMemo, useRef, useState } from 'react';
import { getInitialContext } from './utils/params';
import { sendMessage } from './services/chatClient';

import WelcomeCard from './components/WelcomeCard';
import TypingLoader from './components/TypingLoader';
import HeaderBar from './components/HeaderBar';
import Launcher from './components/Launcher';

type Msg = { role: 'user' | 'assistant'; content: string };

export default function App() {
  const ctx = getInitialContext();
  const locale = ctx.locale;

  const conversationCtx = {
    hotel: ctx.hotel,
    room: ctx.room,
    locale: ctx.locale,
  };

  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [text, setText] = useState('');
  const endRef = useRef<HTMLDivElement>(null);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs]);

  async function sendMessageToBot(textToSend?: string) {
    const value = (textToSend ?? text).trim();
    if (!value) return;

    const userMsg: Msg = { role: 'user', content: value };
    setMsgs((p) => [...p, userMsg]);
    setText('');
    setIsSending(true);

    try {
      const res = await sendMessage(value, conversationCtx);
      const botMsg: Msg = { role: 'assistant', content: res.reply };
      setMsgs((p) => [...p, botMsg]);
    } finally {
      setIsSending(false);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessageToBot();
    }
  }

  return (
  <>
    {!open && (
      <div className="fixed bottom-4 right-4 z-50">
        <Launcher onOpen={() => setOpen(true)} ariaLabel="Apri chat" />
      </div>
    )}

    {open && (
      <div className="fixed inset-0 z-50 flex items-stretch justify-center md:justify-end overflow-hidden">
        <div
          className="
            w-full
            md:w-[380px] md:h-[500px] md:mb-4 md:mr-4
            flex flex-col
            ns-bg-soft border border-black/10 shadow-2xl
            rounded-none md:rounded-2xl
          "
          style={{
            // riduciamo un po' l'altezza così il footer non va sotto la barra di Safari
            height: 'calc(100vh - 72px)',
          }}
        >
          {/* HEADER */}
          <div>
            <HeaderBar
              locale={locale as any}
              onClose={() => setOpen(false)}
            />
          </div>

          {/* CHAT AREA SCROLLABILE */}
          <div className="flex-1 overflow-y-auto px-4 pt-3 pb-4 space-y-3">
            {!msgs.length && <WelcomeCard locale={locale as any} />}

            {msgs.map((m, i) => (
              <div
                key={i}
                className={`flex ${
                  m.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={
                    m.role === 'user'
                      ? 'max-w-[80%] rounded-2xl px-3 py-2 text-sm bg-black text-white'
                      : 'max-w-[80%] rounded-2xl px-3 py-2 text-sm bg-white border border-black/10'
                  }
                >
                  {m.content}
                </div>
              </div>
            ))}

            {isSending && <TypingLoader />}

            <div ref={endRef} />
          </div>

          {/* FOOTER */}
          <div className="px-3 py-2 bg-white/90 border-t border-black/10 backdrop-blur">
            <div className="flex items-center gap-2">
              <input
                className="flex-1 rounded-xl border border-black/10 px-3 py-2 text-[16px] bg-white"
                placeholder="Scrivi un messaggio..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={onKeyDown}
              />
              <button
                className="ns-sendbtn"
                disabled={!text.trim() || isSending}
                onClick={() => sendMessageToBot()}
              >
                <svg viewBox="0 0 24 24">
                  <path d="M3 11l18-8-8 18-2-8-8-2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
  </>
);
}
