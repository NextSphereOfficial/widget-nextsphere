import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/index.css";
import * as Sentry from "@sentry/react";

// ------- Sentry (safe init via env) -------
const SENTRY_DSN =
  (window as any).VITE_SENTRY_DSN ?? import.meta.env.VITE_SENTRY_DSN;

if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,
    environment: import.meta.env.MODE ?? "production",
    release: import.meta.env.VITE_COMMIT_SHA ?? "dev",
    tracesSampleRate: 0.0,
    sendDefaultPii: true,
    beforeSend(event: any, hint?: any) {
      const msg =
        event?.message ??
        event?.logentry?.message ??
        hint?.originalException?.message ??
        "";

      if (
        typeof msg === "string" &&
        (msg.includes("ResizeObserver") || msg.includes("Non-Error exception"))
      ) {
        return null;
      }
      return event;
    },
  });
}



// ------- API base URL -------
const API_URL =
  (window as any).VITE_API_URL ?? import.meta.env.VITE_API_URL ?? "";

// (opzionale) esponi anche su window per debug/override runtime
declare global {
  interface Window {
    VITE_API_URL?: string;
    VITE_SENTRY_DSN?: string;
  }
}
if (API_URL && !(window as any).VITE_API_URL) {
  (window as any).VITE_API_URL = API_URL;
}

// ------- Mount -------
function ensureContainer(): HTMLElement {
  const candidates = [
    "nx-widget",
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
