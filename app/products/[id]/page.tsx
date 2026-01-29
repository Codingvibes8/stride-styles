import { createServerClient } from "@/lib/supabase";
import { notFound } from "next/navigation";
import ProductDetailClient from "./product-detail-client";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: PageProps) {
  // Extract UUID from the slug-id string or use directly if it is just a UUID
  // Assuming ID is the last 36 characters (UUID length)
  const productId = params.id.length >= 36 ? params.id.slice(-36) : params.id;
  
  const supabase = createServerClient();

  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", productId)
    .single();

  if (error || !product) {
    console.error("Error fetching product:", error);
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
