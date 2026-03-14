import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { AppProviders } from "./app/providers/app-providers";
import { createRouter } from "./app/routes";
import { Analytics } from "@vercel/analytics/react";
import { useAuthStore } from "./shared/stores/use-auth-store";

// Initialize auth once, outside React, before the first render.
// This avoids StrictMode double-calls, listener leaks, and effect race conditions.
useAuthStore.getState().initialize();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProviders>
      <Analytics />
      <RouterProvider router={createRouter()} />
    </AppProviders>
  </StrictMode>,
);
