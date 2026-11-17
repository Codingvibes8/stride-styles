import { getProductById } from "@/lib/db/queries";
import { notFound } from "next/navigation";
import ProductDetailClient from "./product-detail-client";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  // Extract UUID from the slug-id string or use directly if it is just a UUID
  // Assuming ID is the last 36 characters (UUID length)
  const productId = id.length >= 36 ? id.slice(-36) : id;

  const product = await getProductById(productId);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
