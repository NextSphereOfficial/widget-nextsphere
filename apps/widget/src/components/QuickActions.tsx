import React from "react";

export type QuickItem = { id: string; label: string; aria?: string };

type Props = {
  items: QuickItem[];
  onClick: (id: string) => void;
  disabled?: boolean;
};

export default function QuickActions({ items, onClick, disabled }: Props) {
  if (!items?.length) return null;
  return (
    <div className="ns-quickbar">
      {items.map((it) => (
        <button
          key={it.id}
          className="ns-chip"
          onClick={() => onClick(it.id)}
          disabled={disabled}
          aria-label={it.aria || it.label}
          title={it.label}
          type="button"
        >
          {it.label}
        </button>
      ))}
    </div>
  );
}
