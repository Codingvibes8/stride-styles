"use client"

import { useState } from "react"
import Image from "next/image"
import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { formatPrice } from "@/lib/utils"
import type { CartItem } from "@/lib/types"

interface CartItemComponentProps {
    item: CartItem
}

export default function CartItemComponent({ item }: CartItemComponentProps) {
    const { updateQuantity, removeItem } = useCart()
    const [isUpdating, setIsUpdating] = useState(false)

    const handleQuantityChange = (newQuantity: number) => {
        if (newQuantity < 1) return

        setIsUpdating(true)
        try {
            updateQuantity(item.id, newQuantity)
        } finally {
            setIsUpdating(false)
        }
    }

    const handleRemove = () => {
        setIsUpdating(true)
        try {
            removeItem(item.id)
        } finally {
            setIsUpdating(false)
        }
    }

    return (
        <div className="flex items-center space-x-4 py-6">
            {/* Product Image */}
            <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                    {item.product?.images?.[0] ? (
                        <Image
                            src={item.product.images[0]}
                            alt={item.product.name || "Product"}
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <span className="text-xs">No image</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Product Details */}
            <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-gray-900 truncate">
                    {item.product?.name || 'Unknown Product'}
                </h3>
                <div className="mt-1 text-sm text-gray-500">
                    {item.size && <span>Size: {item.size}</span>}
                    {item.size && item.color && <span className="mx-2">•</span>}
                    {item.color && <span>Color: {item.color}</span>}
                </div>
                <p className="mt-1 text-sm font-medium text-gray-900">
                    {formatPrice(item.product?.price || 0)}
                </p>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center space-x-2">
                <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleQuantityChange(item.quantity - 1)}
                    disabled={isUpdating || item.quantity <= 1}
                >
                    <Minus className="h-3 w-3" />
                </Button>

                <span className="w-8 text-center text-sm font-medium">
                    {item.quantity}
                </span>

                <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleQuantityChange(item.quantity + 1)}
                    disabled={isUpdating}
                >
                    <Plus className="h-3 w-3" />
                </Button>
            </div>

            {/* Total Price */}
            <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                    {formatPrice((item.product?.price || 0) * item.quantity)}
                </p>
            </div>

            {/* Remove Button */}
            <div className="flex-shrink-0">
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-400 hover:text-red-500"
                    onClick={handleRemove}
                    disabled={isUpdating}
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}