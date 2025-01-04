import { useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types/product";
import { IoBagOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import useSelectVariantController from "@/hooks/useSelectModal";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { onOpen, addVariants, setProduct } = useSelectVariantController();
  const [imageLoaded, setImageLoaded] = useState(false);

  if (!product) return null;

  const {
    discountPercent,
    price,
    name,
    category,
    slug,
    status,
    variants,
    totalQuantity,
  } = product;

  const discountedPrice = price - (discountPercent / 100) * price;

  const handleAddToCart = () => {
    addVariants(variants);
    setProduct({
      name: name,
      price: price,
      status: status,
      slug: slug,
      discountPercent: +discountPercent as number,
    });
    onOpen();
  };

  const placeholderImage = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBzdHlsZT0iYmFja2dyb3VuZDojZGRkZGRkO2Rpc3BsYXk6YmxvY2s7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTsiIC8+`;

  return (
    <motion.div
      whileHover="hover"
      transition={{
        duration: 1,
        ease: "backInOut",
      }}
      // variants={{}}
      className="relative h-full overflow-hidden shadow-md bg-white product-card"
    >
      <Link to={`/product/${slug}`} className="relative">
        <div className="relative aspect-square overflow-hidden">
          <motion.img
            src={variants[0]?.images[0]}
            alt={name}
            className={`h-full w-full object-cover transition-all  duration-700 ease-in ${
              imageLoaded ? "blur-0" : "blur-lg"
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              e.currentTarget.src = placeholderImage;
            }}
          />
          {status === "out_of_stock" ||
            (totalQuantity < 1 && (
              <Badge variant="destructive" className="absolute right-4 top-4">
                Out of Stock
              </Badge>
            ))}
        </div>
        {status !== "out_of_stock" && (
          <motion.button
            className="absolute bottom-0 inset-x-0 z-20 py-2 text-center font-mono font-black uppercase transition-colors group bg-white hover:bg-secondary text-green-800 hover:text-green-900"
            initial={{ y: "50%", opacity: 0, translateY: 0 }}
            variants={{
              hover: {
                y: 0,
                opacity: 100,
                translateY: 1,
              },
            }}
            transition={{
              duration: 1,
              ease: "backInOut",
              visualDuration: 0,
            }}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              handleAddToCart();
            }}
            disabled={totalQuantity < 1}
          >
            <IoBagOutline
              className="inline-block group-hover:text-green-500 mr-2"
              size={20}
            />
            Add to Cart
          </motion.button>
        )}
      </Link>

      <div className="p-3">
        <div className="flex flex-col gap-2">
          <div>
            <h3 className="font-semibold text-sm sm:text-lg">{name}</h3>
            <p className="text-sm text-muted-foreground">{category?.name}</p>
          </div>
          <div className="mt-2 relative flex items-center justify-between">
            {discountedPrice !== price ? (
              <div className="flex gap-2 items-end">
                <p className="font-bold text-lg">
                  ₹{Math.floor(discountedPrice)}
                </p>
                <p className="text-red-500 text-muted-foreground line-through">
                  ₹{Math.floor(price)}
                </p>
              </div>
            ) : (
              <p className="text-lg font-bold">
                ₹{Math.floor(discountedPrice)}
              </p>
            )}
          </div>
        </div>
      </div>
      <button
        onClick={handleAddToCart}
        className=" absolute disabled:bg-primary/30 block lg:hidden bottom-0 right-[-10px] overflow-hidden  rounded-tl-lg"
        disabled={totalQuantity < 1}
      >
        <IoBagOutline
          className="inline-block disabled:bg-primary/30  bg-primary/60 p-1 hover:bg-primary/80  transition-all ease-in  rounded-tl-lg text-white group-hover:text-green-500 mr-2"
          size={40}
        />
      </button>
    </motion.div>
  );
}
