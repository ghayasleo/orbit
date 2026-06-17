// SSR entry point — must export `render`; Fast Refresh does not apply here.
/* eslint-disable react-refresh/only-export-components */
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { useRoutes } from "react-router-dom";
import { AppProviders } from "@/app/providers/app-providers";
import { StrictMode } from "react";
import { routes } from "@/app/router";

function AppRoutes() {
  return useRoutes(routes);
}

export function render() {
  return renderToString(
    <StrictMode>
      <AppProviders>
        <StaticRouter location="/">
          <AppRoutes />
        </StaticRouter>
      </AppProviders>
    </StrictMode>,
  );
}
