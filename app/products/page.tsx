import type { Product } from "@/lib/types"
import ProductCard from "@/components/product-card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockFeaturedProducts } from "@/constants/featured-products-constants";

interface ProductsPageProps {
  searchParams?: {
    [key: string]: string | string[] | undefined
  }
}

function getProducts(category?: string, sort?: string): Product[] {
  let filteredProducts = [...mockFeaturedProducts];

  if (category && category !== "all") {
    filteredProducts = filteredProducts.filter(
        (product) => product.category === category
    );
  }

  switch (sort) {
    case "price-asc":
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case "name":
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;
    default:
      break;
  }

  return filteredProducts;
}

function getSingleParam(param: string | string[] | undefined): string | undefined {
  return Array.isArray(param) ? param[0] : param;
}

export default function ProductsPage({ searchParams }: ProductsPageProps) {
  const category = getSingleParam(searchParams?.category) || "all";
  const sort = getSingleParam(searchParams?.sort) || "newest";

  const products = getProducts(category, sort);

  return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">All Products</h1>
            <p className="text-muted-foreground">Showing {products.length} products</p>
          </div>

          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Select defaultValue={category}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="shoes">Shoes</SelectItem>
                <SelectItem value="clothing">Clothing</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue={sort}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {products.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-2xl font-semibold mb-4">No products found</h2>
              <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
            </div>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
              ))}
            </div>
        )}
      </div>
  )
}