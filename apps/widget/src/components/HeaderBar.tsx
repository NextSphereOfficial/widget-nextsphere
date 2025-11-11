import React from "react";
import IconLumo from "./IconLumo";

type Props = {
  locale: "it" | "en";
  onClose: () => void;
};

export default function HeaderBar({ locale, onClose }: Props) {
  return (
    <header className="ns-header" role="banner">
      <div className="ns-header__brand">
        <span className="ns-header__icon">
          <IconLumo size={18} />
        </span>
        <div className="ns-header__titles">
          <strong className="ns-header__title">Lumo</strong>
          <span className="ns-header__subtitle">by NextSphere</span>
        </div>
      </div>
      <button
        className="ns-header__close"
        aria-label={locale === "en" ? "Close chat" : "Chiudi chat"}
        onClick={onClose}
        type="button"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M6 6l12 12M18 6L6 18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </header>
  );
}
