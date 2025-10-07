import { env } from "cloudflare:workers";

import { drizzle } from "drizzle-orm/d1";
import * as schema from "~/drizzle/schema";

export * from "~/drizzle/schema";

function connectDB() {
  const db = drizzle(env.DB, { schema });

  return db;
}

export { schema, connectDB };
