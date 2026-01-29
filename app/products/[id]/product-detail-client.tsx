"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, ShoppingCart, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/hooks/use-cart";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes?.[0] || ""
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors?.[0] || ""
  );
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [activeImage, setActiveImage] = useState(product.images?.[0] || "");

  const handleAddToCart = async () => {
    if (!selectedSize || !selectedColor) return;

    setIsLoading(true);
    try {
      await addItem(product, selectedSize, selectedColor, quantity);
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 border">
            {activeImage ? (
              <Image
                src={activeImage}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                No image available
              </div>
            )}
            {product.featured && (
              <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                Featured
              </Badge>
            )}
          </div>
          {product.images && product.images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(image)}
                  className={cn(
                    "relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all",
                    activeImage === image
                      ? "border-primary"
                      : "border-transparent hover:border-gray-200"
                  )}
                >
                  <Image
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className="text-xs">
                {product.category}
              </Badge>
              {product.subcategory && (
                <Badge variant="outline" className="text-xs">
                  {product.subcategory}
                </Badge>
              )}
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
              {product.name}
            </h1>
            <div className="mt-4 flex items-end gap-4">
              <p className="text-3xl font-bold text-primary">
                {formatPrice(product.price)}
              </p>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Description</h3>
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="space-y-4">
            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Size</h3>
                  <span className="text-sm text-muted-foreground">
                    Selected: {selectedSize}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "default" : "outline"}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "h-10 w-12",
                        selectedSize === size && "ring-2 ring-primary ring-offset-2"
                      )}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selector */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Color</h3>
                  <span className="text-sm text-muted-foreground">
                    Selected: {selectedColor}
                  </span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={cn(
                        "relative h-10 w-10 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                        selectedColor === color && "ring-2 ring-primary ring-offset-2"
                      )}
                      style={{ backgroundColor: color.toLowerCase() }}
                      title={color}
                    >
                      {selectedColor === color && (
                        <Check className={cn("h-6 w-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2", 
                          ["white", "yellow", "beige"].includes(color.toLowerCase()) ? "text-black" : "text-white"
                        )} />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Separator />

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <div className="flex items-center border rounded-md w-fit">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-none rounded-l-md"
                onClick={decrementQuantity}
                disabled={quantity <= 1}
              >
                -
              </Button>
              <div className="w-12 text-center font-medium">{quantity}</div>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-none rounded-r-md"
                onClick={incrementQuantity}
              >
                +
              </Button>
            </div>

            <Button
              className="flex-1 h-12 text-lg bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
              size="lg"
              onClick={handleAddToCart}
              disabled={isLoading || !selectedSize || !selectedColor}
            >
              {isLoading ? (
                "Adding..."
              ) : (
                <>
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </>
              )}
            </Button>
            <Button variant="outline" size="icon" className="h-12 w-12">
              <Heart className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg mt-4 text-sm text-muted-foreground">
             <p className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" /> Free shipping on orders over $100
             </p>
             <p className="flex items-center gap-2 mt-2">
                <Check className="h-4 w-4 text-green-500" /> 30-day return policy
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
