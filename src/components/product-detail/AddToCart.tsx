import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import useCartController from "@/hooks/useCartController";
// import { Product } from "@/types/product";
// import { ShoppingCart } from "lucide-react";
import { IoBagOutline } from "react-icons/io5";

interface AddToCartProps {
  productId: string;
}

export function AddToCartButton({ productId: string }: AddToCartProps) {
  const addItem = useCart((state) => state.addItem);
  const { onOpen } = useCartController();

  const handleAddToCart = () => {
    onOpen();
  };

  return (
    <Button
      className="flex items-center justify-center gap-2 flex-1"
      onClick={handleAddToCart}
    >
      <IoBagOutline size={20} />
      Add to Cart
    </Button>
  );
}
