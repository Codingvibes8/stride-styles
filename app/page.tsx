import HeroSection from "@/components/hero-section"
import FeaturedProducts from "@/components/featured-products"
import type { Product } from "@/lib/types"

// Mock data for featured products
const mockFeaturedProducts: Product[] = [
  {
    id: "1",
    name: "Nike Air Max 270",
    description: "Comfortable running shoes with Air Max technology for all-day comfort and style.",
    price: 129.99,
    category: "shoes",
    subcategory: "sneakers",
    images: ["/placeholder.svg?height=400&width=400"],
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: ["Black", "White", "Blue"],
    stock: 100,
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Adidas Ultraboost 22",
    description: "Premium running shoes with Boost midsole technology for energy return.",
    price: 189.99,
    category: "shoes",
    subcategory: "running",
    images: ["/placeholder.svg?height=400&width=400"],
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: ["Black", "White", "Gray"],
    stock: 75,
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Levi's 501 Original Jeans",
    description: "The original straight fit jeans that started it all.",
    price: 89.99,
    category: "clothing",
    subcategory: "jeans",
    images: ["/placeholder.svg?height=400&width=400"],
    sizes: ["30", "32", "34", "36", "38", "40"],
    colors: ["Blue", "Black", "Gray"],
    stock: 200,
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Nike Dri-FIT T-Shirt",
    description: "Moisture-wicking t-shirt perfect for workouts and casual wear.",
    price: 24.99,
    category: "clothing",
    subcategory: "t-shirts",
    images: ["/placeholder.svg?height=400&width=400"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "White", "Navy", "Gray"],
    stock: 300,
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export default async function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedProducts products={mockFeaturedProducts} />

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
            <p className="text-lg text-muted-foreground">Find exactly what you are looking for</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative h-64 rounded-lg overflow-hidden group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800"></div>
              <div className="relative z-10 h-full flex items-center justify-center text-white">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">Premium Shoes</h3>
                  <p className="text-blue-100">Step up your style game</p>
                </div>
              </div>
            </div>

            <div className="relative h-64 rounded-lg overflow-hidden group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-900"></div>
              <div className="relative z-10 h-full flex items-center justify-center text-white">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">Mens Clothing</h3>
                  <p className="text-gray-300">Elevate your wardrobe</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}