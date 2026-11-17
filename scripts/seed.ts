import { config } from "dotenv";
import { sql } from "drizzle-orm";

import { getDb } from "../lib/db";
import { products, type NewProductRow } from "../lib/db/schema";

// Load env before the lazy database client is created.
config({ path: ".env.local" });
config();

const seedProducts: NewProductRow[] = [
  {
    name: "Air Stride Pro",
    description:
      "Lightweight running shoe with responsive cushioning and breathable mesh upper.",
    price: 129.99,
    category: "shoes",
    subcategory: "running",
    images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800"],
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: ["Black", "White", "Red"],
    stock: 50,
    featured: true,
  },
  {
    name: "Urban Walker",
    description:
      "Clean minimal silhouette for everyday wear. Premium leather upper with cushioned insole.",
    price: 89.99,
    category: "shoes",
    subcategory: "casual",
    images: ["https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800"],
    sizes: ["7", "8", "9", "10", "11"],
    colors: ["White", "Navy", "Tan"],
    stock: 35,
    featured: true,
  },
  {
    name: "TrailBlaze X",
    description:
      "Rugged trail runner with aggressive outsole grip and waterproof protection.",
    price: 149.99,
    category: "shoes",
    subcategory: "trail",
    images: ["https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800"],
    sizes: ["8", "9", "10", "11", "12"],
    colors: ["Olive", "Black", "Gray"],
    stock: 20,
    featured: true,
  },
  {
    name: "Classic Court Low",
    description:
      "Timeless low-top sneaker inspired by classic basketball style. Vulcanized rubber sole.",
    price: 69.99,
    category: "shoes",
    subcategory: "lifestyle",
    images: ["https://images.unsplash.com/photo-1465453869711-7e174808ace9?w=800"],
    sizes: ["6", "7", "8", "9", "10", "11", "12"],
    colors: ["White", "Black", "Red", "Blue"],
    stock: 80,
    featured: false,
  },
  {
    name: "Flex Sprint 2",
    description:
      "Competition-ready sprint flat with carbon fibre plate and snug sock-like fit.",
    price: 199.99,
    category: "shoes",
    subcategory: "running",
    images: ["https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=800"],
    sizes: ["7", "8", "9", "10", "11"],
    colors: ["Neon Yellow", "Blue", "Pink"],
    stock: 15,
    featured: false,
  },
  {
    name: "Hike Masters",
    description:
      "Sturdy mid-cut hiking boot with Gore-Tex lining and Vibram outsole.",
    price: 174.99,
    category: "shoes",
    subcategory: "hiking",
    images: ["https://images.unsplash.com/photo-1520316587275-5e4f06f355e3?w=800"],
    sizes: ["8", "9", "10", "11", "12", "13"],
    colors: ["Brown", "Dark Gray"],
    stock: 25,
    featured: false,
  },
  {
    name: "Levi's 501 Original Jeans",
    description: "The original straight fit jeans that started it all.",
    price: 89.99,
    category: "clothing",
    subcategory: "jeans",
    images: ["/blue-levis.png?height=400&width=400"],
    sizes: ["30", "32", "34", "36", "38", "40"],
    colors: ["Blue", "Black", "Gray"],
    stock: 200,
    featured: true,
  },
  {
    name: "Nike Dri-FIT T-Shirt",
    description:
      "Moisture-wicking t-shirt perfect for workouts and casual wear.",
    price: 24.99,
    category: "clothing",
    subcategory: "t-shirts",
    images: ["/nike-dri-fit.png?height=400&width=400"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "White", "Navy", "Gray"],
    stock: 300,
    featured: false,
  },
  {
    name: "Patagonia Better Sweater Fleece",
    description: "Cozy fleece jacket made from recycled polyester.",
    price: 119.99,
    category: "clothing",
    subcategory: "jackets",
    images: ["/patagonia.png?height=400&width=400"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Navy", "Black", "Gray", "Green"],
    stock: 80,
    featured: true,
  },
  {
    name: "Nike Air Max 270",
    description:
      "Comfortable running shoes with Air Max technology for all-day comfort and style.",
    price: 129.99,
    category: "shoes",
    subcategory: "sneakers",
    images: ["/nike-airmax270.png?height=400&width=400"],
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: ["Black", "White", "Blue"],
    stock: 100,
    featured: true,
  },
  {
    name: "Adidas Ultraboost 22",
    description:
      "Premium running shoes with Boost midsole technology for energy return.",
    price: 189.99,
    category: "shoes",
    subcategory: "running",
    images: ["/adidas-ultraboost.png?height=400&width=400"],
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: ["Black", "White", "Gray"],
    stock: 75,
    featured: true,
  },
  {
    name: "Converse Chuck Taylor All Star",
    description: "Classic canvas sneakers that never go out of style.",
    price: 59.99,
    category: "shoes",
    subcategory: "casual",
    images: ["/canvas2.png?height=400&width=400"],
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: ["Black", "White", "Red"],
    stock: 150,
    featured: false,
  },
  {
    name: "Timberland 6-Inch Premium Boot",
    description: "Waterproof leather boots perfect for outdoor adventures.",
    price: 199.99,
    category: "shoes",
    subcategory: "boots",
    images: ["/timberland2.png?height=400&width=400"],
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: ["Wheat", "Black", "Brown"],
    stock: 50,
    featured: true,
  },
  {
    name: "Ralph Lauren Polo Shirt",
    description: "Classic polo shirt with iconic polo player logo.",
    price: 79.99,
    category: "clothing",
    subcategory: "polo",
    images: ["/blue-polo-2.png?height=400&width=400"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Navy", "Red", "Green"],
    stock: 120,
    featured: false,
  },
  {
    name: "Champion Reverse Weave Hoodie",
    description:
      "Premium heavyweight hoodie with reverse weave construction.",
    price: 69.99,
    category: "clothing",
    subcategory: "hoodies",
    images: ["/champion-hoodie.png?height=400&width=400"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Gray", "Navy", "Maroon"],
    stock: 90,
    featured: true,
  },
  {
    name: "Dockers Alpha Khaki Chinos",
    description:
      "Slim tapered chinos perfect for casual and business casual wear.",
    price: 59.99,
    category: "clothing",
    subcategory: "pants",
    images: ["/dockers-chino2.png?height=400&width=400"],
    sizes: ["30", "32", "34", "36", "38", "40"],
    colors: ["Khaki", "Navy", "Black", "Olive"],
    stock: 150,
    featured: false,
  },
];

async function main() {
  const db = getDb();
  const reset = process.argv.includes("--reset");

  const [row] = await db.select({ count: sql<number>`count(*)::int` }).from(products);
  const existing = row?.count ?? 0;

  if (existing > 0 && !reset) {
    console.log(
      `products already contains ${existing} row(s). Nothing to do. Re-run with --reset to replace the data.`
    );
    return;
  }

  if (existing > 0 && reset) {
    console.log("Deleting existing products (cascades to cart/order items)...");
    await db.delete(products);
  }

  await db.insert(products).values(seedProducts);
  console.log(`Seeded ${seedProducts.length} products.`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  });
