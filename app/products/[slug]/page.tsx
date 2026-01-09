import { notFound } from "next/navigation"
import type { Metadata } from "next"
import ProductDetailClient from "@/components/product-detail-client"
import RelatedProducts from "@/components/related-products"
import { getProductBySlug, getRelatedProducts } from "@/lib/products"

interface ProductPageProps {
  params: {
    slug: string
  }
}

export const dynamic = "force-dynamic"

export default async function ProductPage({ params }: ProductPageProps) {
  try {
    const product = await getProductBySlug(params.slug)

    if (!product) {
      console.log("Product not found for slug:", params.slug)
      notFound()
    }

    const relatedProducts = await getRelatedProducts(product.id, product.category, product.subcategory)

    return (
      <div className="min-h-screen bg-white">
        <ProductDetailClient product={product} />
        <RelatedProducts products={relatedProducts} />
      </div>
    )
  } catch (error) {
    console.error("Error loading product page:", error)
    notFound()
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  try {
    const product = await getProductBySlug(params.slug)

    if (!product) {
      return {
        title: "Product Not Found - Stride & Style",
        description: "The product you're looking for could not be found.",
      }
    }

    return {
      title: `${product.name} - Stride & Style`,
      description: product.description,
      keywords: [
        product.name,
        product.category,
        product.subcategory,
        "stride & style",
        "premium",
        "fashion",
        "shoes",
        "clothing",
      ].join(", "),
      openGraph: {
        title: `${product.name} - Stride & Style`,
        description: product.description,
        images: product.images.map((image) => ({
          url: image,
          width: 600,
          height: 600,
          alt: product.name,
        })),
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: `${product.name} - Stride & Style`,
        description: product.description,
        images: product.images[0] ? [product.images[0]] : [],
      },
    }
  } catch (error) {
    console.error("Error generating metadata:", error)
    return {
      title: "Product - Stride & Style",
      description: "Shop premium fashion at Stride & Style",
    }
  }
}
