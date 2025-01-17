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
import SizeChart from "@/components/product-detail/SizeChart";
import washingInstructions from "@/lib/washingInstructions";
import WashingInstruction from "@/components/product-detail/WashingInstruction";
import RelatedProducts from "@/components/product-detail/RelatedProducts";
import { sizesArray } from "@/lib/default-data";
import toast from "react-hot-toast";
import { BsExclamationCircleFill } from "react-icons/bs";
import ProductImageColors from "@/components/product-detail/ProductImageColors";
import { Badge } from "@/components/ui/badge";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

export function ProductDetailPage() {
  const { addItem, items } = useCart();

  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [isItemSelected, setIsItemSelected] = useState(false);
  const location = useLocation();
  const contentRef = useRef<HTMLDivElement>(null);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
  } = useQuery<Product>({
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
    refetch();
  }, [slug, refetch]);

  useEffect(() => {
    if (product?.variants) {
      setSelectedVariant(product.variants[0]);
      setSelectedSize(null);
    } else {
      setSelectedVariant(null);
      setSelectedSize(null);
    }
  }, [product, slug]);

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
    ? price - (parseInt(product?.discountPercent) / 100) * price
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

    setErrorMessage("");
    addItem({
      productId: selectedVariant.productId,
      variantId: selectedVariant.id,
      attributeId: selectedVariant.attributes.find(
        (atr) => atr.size === selectedSize
      )?.id as string,
      quantity,
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
      const isSelected = items.some(
        (item) => item.productId + item.attributeId + item.variantId === cartId
      );
      setIsItemSelected(isSelected);
    }
    setErrorMessage("");
  };

  return (
    <div className="w-full flex flex-col gap-y-5  md:w-[90%] px-2 sm:px-4  md:mx-auto h-full py-2 sm:py-8 lg:py-14  ">
      <div className="container mx-auto">
      <div
        ref={contentRef}
        className="w-full flex flex-col md:flex-row items-start gap-8"
      >
        {!isLoading && selectedVariant?.images && (
          <ProductImages images={selectedVariant.images} />
        )}

        {/* Product Details */}
        <section className="w-full md:w-[40%] flex h-full flex-col border-b border-black/40 pb-4 gap-6">
          <div className=" border-b pb-2">
            <h1 className="text-2xl sm:text-3xl ubuntu-medium text-[#121212]">
              {product.name} - {selectedVariant?.color}
            </h1>
            <p className="text-sm text-muted-foreground -tracking-tighter">
              {product.category.name}
            </p>
            {product.status === "out_of_stock" ||
              (product.totalQuantity < 1 && (
                <Badge variant="destructive" className="absolute right-4 top-4">
                  Out of Stock
                </Badge>
              ))}
            <div className="mt-2">
              {product?.discountPercent ? (
                <div>
                  <p className="text-3xl font-bold ">
                    &#8377; {Math.floor(currentPrice)}{" "}
                    <span className="bg-green-500 font-normal rounded-sm text-white px-2 py-0.5 text-sm">
                      ({product.discountPercent}% OFF)
                    </span>
                  </p>
                  <p className="text-base line-through text-red-500">
                    &#8377; {Math.floor(price)}
                  </p>
                </div>
              ) : (
                <p className="text-2xl font-bold ">
                  &#8377; {Math.floor(price)}
                </p>
              )}
            </div>
          </div>

          {/* Variants */}
          <div className="flex flex-col gap-3">
            <p className=" capitalize font-semibold text-lg">
              color:{" "}
              <span className=" text-base text-gray-400">
                {" "}
                {selectedVariant?.color}{" "}
              </span>
            </p>

            <ProductImageColors
              variants={product.variants}
              onSelectVariant={handleSelectVariant}
            />
          </div>

          {/* Sizes */}
          <div className="flex flex-col  gap-3 mt-2 justify-between ">
            <div className="flex flex-col gap-2 ">
              <p className=" flex items-center gap-2 uppercase text-xs space-x-5 text-[#FF0000]">
                {errorMessage ? <BsExclamationCircleFill size={16} /> : null}{" "}
                {errorMessage}
              </p>

              <div className="flex gap-2">
                {sizesArray.map((size) => {
                  const isAvailable = availableSizes.includes(size);
                  const isActive = size === selectedSize;

                  return (
                    <div key={size}>
                      <Button
                        key={size}
                        onClick={() => isAvailable && handleSelectSize(size)}
                        disabled={!isAvailable || product.totalQuantity < 1}
                        className={`flex relative items-center justify-center border border-black  h-10 w-10 rounded-full bg-white text-black   ${
                          isAvailable
                            ? isActive
                              ? " bg-primary text-white pointer-events-none "
                              : " "
                            : "opacity-80 cursor-not-allowed"
                        }`}
                      >
                        <span
                          className={`relative ${
                            !isAvailable || product.totalQuantity < 1
                              ? "text-muted-foreground"
                              : ""
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

          {currentStock === 0 ||
          product.status === "out_of_stock" ||
          product.totalQuantity < 1 ? (
            <Badge
              variant="destructive"
              className="text-lg w-32  text-center  rounded-full"
            >
              Out of Stock
            </Badge>
          ) : (
            <div className="w-[50%] flex flex-col gap-2">
              <Button
                onClick={handleAddToCart}
                className="flex items-center gap-2"
              >
                ADD TO BAG
              </Button>
            </div>
          )}
        </section>
      </div>

      <div className="mt-8">
        <h6 className=" text-2xl sm:text-3xl ubuntu-medium">
          Product Description
        </h6>
        <ReactQuill
          value={product.description ? product.description : ""}
          theme="bubble"
          readOnly
        />
      </div>

      {/* Washing Instructions */}
      <div className="mt-8 flex flex-col gap-4 ">
        <h6 className=" text-2xl sm:text-3xl ubuntu-medium">
          Washing Instructions
        </h6>
        <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 border border-muted-foreground rounded-md max-[550px]:px-2 px-8 py-2">
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
    </div>
  );
}
