
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/stride-hero.jpg?height=800&width=1200"
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 text-center text-gray-800 max-w-4xl mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Step Into Style</h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-900">
          Discover premium shoes and mens clothing that define your stride
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="text-lg px-8 py-3 bg-blue-700 text-white font-bold hover:bg-blue-300 hover:text-gray-900">
            <Link href="/products/shoes">Shop Shoes</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-lg px-8 py-3 bg-white/10 border-white text-white hover:bg-white hover:text-black"
          >
            <Link href="/products/clothing">Shop Clothing</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
