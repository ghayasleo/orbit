import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { useRoutes } from "react-router-dom";
import { AppProviders } from "./app/providers/AppProviders";
import { StrictMode } from "react";
import { routes } from "./app/routes";

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
