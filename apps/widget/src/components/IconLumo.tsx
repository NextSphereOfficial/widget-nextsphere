import React from "react";

type Props = { size?: number; title?: string };

export default function IconLumo({ size = 20, title = "Lumo" }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      role="img"
      aria-label={title}
    >
      <defs>
        <linearGradient id="nsGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4dc7d9" />
          <stop offset="100%" stopColor="#66a6ff" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="22" fill="url(#nsGrad)" />
      <path
        d="M24 13c.6 0 1 .4 1 1v8h8a1 1 0 010 2h-8v8a1 1 0 01-2 0v-8h-8a1 1 0 010-2h8v-8c0-.6.4-1 1-1z"
        fill="white"
      />
    </svg>
  );
}
