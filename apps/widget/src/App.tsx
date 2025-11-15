import React, { useEffect, useMemo, useRef, useState } from 'react';
import { getInitialContext } from './utils/params';
import { sendMessage } from './services/chatClient';

import WelcomeCard from './components/WelcomeCard';
import QuickActions, { QuickItem } from './components/QuickActions';
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

  // Quick actions localizzate
  const quickItems: QuickItem[] = useMemo(
    () =>
      locale === 'en'
        ? [
            { id: 'wifi', label: 'Wi-Fi' },
            { id: 'checkin', label: 'Check-in' },
            { id: 'emergency', label: 'Emergencies' },
            { id: 'supermarket', label: 'Supermarket' },
          ]
        : [
            { id: 'wifi', label: 'Wi-Fi' },
            { id: 'checkin', label: 'Check-in' },
            { id: 'emergency', label: 'Emergenze' },
            { id: 'supermarket', label: 'Supermercato' },
          ],
    [locale],
  );

  const sendMap = (id: QuickItem['id']) => {
    if (locale === 'en') {
      return (
        {
          wifi: 'wifi',
          checkin: 'checkin',
          emergency: 'emergency',
          supermarket: 'supermarket',
        } as const
      )[id];
    }
    return (
      {
        wifi: 'wifi',
        checkin: 'checkin',
        emergency: 'emergenze',
        supermarket: 'supermercato',
      } as const
    )[id];
  };

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

  // Handler tipizzato per le quick actions
  const handleQuickAction = async (id: QuickItem['id']) => {
    await send(sendMap(id));
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!open && (
        <Launcher
          onOpen={() => setOpen(true)}
          ariaLabel={locale === 'en' ? 'Open chat' : 'Apri chat'}
          showUnread={false} // in futuro potrai usare un badge se vuoi
        />
      )}

      {open && (
        <div className="w-96 max-w-[92vw] h-96 rounded-2xl shadow-2xl bg-white/80 backdrop-blur-md border border-black/5 flex flex-col">
          {/* Header */}
          <HeaderBar
            locale={locale as 'it' | 'en'}
            onClose={() => setOpen(false)}
          />

          {/* Area messaggi */}
          <div className="flex-1 overflow-auto p-4 space-y-3 chat-scroll">
            {/* WelcomeCard quando non ci sono messaggi */}
            {msgs.length === 0 && (
              <WelcomeCard
                locale={locale as 'it' | 'en'}
                onAction={(id) => handleQuickAction(id)}
              />
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
            <QuickActions
              items={quickItems}
              onClick={(id: QuickItem['id']) => {
                void handleQuickAction(id);
              }}
              disabled={isSending}
            />

            <div className="flex items-center gap-2">
              <input
                className="flex-1 rounded-xl border border-black/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/10 bg-white/90"
                placeholder={t.placeholder}
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={onKeyDown}
              />
              <button
                className="rounded-xl bg-black text-white text-sm px-3 py-2 disabled:opacity-40 disabled:cursor-not-allowed"
                onClick={() => send()}
                disabled={!text.trim()}
                aria-label={
                  locale === 'en' ? 'Send message' : 'Invia messaggio'
                }
                title={
                  locale === 'en'
                    ? 'Press Enter to send'
                    : 'Premi Invio per inviare'
                }
              >
                {t.send}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
