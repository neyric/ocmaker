import { prefix, type RouteConfig } from "@react-router/dev/routes";
import { flatRoutes } from "@react-router/fs-routes";

// API related routes
const api = await flatRoutes({ rootDirectory: "./routes/_api/basic" });
const webhook = await flatRoutes({ rootDirectory: "./routes/_api/webhooks" });
const callback = await flatRoutes({ rootDirectory: "./routes/_api/callback" });

// Meta information routes
const meta = await flatRoutes({ rootDirectory: "./routes/_meta" });
const legal = await flatRoutes({ rootDirectory: "./routes/_legal" });

// Page routes
const base = await flatRoutes({ rootDirectory: "./routes/base" });

const routes: RouteConfig = [
  ...prefix("api", api),
  ...prefix("webhooks", webhook),
  ...prefix("callback", callback),
  ...prefix("legal", legal),
  ...prefix(":lang?", base),
  ...meta,
];

export default routes;
