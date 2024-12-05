import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import useSelectVariantController from "@/hooks/useSelectModal";
import { cn } from "@/lib/utils";
import { Variant } from "@/types/product";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { sizesArray } from "@/lib/default-data";
import { Minus, Plus } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import useCartController from "@/hooks/useCartController";
import toast from "react-hot-toast";

const SelectProductVariant = () => {
  const { isOpen, onClose, variants, product, clearVariants } =
    useSelectVariantController();
  const { addItem } = useCart();
  const { onOpen } = useCartController();
  const [quantity, setQuantity] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSelected, setIsSelected] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(
    variants[0]
  );

  useEffect(() => {
    setQuantity(1);
    setSelectedVariant(variants[0]);
    setSelectedSize("");
  }, [isOpen]);

  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const openModal = variants && isOpen;
  const price =
    (selectedVariant &&
      selectedVariant.attributes.find((attr) => attr.size === selectedSize)
        ?.price) ||
    product?.price;

  const currentPrice = product?.discountPercent
    ? price - (product?.discountPercent / 100) * price
    : price;

  const currentStock =
    selectedVariant &&
    selectedVariant.attributes.find((attr) => attr.size === selectedSize)
      ?.stock;

  const handleSelectVariant = (variant: Variant) => {
    setSelectedSize(null);
    setSelectedVariant(variant);
  };

  const handleSelectSize = (size: string) => {
    setSelectedSize(size);
    if (selectedVariant) {
      setIsSelected(true);
    }
    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedVariant) {
      setErrorMessage(
        "Please select a size and variant before adding an item."
      );
      return;
    }

    const cartId = `${selectedVariant.productId}-${selectedSize}-${selectedVariant.color}`;

    setErrorMessage("");
    addItem({
      id: cartId,
      name: product.name,
      quantity,
      size: selectedSize,
      color: selectedVariant.color,
      price: currentPrice || 0,
      image: selectedVariant.images[0] as string,
      variantId: selectedVariant.id,
      attributeId: selectedVariant.attributes.find(
        (atr) => atr.size === selectedSize
      )?.id,
      status: product.status,
      slug: product.slug,
    });
    clearVariants();
    toast.success("Product added to bag.");
    onClose();
  };

  return (
    <Sheet open={openModal} onOpenChange={() => onClose()}>
      <SheetContent
        side="left"
        className="border-none  ring-0 w-full  p-6 rounded-t-lg"
      >
        <SheetHeader>
          <SheetTitle className="text-gray-800 text-xl font-semibold">
            Select Product Specification
          </SheetTitle>
        </SheetHeader>

        <SheetDescription className="flex flex-col gap-3 justify-between ">
          {/* Variant Selection */}
          <div>
            <p className="text-lg font-medium text-gray-700">
              Color:{" "}
              <span className="text-gray-500">({variants.length} options)</span>
            </p>
            <div className="flex gap-4 mt-3">
              {variants.map((variant) => (
                <div
                  key={variant.id}
                  className={cn(
                    "p-1 cursor-pointer transition-transform duration-300 rounded-md border",
                    selectedVariant?.id === variant?.id
                      ? "border-blue-500 scale-105"
                      : "border-gray-300"
                  )}
                  onClick={() => handleSelectVariant(variant)}
                >
                  <img
                    src={variant.images[0]}
                    alt={`Variant Image ${variant.color}`}
                    className="h-28 w-24 object-cover rounded-sm"
                  />
                  <p
                    className={cn(
                      "text-center text-sm mt-2",
                      selectedVariant?.id === variant.id &&
                        "font-semibold text-blue-500"
                    )}
                  >
                    {variant.color}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div>
            <p className="text-lg font-medium text-gray-700">
              Size
              {selectedSize && (
                <span className="text-gray-500 ml-2">: {selectedSize}</span>
              )}
            </p>
            <div className="flex flex-wrap gap-3 mt-3">
              {sizesArray.map((size) => {
                const availableSizes = selectedVariant?.attributes.map((attr) =>
                  attr.size.toUpperCase()
                );
                const isAvailable = availableSizes?.includes(size);
                const isActive = size === selectedSize;

                return (
                  <Button
                    key={size}
                    onClick={() => isAvailable && handleSelectSize(size)}
                    disabled={!isAvailable}
                    className={cn(
                      "h-10 w-10 rounded-full text-sm flex items-center justify-center",
                      isAvailable
                        ? isActive
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-700"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    )}
                  >
                    {size}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Quantity Selection */}
          {selectedSize && (
            <div>
              <p className="text-lg font-medium text-gray-700">Quantity</p>
              <div className="flex items-center gap-3 mt-3">
                <Button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  variant="ghost"
                  size={"icon"}
                  className="h-10 w-10 border border-gray-300"
                >
                  <Minus size={18} />
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  onClick={() =>
                    setQuantity((q) => Math.min(currentStock || q, q + 1))
                  }
                  size={"icon"}
                  variant="ghost"
                  className="h-10 w-10 border border-gray-300"
                >
                  <Plus size={18} />
                </Button>
              </div>
              {quantity === currentStock && (
                <p className="text-sm text-red-500 mt-2">
                  Only {currentStock} items left in stock for this size.
                </p>
              )}
            </div>
          )}
          {/* price  */}

          <div className="mt-2">
            {product?.discountPercent ? (
              <div>
                <p className="text-3xl font-bold text-red-500">
                  &#8377; {currentPrice?.toFixed(2)}{" "}
                  <span className="text-lg text-gray-500">
                    ({product.discountPercent}% OFF)
                  </span>
                </p>
                <p className="text-md line-through text-gray-500">
                  &#8377; {price?.toFixed(2)}
                </p>
              </div>
            ) : (
              <p className="text-2xl font-bold">&#8377; {price?.toFixed(2)}</p>
            )}
          </div>

          {/* Add to Cart */}
          <div className="mt-4">
            <Button
              disabled={!isSelected || errorMessage.trim().length > 0}
              size={"lg"}
              onClick={handleAddToCart}
              className="w-full rounded-md"
            >
              Add to Cart
            </Button>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <p className="text-sm text-red-500 mt-2">{errorMessage}</p>
          )}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default SelectProductVariant;
