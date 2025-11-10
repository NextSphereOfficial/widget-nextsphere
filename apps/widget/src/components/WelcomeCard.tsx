import React from "react";

type Props = {
  locale: "it" | "en";
  onAction: (id: "wifi" | "checkin" | "emergency" | "supermarket") => void;
};

const copy = {
  it: {
    title: "Benvenuti ✨",
    subtitle: "Sono Lumo by NextSphere. Ditemi cosa vi serve e ci penso io.",
    note: "Suggerimento: provate con “wifi” o “checkin”.",
    actions: {
      wifi: "Wi-Fi",
      checkin: "Check-in",
      emergency: "Emergenze",
      supermarket: "Supermercato",
    },
    aria: {
      wifi: "Apri istruzioni Wi-Fi",
      checkin: "Apri informazioni Check-in",
      emergency: "Apri contatti emergenze",
      supermarket: "Apri informazioni supermercati",
    },
    sendMap: {
      wifi: "wifi",
      checkin: "checkin",
      emergency: "emergenze",
      supermarket: "supermercato",
    },
  },
  en: {
    title: "Welcome ✨",
    subtitle: "We’re Lumo by NextSphere. Tell us what you need and we’ll take care of it.",
    note: "Tip: try “wifi” or “checkin”.",
    actions: {
      wifi: "Wi-Fi",
      checkin: "Check-in",
      emergency: "Emergencies",
      supermarket: "Supermarket",
    },
    aria: {
      wifi: "Open Wi-Fi instructions",
      checkin: "Open Check-in info",
      emergency: "Open emergency contacts",
      supermarket: "Open supermarket info",
    },
    sendMap: {
      wifi: "wifi",
      checkin: "checkin",
      emergency: "emergency",
      supermarket: "supermarket",
    },
  },
} as const;

export default function WelcomeCard({ locale, onAction }: Props) {
  const t = copy[locale] ?? copy.it;

  return (
    <div className="ns-card ns-welcome mb-3">
      <div className="ns-card-body">
        <h3 className="ns-title">{t.title}</h3>
        <p className="ns-subtitle">{t.subtitle}</p>
        <div className="ns-actions mt-4">
          {Object.entries(t.actions).map(([id, label]) => (
            <button
              key={id}
              className="ns-btn"
              onClick={() => onAction(id as keyof typeof t.actions)}
              aria-label={t.aria[id as keyof typeof t.aria]}
            >
              {label}
            </button>
          ))}
        </div>
        <p className="ns-note mt-3 text-xs text-zinc-500 dark:text-zinc-400">{t.note}</p>
      </div>
    </div>
  );
}
