import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "./schema";

/**
 * Lazily create the Drizzle client so importing this module during a build
 * (where DATABASE_URL may not exist yet) does not throw.
 */
let client: ReturnType<typeof createClient> | null = null;

function createClient() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is not set. Add it to .env.local (see .env.example).");
  }

  return drizzle(neon(connectionString), { schema });
}

export function getDb() {
  if (!client) {
    client = createClient();
  }

  return client;
}

export type Database = ReturnType<typeof createClient>;
export { schema };
