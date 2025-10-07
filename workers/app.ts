import {
  createContext,
  createRequestHandler,
  RouterContextProvider,
} from "react-router";

declare module "react-router" {
  export interface AppLoadContext {
    cloudflare: {
      env: Env;
      ctx: ExecutionContext;
    };
  }
}

const requestHandler = createRequestHandler(
  () => import("virtual:react-router/server-build"),
  import.meta.env.MODE,
);

const cloudflareEnv = createContext<Env>();

export default {
  async fetch(request, env) {
    const context = new RouterContextProvider();
    context.set(cloudflareEnv, env);

    return requestHandler(request, context);
  },
} satisfies ExportedHandler<Env>;
