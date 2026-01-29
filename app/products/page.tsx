import { createServerClient } from "@/lib/supabase";
import ProductsPageClient from "./products-page-client";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; sort?: string }>;
}) {
  const supabase = createServerClient();
  const params = await searchParams;
  const category = params.category || "all";
  const sort = params.sort || "newest";

  let query = supabase.from("products").select("*");

  if (category && category !== "all") {
    query = query.eq("category", category);
  }

  switch (sort) {
    case "price-asc":
      query = query.order("price", { ascending: true });
      break;
    case "price-desc":
      query = query.order("price", { ascending: false });
      break;
    case "name":
      query = query.order("name", { ascending: true });
      break;
    default:
      query = query.order("created_at", { ascending: false });
      break;
  }

  const { data: products, error } = await query;

  if (error) {
    console.error("Error fetching products:", error);
    return <div>Error loading products.</div>;
  }

  return <ProductsPageClient products={products} />;
}