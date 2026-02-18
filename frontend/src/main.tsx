/**
 * Application entry point.
 */
import React from "react";
import ReactDOM from "react-dom/client";
import * as Sentry from "@sentry/react";
import App from "./App.tsx";
import "./index.css";

// Initialize Sentry for error tracking
if (import.meta.env.VITE_SENTRY_DSN) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    environment: import.meta.env.VITE_ENVIRONMENT || "development",
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration(),
    ],
    tracesSampleRate: 1.0, // Capture 100% of transactions for performance monitoring
    replaysSessionSampleRate: 0.1, // Sample 10% of sessions for replay
    replaysOnErrorSampleRate: 1.0, // Sample 100% of sessions with errors
  });
  console.log("✅ Sentry monitoring initialized");
} else {
  console.log("ℹ️ Sentry monitoring disabled (no DSN provided)");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
