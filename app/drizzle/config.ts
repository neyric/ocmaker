import { defineConfig } from "drizzle-kit";
import { loadEnv } from "vite";

const env = loadEnv("production", process.cwd(), "");

const credentials = {
  accountId: env.ACCOUNT_ID,
  databaseId: env.DATABASE_ID,
  token: env.ACCOUNT_TOKEN,
};

if (!credentials.accountId || !credentials.databaseId || !credentials.token) {
  throw new Error("Unvalid connect url");
}

export default defineConfig({
  schema: "./app/drizzle/schema.ts",
  out: "./app/drizzle/migrations",
  dialect: "sqlite",
  driver: "d1-http",
  dbCredentials: credentials,
});
