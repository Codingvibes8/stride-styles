"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { CartItem, Product } from "@/lib/types"

interface CartStore {
    items: CartItem[]
    isLoading: boolean

    addItem: (product: Product, size: string, color: string, quantity?: number) => void
    removeItem: (itemId: string) => void
    updateQuantity: (itemId: string, quantity: number) => void
    clearCart: () => void
    getTotalPrice: () => number
    getTotalItems: () => number
}

export const useCart = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            isLoading: false,

            addItem: (product: Product, size: string, color: string, quantity = 1) => {
                const existingItem = get().items.find(
                    (item) => item.product_id === product.id && item.size === size && item.color === color,
                )

                if (existingItem) {
                    set({
                        items: get().items.map((item) =>
                            item.id === existingItem.id ? { ...item, quantity: item.quantity + quantity } : item,
                        ),
                    })
                } else {
                    const newItem: CartItem = {
                        id: `temp-${Date.now()}-${Math.random()}`,
                        product_id: product.id,
                        user_id: "guest",
                        quantity,
                        size,
                        color,
                        created_at: new Date().toISOString(),
                        product,
                    }
                    set({ items: [...get().items, newItem] })
                }
            },

            removeItem: (itemId: string) => {
                set({ items: get().items.filter((item) => item.id !== itemId) })
            },

            updateQuantity: (itemId: string, quantity: number) => {
                if (quantity <= 0) {
                    return get().removeItem(itemId)
                }

                set({
                    items: get().items.map((item) => (item.id === itemId ? { ...item, quantity } : item)),
                })
            },

            clearCart: () => {
                set({ items: [] })
            },

            getTotalPrice: () => {
                return get().items.reduce((total, item) => {
                    return total + (item.product?.price || 0) * item.quantity
                }, 0)
            },

            getTotalItems: () => {
                return get().items.reduce((total, item) => total + item.quantity, 0)
            },
        }),
        {
            name: "stride-style-cart",
            partialize: (state) => ({ items: state.items }),
        },
    ),
)