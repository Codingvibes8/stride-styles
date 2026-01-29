
import HeroSection from "@/components/hero-section";
import FeaturedProducts from "@/app/components/featured-products";
import { createServerClient } from '@/lib/supabase';
import { Product } from '@/lib/types';

export default async function HomePage() {
  const supabase = createServerClient();
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .eq('featured', true)
    .returns<Product[]>();

  if (error) {
    console.error('Error fetching featured products:', error);
  }

  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedProducts products={products || []} />

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

