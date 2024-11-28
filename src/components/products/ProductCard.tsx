import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart } from 'lucide-react';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden">
      <CardContent className="p-0">
        <Link to={`/products/${product.id}`}>
          <div className="relative aspect-square overflow-hidden">
            <img
              src={product.images[0]}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {!product.inStock && (
              <Badge
                variant="destructive"
                className="absolute right-4 top-4"
              >
                Out of Stock
              </Badge>
            )}
          </div>
        </Link>
      </CardContent>
      <CardFooter className="p-4">
        <div className="flex w-full flex-col gap-2">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-sm text-muted-foreground">
                {product.category}
              </p>
            </div>
            <p className="text-lg font-bold">
              ${product.price.toFixed(2)}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="default"
              size="sm"
              className="flex-1"
              disabled={!product.inStock}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
            <Button variant="outline" size="icon">
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}