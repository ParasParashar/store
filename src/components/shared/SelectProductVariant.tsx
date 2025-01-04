import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useSelectVariantController from "@/hooks/useSelectModal";
import { Variant } from "@/types/product";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { sizesArray } from "@/lib/default-data";
import { Minus, Plus } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import toast from "react-hot-toast";
import ProductImageColors from "../product-detail/ProductImageColors";
import { BsExclamationCircleFill } from "react-icons/bs";
import { Badge } from "../ui/badge";

const SelectProductVariant = () => {
  const { isOpen, onClose, variants, product, clearVariants } =
    useSelectVariantController();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
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
      selectedVariant.attributes?.find((attr) => attr.size === selectedSize)
        ?.price) ||
    product?.price;

  const currentPrice = product?.discountPercent
    ? price - (product?.discountPercent / 100) * price
    : price;

  const currentStock =
    selectedVariant &&
    selectedVariant.attributes?.find((attr) => attr.size === selectedSize)
      ?.stock;

  const handleSelectVariant = (variant: Variant) => {
    setSelectedSize(null);
    setSelectedVariant(variant);
  };

  const handleSelectSize = (size: string) => {
    setSelectedSize(size);
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
    setErrorMessage("");
    addItem({
      productId: selectedVariant.productId,
      variantId: selectedVariant.id,
      attributeId: selectedVariant.attributes?.find(
        (atr) => atr.size === selectedSize
      )?.id as string,
      quantity,
    });
    clearVariants();
    toast.success("Product added to bag.");
    onClose();
  };

  const handleOnDialogClose = () => {
    setErrorMessage("");
    onClose();
  };
  return (
    <Dialog open={openModal} onOpenChange={handleOnDialogClose}>
      <DialogContent className="w-3/4 max-w-3xl mx-auto py-6 px-4 overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-gray-800 text-start text-xl font-semibold">
            Select Specification
          </DialogTitle>
        </DialogHeader>

        <DialogDescription className="flex flex-col gap-4 justify-between overflow-hidden">
          {/* Variant Selection */}
          <div className="flex flex-col gap-4">
            <p className="text-sm font-medium text-gray-700">
              Color:{" "}
              <span className="text-gray-500 text-sm">
                ({variants.length} options)
              </span>
            </p>

            <div className="max-w-full overflow-hidden">
              <ProductImageColors
                variants={variants}
                onSelectVariant={handleSelectVariant}
              />
            </div>
          </div>

          {/* Size Selection */}
          <div>
            <p className="text-lg font-medium text-gray-700 mt-4 mb-2">
              Size
              {selectedSize && (
                <span className="text-gray-500 ml-2 text-sm">
                  : {selectedSize}
                </span>
              )}
            </p>

            <div className="flex gap-2">
              {sizesArray?.map((size) => {
                const availableSizes = selectedVariant?.attributes?.map((attr) =>
                  attr.size.toUpperCase()
                );
                const isAvailable = availableSizes?.includes(size);
                const isActive = size === selectedSize;

                return (
                  <div key={size}>
                    <Button
                      key={size}
                      onClick={() => isAvailable && handleSelectSize(size)}
                      disabled={!isAvailable}
                      className={`flex relative items-center justify-center border border-black h-10 w-10 rounded-full bg-white text-black ${
                        isAvailable
                          ? isActive
                            ? "bg-primary text-white pointer-events-none"
                            : ""
                          : "opacity-80 cursor-not-allowed"
                      }`}
                    >
                      <span
                        className={`relative ${
                          !isAvailable ? "text-muted-foreground" : ""
                        }`}
                      >
                        {size}
                      </span>
                      {!isAvailable && (
                        <span className="w-full top-[50%]  absolute h-[1px] rotate-45 overflow-hidden bg-muted-foreground transform " />
                      )}
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quantity Selection */}
          {selectedSize && (
            <div className="flex flex-col justify-center gap-2">
              <p className="text-lg font-medium text-gray-700 capitalize">
                Quantity
              </p>

              <div className="flex w-1/4 items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-10 w-10 border border-black/60"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  <Minus size={20} />
                </Button>
                <span className="px-4 flex items-center justify-center h-10 w-10 rounded-md border border-black/60">
                  {quantity}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-10 w-10 border border-black/60"
                  onClick={() =>
                    setQuantity((q) => Math.min(currentStock || q, q + 1))
                  }
                >
                  <Plus size={20} />
                </Button>
              </div>

              {quantity === currentStock ||
                (currentStock === 0 && (
                  <p className="text-sm text-muted-foreground">
                    {currentStock === 0
                      ? "Current Stock is not available"
                      : `
                    Only ${currentStock} items left in stock for this size.
                    `}
                  </p>
                ))}
            </div>
          )}

          {/* Price */}
          <div className="mt-2">
            {product?.discountPercent ? (
              <>
                <p className="text-3xl font-bold text-black flex items-center w-full  gap-10">
                  &#8377; {currentPrice?.toFixed(2)}{" "}
                  <Badge className="rounded-full text-sm ">
                    ({product.discountPercent}% OFF)
                  </Badge>
                </p>
                <p className="text-base line-through text-red-500">
                  &#8377; {price?.toFixed(2)}
                </p>
              </>
            ) : (
              <p className="text-2xl font-bold text-black">
                &#8377; {price?.toFixed(2)}
              </p>
            )}
          </div>

          {/* Add to Cart */}
          {currentStock === 0 || product?.status === "out_of_stock" ? (
            <Badge
              variant={"destructive"}
              className="text-lg w-32  text-center  rounded-full"
            >
              Out of Stock
            </Badge>
          ) : (
            <div className="w-full flex flex-col gap-2">
              <Button
                onClick={handleAddToCart}
                className="flex items-center gap-2"
              >
                ADD TO BAG
              </Button>
              {/* </div> */}
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <p className="text-sm flex items-center gap-2 text-red-500 mt-2">
              <BsExclamationCircleFill /> {errorMessage}
            </p>
          )}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default SelectProductVariant;
