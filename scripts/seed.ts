import { config } from "dotenv";
import { sql } from "drizzle-orm";

import { catalogProducts } from "../constants/catalog";
import { getDb } from "../lib/db";
import { products } from "../lib/db/schema";

// Load env before the lazy database client is created.
config({ path: ".env.local" });
config();

async function main() {
  const db = getDb();
  const reset = process.argv.includes("--reset");

  const [row] = await db.select({ count: sql<number>`count(*)::int` }).from(products);
  const existing = row?.count ?? 0;

  if (existing > 0 && !reset) {
    console.log(
      `products already contains ${existing} row(s). Nothing to do. Re-run with --reset to replace the data.`
    );
    return;
  }

  if (existing > 0 && reset) {
    console.log("Deleting existing products (cascades to cart/order items)...");
    await db.delete(products);
  }

  await db.insert(products).values(catalogProducts);
  console.log(`Seeded ${catalogProducts.length} products.`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  });
