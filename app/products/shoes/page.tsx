import { getProducts } from "@/lib/db/queries";
import ShoesPageClient from "./shoes-page-client";

export const dynamic = "force-dynamic";

export default async function ShoesPage({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string }>;
}) {
  const params = await searchParams;
  const sort = params.sort || "newest";

  try {
    const products = await getProducts({ category: "shoes", sort });
    return <ShoesPageClient products={products} />;
  } catch (error) {
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
}
