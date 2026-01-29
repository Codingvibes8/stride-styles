
import { FC } from 'react';
import { Product } from '@/lib/types';
import ProductCard from './product-card';

interface FeaturedProductsProps {
  products: Product[];
}

const FeaturedProducts: FC<FeaturedProductsProps> = ({ products }) => {
  return (
    <section className="py-12">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
