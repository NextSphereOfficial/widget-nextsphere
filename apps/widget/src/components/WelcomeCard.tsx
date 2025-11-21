import React from "react";

type Props = {
  locale: "it" | "en";
};

const copy = {
  it: {
    title: "Benvenuti ✨",
    subtitle:
      "Sono Lumo by NextSphere. Scrivetemi qualsiasi domanda sul vostro soggiorno e vi aiuterò.",
  },
  en: {
    title: "Welcome ✨",
    subtitle:
      "I’m Lumo by NextSphere. Ask me anything about your stay and I’ll help.",
  },
} as const;

export default function WelcomeCard({ locale }: Props) {
  const t = copy[locale] ?? copy.it;

  return (
    <div className="ns-card ns-welcome mb-3">
      <div className="ns-card-body">
        <h3 className="ns-title">{t.title}</h3>
        <p className="ns-subtitle">{t.subtitle}</p>
      </div>
    </div>
  );
}


