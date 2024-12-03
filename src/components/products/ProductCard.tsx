import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  if (!product) return null;

  const { discountedPrice, price, name, category, slug, status, variants } =
    product;

  const calculateDiscount = (original: number, discounted: number) =>
    Math.round(((original - discounted) / original) * 100);

  const discountPercentage =
    discountedPrice && calculateDiscount(price, discountedPrice);

  return (
    <Card className="group overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        <Link to={`/product/${slug}`}>
          <div className="relative aspect-square overflow-hidden">
            <img
              src={variants[0].images[0]}
              alt={name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {!status && (
              <Badge variant="destructive" className="absolute right-4 top-4">
                Out of Stock
              </Badge>
            )}
          </div>
        </Link>
      </CardContent>
      <CardFooter className="p-4">
        <div className="flex w-full flex-col gap-2">
          {/* Product Name and Category */}
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold">{name}</h3>
              <p className="text-sm text-muted-foreground">{category.name}</p>
            </div>
            {/* Price Section */}
            <div className="text-right">
              {discountedPrice ? (
                <>
                  <p className="text-red-600 font-bold text-lg">
                    &#8377;{discountedPrice.toFixed(2)}
                  </p>
                  <p className="text-sm text-muted-foreground line-through">
                    &#8377;{price.toFixed(2)}
                  </p>
                  <p className="text-sm text-green-600">
                    Save {discountPercentage}%
                  </p>
                </>
              ) : (
                <p className="text-lg font-bold">&#8377;{price.toFixed(2)}</p>
              )}
            </div>
          </div>
          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button variant="default" size="sm" className="flex-1">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
            {/* <Button variant="outline" size="icon">
              <Heart className="h-4 w-4" />
            </Button> */}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
