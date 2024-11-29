import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { Product } from "@/types/product";
import { ShoppingCart } from "lucide-react";

interface AddToCartProps {
  product: Product;
  quantity: number;
  size?: string;
  color?: string;
}

export function AddToCartButton({
  product,
  quantity,
  size,
  color,
}: AddToCartProps) {
  const addItem = useCart((state) => state.addItem);

  const handleAddToCart = () => {
    if (quantity < 1) {
      console.warn("Quantity must be at least 1");
      return;
    }
    const id = `${product.id}-${size}-${color}`;

    addItem({
      name: product.name,
      image: product.variants[0].images[0] as string,
      price: product.price,
      quantity,
      size,
      color,
      id: id,
    });
  };

  return (
    <Button
      className="flex items-center justify-center gap-2"
      onClick={handleAddToCart}
      disabled={!size || quantity < 1}
    >
      <ShoppingCart className="h-5 w-5" />
      Add to Cart
    </Button>
  );
}
