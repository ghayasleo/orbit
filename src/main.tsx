import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { AppProviders } from "./app/providers/AppProviders";
import { createRouter } from "./app/routes";
import { Analytics } from "@vercel/analytics/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProviders>
      <Analytics />
      <RouterProvider router={createRouter()} />
    </AppProviders>
  </StrictMode>,
);
