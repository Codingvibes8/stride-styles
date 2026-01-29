"use client"
import { useState, type MouseEvent } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type { Product } from "@/lib/types"
import { formatPrice, generateSlug } from "@/lib/utils"
import { useCart } from "@/hooks/use-cart"


interface ProductCardProps {
  product: Product
}

function SizeSelector({
  sizes,
  selectedSize,
  setSelectedSize,
}: {
  sizes: string[]
  selectedSize: string
  setSelectedSize: (size: string) => void
}) {
  if (sizes.length === 0) return null
  return (
    <div className="mb-3">
      <label className="text-xs font-medium text-muted-foreground mb-1 block">Size</label>
      <div className="flex gap-1 flex-wrap">
        {sizes.slice(0, 4).map((size) => (
          <Button
            key={size}
            variant={selectedSize === size ? "default" : "outline"}
            size="sm"
            className="h-8 px-2 text-xs"
            onClick={(e) => {
              e.preventDefault()
              setSelectedSize(size)
            }}
          >
            {size}
          </Button>
        ))}
      </div>
    </div>
  )
}

function ColorSelector({
  colors,
  selectedColor,
  setSelectedColor,
}: {
  colors: string[]
  selectedColor: string
  setSelectedColor: (color: string) => void
}) {
  if (colors.length === 0) return null
  return (
    <div className="mb-4">
      <label className="text-xs font-medium text-muted-foreground mb-1 block">Color</label>
      <div className="flex gap-1">
        {colors.slice(0, 4).map((color) => (
          <button
            key={color}
            className={`w-6 h-6 rounded-full border-2 ${
              selectedColor === color ? "border-primary" : "border-gray-300"
            }`}
            style={{ backgroundColor: color.toLowerCase() }}
            onClick={(e) => {
              e.preventDefault()
              setSelectedColor(color)
            }}
            title={color}
          />
        ))}
      </div>
    </div>
  )
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "")
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || "")

  const handleAddToCart = async (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!selectedSize || !selectedColor) return

    setIsLoading(true)
    try {
      await addItem(product, selectedSize, selectedColor, 1)
    } catch (error) {
      console.error("Error adding to cart:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const productUrl = `/products/${generateSlug(product.name)}-${product.id}`

  return (
    <Card className="group overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300">
      <Link href={productUrl}>
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image
            src={product.images[0] || "/placeholder.svg?height=400&width=400"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {product.featured && <Badge className="absolute top-2 left-2 bg-primary">Featured</Badge>}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </Link>

      <CardContent className="p-4">
        <Link href={productUrl}>
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{product.description}</p>

        <div className="flex items-center justify-between mb-3">
          <span className="font-bold text-xl">{formatPrice(product.price)}</span>
          <Badge variant="secondary" className="text-xs">
            {product.category}
          </Badge>
        </div>

        <SizeSelector
          sizes={product.sizes}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
        />

        <ColorSelector
          colors={product.colors}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />

        <Button className="w-full" onClick={handleAddToCart} disabled={isLoading || !selectedSize || !selectedColor}>
          <ShoppingCart className="h-4 w-4 mr-2" />
          {isLoading ? "Adding..." : "Add to Cart"}
        </Button>
      </CardContent>
    </Card>
  )
}
