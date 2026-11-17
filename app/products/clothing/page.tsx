import { getProducts } from "@/lib/db/queries";
import ClothingPageClient from "./clothing-page-client";

export const dynamic = "force-dynamic";

export default async function ClothingPage({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string }>;
}) {
  const params = await searchParams;
  const sort = params.sort || "newest";

  try {
    const products = await getProducts({ category: "clothing", sort });
    return <ClothingPageClient products={products} />;
  } catch (error) {
    console.error("Error fetching clothing:", error);
    return <div>Error loading products.</div>;
  }
}
