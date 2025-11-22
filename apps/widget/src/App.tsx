import React, { useEffect, useMemo, useRef, useState } from 'react';
import { getInitialContext } from './utils/params';
import { sendMessage } from './services/chatClient';

import WelcomeCard from './components/WelcomeCard';
import TypingLoader from './components/TypingLoader';
import HeaderBar from './components/HeaderBar';
import Launcher from './components/Launcher';

type Msg = { role: 'user' | 'assistant'; content: string };

export default function App() {
  // Contesto iniziale da URL (hotel, room, lang/locale)
  const ctx = getInitialContext(); // { hotel, room, langParam, locale }
  const locale = useMemo(() => ctx.locale, []);
  const conversationCtx = useMemo(
    () => ({
      hotel: ctx.hotel,
      room: ctx.room,
      locale: ctx.locale,
    }),
    [],
  );

  // UI strings localizzate
  const t = useMemo(
    () =>
      locale === 'en'
        ? {
            title: 'NextSphere',
            placeholder: 'Type a message...',
            send: 'Send',
            serverError: "Oops, I can't reach the server 😅",
          }
        : {
            title: 'NextSphere',
            placeholder: 'Scrivi un messaggio...',
            send: 'Invia',
            serverError: 'Ops, non riesco a contattare il server 😅',
          },
    [locale],
  );

  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [text, setText] = useState('');
  const endRef = useRef<HTMLDivElement>(null);
  const [isSending, setIsSending] = useState(false);

  
  // Autoscroll all'ultimo messaggio
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs]);

  // Invio messaggio con gestione isSending
  async function send(textOverride?: string) {
    const value = (textOverride ?? text).trim();
    if (!value) return;

    const userMsg: Msg = { role: 'user', content: value };
    setMsgs((prev) => [...prev, userMsg]);
    setText('');
    setIsSending(true);

    try {
      const res = await sendMessage(value, conversationCtx);
      const botMsg: Msg = { role: 'assistant', content: res.reply };
      setMsgs((prev) => [...prev, botMsg]);
    } catch (err: any) {
      console.error(err);
      const fallback: Msg = {
        role: 'assistant',
        content: t.serverError,
      };
      setMsgs((prev) => [...prev, fallback]);
    } finally {
      setIsSending(false);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }



  return (
    <div className="fixed bottom-2 right-2 md:bottom-4 md:right-4 z-50">

      {!open && (
        <Launcher
          onOpen={() => setOpen(true)}
          ariaLabel={locale === 'en' ? 'Open chat' : 'Apri chat'}
          showUnread={false} // in futuro potrai usare un badge se vuoi
        />
      )}

      {open && (
        <div
          className="
              w-[92vw] max-w-[380px]
              h-[70vh] max-h-[70vh]
              md:h-[500px] md:max-h-[500px]
              rounded-2xl shadow-2xl ns-bg-soft border border-black/5 flex flex-col  "
>

          {/* Header */}
          <HeaderBar
            locale={locale as 'it' | 'en'}
            onClose={() => setOpen(false)}
          />

          {/* Area messaggi */}
          <div className="flex-1 overflow-auto p-4 space-y-3 chat-scroll">
            {/* WelcomeCard quando non ci sono messaggi */}
                        {!msgs.length && (
              <WelcomeCard locale={locale as 'it' | 'en'} />
            )}


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
                      ? 'max-w-[85%] rounded-2xl px-3 py-2 text-sm md:text-[0.95rem] leading-snug bg-black text-white shadow-sm'
                      : 'max-w-[85%] rounded-2xl px-3 py-2 text-sm md:text-[0.95rem] leading-snug bg-white border border-black/10 shadow-sm'
                  }
                >
                  {m.content}
                </div>
              </div>
            ))}

            {/* Loader durante invio */}
            {isSending && (
              <div>
                <TypingLoader />
              </div>
            )}

            <div ref={endRef} />
          </div>

          {/* Quick actions + input */}
          <div className="border-t border-black/5 bg-white/80 px-3 py-2 space-y-2">
          

            <div className="flex items-center gap-2">
              <input
                className="flex-1 rounded-xl border border-black/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/10 bg-white/90"
                placeholder={t.placeholder}
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={onKeyDown}
              />
                            <button
                className="ns-sendbtn"
                onClick={() => send()}
                disabled={!text.trim() || isSending}
                aria-label={
                  locale === 'en' ? 'Send message' : 'Invia messaggio'
                }
                title={
                  locale === 'en'
                    ? 'Press Enter to send'
                    : 'Premi Invio per inviare'
                }
                type="button"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M3 11l18-8-8 18-2-8-8-2z" />
                </svg>
              </button>

           
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
