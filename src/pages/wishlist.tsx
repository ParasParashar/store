import { useState } from 'react';
import { ProductCard } from '@/components/products/ProductCard';
import { Product } from '@/types/product';

// Simulated wishlist data - replace with actual data management
const initialWishlist: Product[] = [];

export function WishlistPage() {
  const [wishlist] = useState(initialWishlist);

  return (
    <div className="container py-8">
      <h1 className="mb-8 text-3xl font-bold">My Wishlist</h1>
      {wishlist.length === 0 ? (
        <div className="text-center">
          <p className="text-lg text-muted-foreground">
            Your wishlist is empty
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}