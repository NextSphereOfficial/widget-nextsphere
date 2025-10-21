import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/index.css";

// 1) API URL: priorità a window.VITE_API_URL, poi ENV di Vite
const API_URL =
  (window as any).VITE_API_URL ??
  import.meta.env.VITE_API_URL ??
  import.meta.env.VITE_API_BASE ??
  "";

// 2) Esponi globalmente (utile per altri moduli)
declare global {
  interface Window {
    VITE_API_URL?: string;
  }
}
if (API_URL) (window as any).VITE_API_URL = API_URL;

// 3) Trova/crea il container di montaggio
function ensureContainer(): HTMLElement {
  const ids = [
    "nx-widget",
    "ns-concierge-widget-root",
    "ns-concierge-widget",
    "ns_widget",
    "app",
    "root",
  ];
  for (const id of ids) {
    const el = document.getElementById(id);
    if (el) return el;
  }
  const el = document.createElement("div");
  el.id = "nx-widget";
  Object.assign(el.style, { position: "relative", zIndex: "2147483000" });
  document.body.appendChild(el);
  return el;
}

const container = ensureContainer();
createRoot(container).render(<App />);
