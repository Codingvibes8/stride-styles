import { and, asc, desc, eq, sql } from "drizzle-orm";

import { getDb } from "@/lib/db";
import { products } from "@/lib/db/schema";
import type { Product } from "@/lib/types";

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

type ProductRow = typeof products.$inferSelect;

function toProduct(row: ProductRow): Product {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    price: Number(row.price),
    category: row.category,
    subcategory: row.subcategory,
    images: row.images,
    sizes: row.sizes,
    colors: row.colors,
    stock: row.stock,
    featured: row.featured,
    created_at: row.createdAt.toISOString(),
    updated_at: row.updatedAt.toISOString(),
  };
}

function orderBy(sort: string | undefined) {
  switch (sort) {
    case "price-asc":
      return asc(products.price);
    case "price-desc":
      return desc(products.price);
    case "name":
      return asc(products.name);
    default:
      return desc(products.createdAt);
  }
}

export type ProductQuery = {
  category?: "shoes" | "clothing";
  sort?: string;
  featured?: boolean;
  limit?: number;
};

export async function getProducts(options: ProductQuery = {}): Promise<Product[]> {
  const db = getDb();
  const filters = [];

  if (options.category) {
    filters.push(eq(products.category, options.category));
  }

  if (typeof options.featured === "boolean") {
    filters.push(eq(products.featured, options.featured));
  }

  let query = db
    .select()
    .from(products)
    .where(filters.length > 0 ? and(...filters) : undefined)
    .orderBy(orderBy(options.sort))
    .$dynamic();

  if (options.limit) {
    query = query.limit(options.limit);
  }

  const rows = await query;
  return rows.map(toProduct);
}

export async function getFeaturedProducts(limit = 4): Promise<Product[]> {
  return getProducts({ featured: true, limit });
}

export async function getProductById(id: string): Promise<Product | null> {
  if (!UUID_PATTERN.test(id)) {
    return null;
  }

  const db = getDb();
  const [row] = await db.select().from(products).where(eq(products.id, id)).limit(1);

  return row ? toProduct(row) : null;
}

export async function countProducts(): Promise<number> {
  const db = getDb();
  const [row] = await db.select({ count: sql<number>`count(*)::int` }).from(products);

  return row?.count ?? 0;
}
