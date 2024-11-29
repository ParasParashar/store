import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingCart, XCircle } from "lucide-react";
import { fadeInUp } from "@/lib/animations";
import AxiosBase from "@/lib/axios";
import { Product, Variant } from "@/types/product";
import { ProductDetailSkeleton } from "@/components/loaders/ProductDetailSkeleton";
import { useCart } from "@/hooks/useCart";
import ProductImages from "@/components/product-detail/ProductImages";
import useCartController from "@/hooks/useCartController";

export function ProductDetailPage() {
  const { addItem, items } = useCart();
  const { onOpen } = useCartController();
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [isItemSelected, setIsItemSelected] = useState(false);
  const location = useLocation();
  const contentRef = useRef<HTMLDivElement>(null);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");

  const sizesArray = ["S", "M", "L", "XL", "XXL"];

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: ["product", slug],
    queryFn: async () => {
      const { data } = await AxiosBase.get("/api/store/product/" + slug);
      if (!data.success) throw new Error(data.message);
      if (data.data.variants.length > 0) {
        setSelectedVariant(data.data.variants[0]);
      }
      return data.data;
    },
    enabled: !!slug,
  });

  useEffect(() => {
    if (contentRef.current && !isLoading) {
      fadeInUp(contentRef.current);
    }
  }, [isLoading]);

  const updateURLParams = (size: string | null, color: string | null) => {
    const params = new URLSearchParams(location.search);
    if (size) {
      params.set("size", size);
    } else {
      params.delete("size");
    }
    if (color) {
      params.set("color", color);
    } else {
      params.delete("color");
    }
    navigate({ search: params.toString() }, { replace: true });
  };

  useEffect(() => {
    if (selectedSize && selectedVariant) {
      const cartId = `${selectedVariant.productId}-${selectedSize}-${selectedVariant.color}`;
      const isSelected = items.some((item) => item.id === cartId);
      setIsItemSelected(isSelected);
      updateURLParams(selectedSize, selectedVariant.color);
    }
  }, [selectedSize, selectedVariant, items]);

  if (isLoading) return <ProductDetailSkeleton />;

  if (!product) {
    return <div>Product not found</div>;
  }

  const currentPrice =
    (selectedVariant &&
      selectedVariant.attributes.find((attr) => attr.size === selectedSize)
        ?.price) ||
    product.price;

  const currentStock =
    selectedVariant &&
    selectedVariant.attributes.find((attr) => attr.size === selectedSize)
      ?.stock;

  const availableSizes =
    selectedVariant?.attributes.map((attr) => attr.size.toUpperCase()) || [];

  const handleAddToCart = () => {
    if (!selectedSize || !selectedVariant) {
      setErrorMessage(
        "Please select a size and variant before adding to cart."
      );
      return;
    }

    const cartId = `${selectedVariant.productId}-${selectedSize}-${selectedVariant.color}`;
    const isSelected = items.some((item) => item.id === cartId);
    if (isSelected) {
      onOpen();
      return;
    }

    setErrorMessage("");
    addItem({
      id: cartId,
      name: product.name,
      quantity,
      size: selectedSize,
      color: selectedVariant.color,
      price: currentPrice || 0,
      image: selectedVariant.images[0] as string,
    });
    setIsItemSelected(true);
  };

  const handleSelectVariant = (variant: Variant) => {
    setSelectedSize(null); // Clear selected size for new variant
    setSelectedVariant(variant);
    const cartId = `${variant.productId}-${selectedSize}-${variant.color}`;
    const isSelected = items.some((item) => item.id === cartId);
    setIsItemSelected(isSelected);
    updateURLParams(null, variant.color);
  };

  const handleSelectSize = (size: string) => {
    setSelectedSize(size);
    if (selectedVariant) {
      const cartId = `${selectedVariant.productId}-${size}-${selectedVariant.color}`;
      const isSelected = items.some((item) => item.id === cartId);
      setIsItemSelected(isSelected);
    }
    setErrorMessage("");
  };

  return (
    <div className="container mx-auto h-full py-8">
      <div ref={contentRef} className="grid gap-8 md:grid-cols-2">
        <ProductImages images={selectedVariant?.images as string[]} />

        {/* Product Details */}
        <section className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold">
              {product.name} - {selectedVariant?.color}
            </h1>
            <p className="text-lg text-muted-foreground">
              {product.category.name}
            </p>
            <p className="mt-2 text-2xl font-bold">
              &#8377;{currentPrice?.toFixed(2)}
            </p>
          </div>
          <p className="text-muted-foreground">{product?.description}</p>

          {/* Variants */}
          <div className="flex gap-4">
            {product.variants.map((variant) => (
              <div
                key={variant.id}
                className={`p-2 border ${
                  selectedVariant?.id === variant.id
                    ? "border-primary"
                    : "border-muted"
                } cursor-pointer rounded`}
                onClick={() => handleSelectVariant(variant)}
              >
                <img
                  src={variant.images[0]}
                  alt={product.name}
                  className="h-16 w-16 object-cover rounded"
                />
                <p className="text-center text-sm mt-2">{variant.color}</p>
              </div>
            ))}
          </div>

          {/* Sizes */}
          <div className="flex gap-2">
            {sizesArray.map((size) => {
              const isAvailable = availableSizes.includes(size);
              const isActive = size === selectedSize;

              return (
                <Button
                  key={size}
                  variant="outline"
                  size="sm"
                  onClick={() => isAvailable && handleSelectSize(size)}
                  disabled={!isAvailable}
                  className={`flex items-center justify-center ${
                    isAvailable
                      ? isActive
                        ? "bg-primary text-white"
                        : ""
                      : "opacity-50 cursor-not-allowed"
                  }`}
                >
                  {size}
                  {!isAvailable && (
                    <XCircle className="ml-1 h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              );
            })}
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center mt-4 border border-muted-foreground rounded-full gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="rounded-l-full"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            >
              <Minus size={20} />
            </Button>
            <span className="px-4 text-center">{quantity}</span>
            <Button
              variant="ghost"
              size="sm"
              className="rounded-r-full"
              onClick={() =>
                setQuantity((q) => Math.min(currentStock || q, q + 1))
              }
            >
              <Plus size={20} />
            </Button>
          </div>
          {quantity === currentStock && (
            <p className="text-sm text-muted-foreground">
              Only {currentStock} items left in stock for this size.
            </p>
          )}

          {/* Add to Cart */}
          <div className="flex flex-col gap-2">
            <Button
              onClick={handleAddToCart}
              className="flex items-center gap-2"
            >
              {isItemSelected ? "VIEW BAG" : "ADD TO BAG"}
            </Button>
            {errorMessage && (
              <p className="text-sm text-red-500">{errorMessage}</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
