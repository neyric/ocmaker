import { cloudflare } from "@cloudflare/vite-plugin";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
  ],
  server: {
    host: "0.0.0.0",
  },
  resolve: {
    alias: {
      "zod/v4/core": "zod",
    },
  },
  optimizeDeps: {
    include: ["zod", "@hookform/resolvers"],
  },
});
