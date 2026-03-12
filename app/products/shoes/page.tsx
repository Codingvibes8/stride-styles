import { createServerClient } from "@/lib/supabase";
import ShoesPageClient from "./shoes-page-client";

export default async function ShoesPage({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string }>;
}) {
  const supabase = createServerClient();
  const params = await searchParams;
  const sort = params.sort || "newest";

  let query = supabase.from("products").select("*").eq("category", "shoes");

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
    console.error("Error fetching shoes:", error);
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-semibold mb-2">Unable to load products</h2>
        <p className="text-muted-foreground text-sm">
          We&apos;re having trouble connecting to our database. Please try again later.
        </p>
      </div>
    );
  }

  return <ShoesPageClient products={products || []} />;
}
