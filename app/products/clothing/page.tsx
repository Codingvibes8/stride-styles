import { createServerClient } from "@/lib/supabase";
import ClothingPageClient from "./clothing-page-client";

export default async function ClothingPage({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string }>;
}) {
  const supabase = createServerClient();
  const params = await searchParams;
  const sort = params.sort || "newest";

  let query = supabase.from("products").select("*").eq("category", "clothing");

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
    console.error("Error fetching clothing:", error);
    return <div>Error loading products.</div>;
  }

  return <ClothingPageClient products={products || []} />;
}
