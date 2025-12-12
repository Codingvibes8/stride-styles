"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Search Products</h1>
          <p className="text-muted-foreground text-lg">Find exactly what you're looking for</p>
        </div>

        <form onSubmit={handleSearch} className="mb-12">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for shoes, clothing, brands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>
            <Button type="submit" size="lg" className="px-8">
              Search
            </Button>
          </div>
        </form>

        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Popular Categories</h2>
            <div className="grid grid-cols-2 gap-4">
              <Link
                href="/products?category=shoes"
                className="p-4 border rounded-lg hover:border-primary hover:bg-accent transition-colors"
              >
                <p className="font-medium">Men's Shoes</p>
                <p className="text-sm text-muted-foreground">Browse all shoes</p>
              </Link>
              <Link
                href="/products?category=clothing"
                className="p-4 border rounded-lg hover:border-primary hover:bg-accent transition-colors"
              >
                <p className="font-medium">Men's Clothing</p>
                <p className="text-sm text-muted-foreground">Browse all clothing</p>
              </Link>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
            <div className="space-y-2">
              <Link
                href="/products?sort=newest"
                className="block p-3 border rounded-lg hover:border-primary hover:bg-accent transition-colors"
              >
                New Arrivals
              </Link>
              <Link
                href="/products?sale=true"
                className="block p-3 border rounded-lg hover:border-primary hover:bg-accent transition-colors"
              >
                Sale Items
              </Link>
              <Link
                href="/products"
                className="block p-3 border rounded-lg hover:border-primary hover:bg-accent transition-colors"
              >
                All Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
