import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react"; // ShoppingCart, XCircle
import { fadeInUp } from "@/lib/animations";
import AxiosBase from "@/lib/axios";
import { Product, Variant } from "@/types/product";
import { ProductDetailSkeleton } from "@/components/loaders/ProductDetailSkeleton";
import { useCart } from "@/hooks/useCart";
import ProductImages from "@/components/product-detail/ProductImages";
import useCartController from "@/hooks/useCartController";
import SizeChart from "@/components/product-detail/SizeChart";
import washingInstructions from "@/lib/washingInstructions";
import WashingInstruction from "@/components/product-detail/WashingInstruction";
import { cn } from "@/lib/utils";
import RelatedProducts from "@/components/product-detail/RelatedProducts";
import { sizesArray } from "@/lib/default-data";
import toast from "react-hot-toast";

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

  const price =
    (selectedVariant &&
      selectedVariant.attributes.find((attr) => attr.size === selectedSize)
        ?.price) ||
    product.price;

  const currentPrice = product?.discountPercent
    ? price - (product?.discountPercent / 100) * price
    : price;

  const currentStock =
    selectedVariant &&
    selectedVariant.attributes.find((attr) => attr.size === selectedSize)
      ?.stock;

  const availableSizes =
    selectedVariant?.attributes.map((attr) => attr.size.toUpperCase()) || [];

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
    toast.success("Product added to bag.");
    setIsItemSelected(true);
  };

  const handleSelectVariant = (variant: Variant) => {
    setSelectedSize(null);
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
    <div className="w-full flex flex-col gap-y-5  md:w-[90%] px-5 mx-auto h-full py-2 sm:py-8 lg:py-14 ">
      <div ref={contentRef} className="grid items-start gap-8 md:grid-cols-2">
        <ProductImages images={selectedVariant?.images as string[]} />

        {/* Product Details */}
        <section className="flex h-full flex-col border-b border-black/40 pb-4 gap-6">
          <div className=" border-b pb-2">
            <h1 className="text-2xl sm:text-3xl ubuntu-medium text-[#121212]">
              {product.name} - {selectedVariant?.color}
            </h1>
            <p className="text-sm text-muted-foreground -tracking-tighter">
              {product.category.name}
            </p>
            {/* <p className="mt-2 text-2xl font-bold">
              &#8377; {currentPrice?.toFixed(2)}
            </p> */}

            {/* updated code */}

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
                <p className="text-2xl font-bold">
                  &#8377; {price?.toFixed(2)}
                </p>
              )}
            </div>
          </div>
          {/* <p className="text-muted-foreground">{product?.description}</p> */}

          {/* Variants */}
          <div className="flex flex-col gap-3">
            <p className=" capitalize font-semibold text-lg">
              color:{" "}
              <span className=" text-base text-gray-400">
                {" "}
                {selectedVariant?.color}{" "}
              </span>
            </p>
            <div className="flex gap-3">
              {product.variants.map((variant) => (
                <div
                  key={variant.id}
                  className={`p-1  cursor-pointer`}
                  onClick={() => handleSelectVariant(variant)}
                >
                  <img
                    src={variant.images[0]}
                    alt={product.name}
                    className={cn(
                      "h-28 w-24  transition-all duration-300 ease-in  rounded-sm object-cover",
                      selectedVariant?.id === variant?.id && "scale-110 "
                    )}
                  />
                  <p
                    className={cn(
                      "text-center text-sm mt-1",
                      selectedVariant?.id === variant.id && "font-semibold"
                    )}
                  >
                    {variant.color}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div className="flex flex-col  gap-3 mt-2 justify-between ">
            <div className="flex flex-col gap-2 ">
              <p className=" uppercase text-xs space-x-5 text-[#FF0000]">
                {errorMessage}
              </p>

              <div className="flex gap-2">
                {sizesArray.map((size) => {
                  const isAvailable = availableSizes.includes(size);
                  const isActive = size === selectedSize;

                  return (
                    <div>
                      <Button
                        key={size}
                        onClick={() => isAvailable && handleSelectSize(size)}
                        disabled={!isAvailable}
                        className={`flex items-center justify-center border border-black  h-10 w-10 rounded-full bg-white text-black   ${
                          isAvailable
                            ? isActive
                              ? " bg-primary text-white pointer-events-none "
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
                          {!isAvailable && (
                            <span
                              className=" absolute inset-0 w-full flex items-center justify-center "
                              aria-hidden="true"
                            >
                              <span
                                className="w-full h-[1px] bg-muted-foreground transform rotate-45"
                                style={{ position: "absolute" }}
                              />
                            </span>
                          )}
                        </span>
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>

            <SizeChart />
          </div>

          {/* Quantity Selector */}
          <div className="flex flex-col justify-center gap-2">
            <p className=" capitalize text-lg">Quantity</p>

            <div className="flex w-1/4 items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className=" h-10 w-10 border border-black/60"
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
                className=" h-10 w-10 border border-black/60"
                onClick={() => {
                  if (!selectedSize)
                    return setErrorMessage("Fist Select a size");
                  setQuantity((q) => Math.min(currentStock || q, q + 1));
                }}
              >
                <Plus size={20} />
              </Button>
            </div>
          </div>
          {quantity === currentStock && (
            <p className="text-sm text-muted-foreground">
              Only {currentStock} items left in stock for this size.
            </p>
          )}

          {/* Add to Cart */}
          <div className=" flex flex-col gap-1">
            <div className="w-full flex gap-1">
              <div className="w-[50%] flex flex-col gap-2">
                <Button
                  onClick={handleAddToCart}
                  className="flex items-center gap-2"
                >
                  ADD TO BAG
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Washing Instructions */}
      <div className="mt-8 flex flex-col gap-4 ">
        <p className=" text-2xl sm:text-3xl ubuntu-medium">
          Washing Instructions
        </p>
        <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 border border-black/50 rounded-md max-[550px]:px-2 px-8 py-2">
          {washingInstructions.map((instruction) => (
            <WashingInstruction
              key={instruction.id}
              title={instruction.title}
              icon={instruction.icon}
            />
          ))}
        </div>
      </div>
      <RelatedProducts productId={product.id} categoryId={product.categoryId} />
    </div>
  );
}
