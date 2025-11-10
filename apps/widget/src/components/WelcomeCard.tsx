import React from "react";

type Props = {
  locale: "it" | "en";
  onAction: (id: "wifi" | "checkin" | "emergency" | "supermarket") => void;
};

const copy = {
  it: {
    title: "Benvenuti ✨",
    subtitle: "Sono Lumo by NextSphere. Ditemi cosa vi serve e ci penso io.",
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
  },
  en: {
    title: "Welcome ✨",
    subtitle: "We’re Lumo by NextSphere. Tell us what you need and we’ll take care of it.",
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
  },
} as const;

export default function WelcomeCard({ locale, onAction }: Props) {
  const t = copy[locale] ?? copy.it;

  return (
    <div className="ns-card ns-welcome mb-3">
      <div className="ns-card-body">
        <h3 className="ns-title">{t.title}</h3>
        <p className="ns-subtitle">{t.subtitle}</p>

        <div className="ns-actions ns-actions--wrap mt-3">
          {Object.entries(t.actions).map(([id, label]) => (
            <button
              key={id}
              className="ns-btn ns-btn--sm"
              onClick={() => onAction(id as keyof typeof t.actions)}
              aria-label={t.aria[id as keyof typeof t.aria]}
              type="button"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
