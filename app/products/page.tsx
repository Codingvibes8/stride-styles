import { getProducts } from "@/lib/db/queries";
import { Product } from "@/lib/types";
import ProductsPageClient from "./products-page-client";

export const dynamic = "force-dynamic";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; sort?: string }>;
}) {
  const params = await searchParams;
  const sort = params.sort || "newest";
  const category =
    params.category === "shoes" || params.category === "clothing"
      ? params.category
      : undefined;

  let products: Product[];

  try {
    products = await getProducts({ category, sort });
  } catch (error) {
    console.error("Error fetching products:", error);
    return <div>Error loading products.</div>;
  }

  return <ProductsPageClient products={products} />;
}
