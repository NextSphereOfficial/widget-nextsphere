import React from "react";
import IconLumo from "./IconLumo";

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
      <IconLumo size={20} />
      {showUnread && <span className="ns-launcher__badge" aria-hidden />}
    </button>
  );
}
