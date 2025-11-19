import React from "react";
import logoLumo from "../assets/logo-lumo.png";

type Props = {
  onOpen: () => void;
  ariaLabel?: string;
  showUnread?: boolean;
};

export default function Launcher({ onOpen, ariaLabel, showUnread = false }: Props) {
  return (
    <button
      type="button"
      className="ns-launcher"
      onClick={onOpen}
      aria-label={ariaLabel || "Apri chat"}
    >
      <img
        src={logoLumo}
        alt={ariaLabel || "Lumo"}
        className="ns-launcher__icon"
      />
      {showUnread && <span className="ns-launcher__badge" aria-hidden />}
    </button>
  );
}
