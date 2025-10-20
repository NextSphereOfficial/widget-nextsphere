import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/index.css";

// Legge l'API URL dalla finestra o dall'ambiente di Vite
const API_URL =
  (window as any).VITE_API_URL ?? import.meta.env.VITE_API_URL ?? "";

// Espone la variabile a livello globale (opzionale ma utile)
declare global {
  interface Window {
    VITE_API_URL?: string;
  }
}

// Trova o crea il container di montaggio
function ensureContainer(): HTMLElement {
  const candidates = [
    "nx-widget", // tuo id originale
    "ns-concierge-widget-root",
    "ns-concierge-widget",
    "ns_widget",
    "app",
    "root",
  ];
  for (const id of candidates) {
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
const root = createRoot(container);
root.render(<App />);
