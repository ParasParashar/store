// import { Link } from "react-router-dom";
// import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Product, Variant } from "@/types/product";
// import { IoBagOutline } from "react-icons/io5";
// import useSelectVariantController from "@/hooks/useSelectModal";

// interface ProductCardProps {
//   product: Product;
// }

// export function ProductCard({ product }: ProductCardProps) {
//   const { onOpen, addVariants, setProduct } = useSelectVariantController();

//   if (!product) return null;

//   const { discountPercent, price, name, category, slug, status, variants } =
//     product;

//   const discountedPrice = price - (discountPercent / 100) * price;
//   const handleAddToCart = () => {
//     addVariants(variants);
//     setProduct({
//       name: name,
//       price: price,
//       status: status,
//       slug: slug,
//       discountPercent: +discountPercent as number,
//     });
//     onOpen();
//   };

//   return (
//     <Card className="group  h-full overflow-hidden shadow-md hover:shadow-lg transition-shadow ">
//       <CardContent className="p-0">
//         <Link to={`/product/${slug}`}>
//           <div className="relative aspect-square overflow-hidden">
//             <img
//               src={variants[0].images[0]}
//               alt={name}
//               className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
//             />
//             {status === "out_of_stock" && (
//               <Badge variant="destructive" className="absolute right-4 top-4">
//                 Out of Stock
//               </Badge>
//             )}
//           </div>
//         </Link>
//       </CardContent>
//       <CardFooter className="p-3">
//         <div className="flex w-full flex-col gap-2">
//           {/* Product Name and Category */}
//           <div className="flex flex-col gap-1 items-start justify-between">
//             <div>
//               <h3 className="font-semibold">{name}</h3>
//               <p className="text-sm text-muted-foreground">{category.name}</p>
//             </div>
//             {/* Price Section */}
//             <div className="text-right">
//               {discountedPrice !== price ? (
//                 <div className="flex flex-col items-start justify-start">
//                   <p className="text-red-600 flex items-center gap-3 font-bold text-lg">
//                     &#8377;{discountedPrice.toFixed(2)}
//                     <span className="text-sm text-muted-foreground line-through">
//                       &#8377;{price.toFixed(2)}
//                     </span>
//                   </p>
//                   <p className="text-sm text-green-600">
//                     Save {discountPercent}%
//                   </p>
//                 </div>
//               ) : (
//                 <p className="text-lg font-bold">&#8377; {price.toFixed(2)}</p>
//               )}
//             </div>
//           </div>
//           {/* Action Buttons */}
//           <div className="flex gap-2">
//             <Button
//               disabled={product.status === "out_of_stock"}
//               className="flex items-center justify-center gap-2 flex-1"
//               onClick={handleAddToCart}
//             >
//               <IoBagOutline size={20} />
//               Add to Cart
//             </Button>{" "}
//           </div>
//         </div>
//       </CardFooter>
//     </Card>
//   );
// }
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";
import { IoBagOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import useSelectVariantController from "@/hooks/useSelectModal";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { onOpen, addVariants, setProduct } = useSelectVariantController();

  if (!product) return null;

  const { discountPercent, price, name, category, slug, status, variants } =
    product;

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

  return (
    <motion.div
      whileHover="hover"
      transition={{
        duration: 1,
        ease: "backInOut",
      }}
      variants={{
        hover: {
          scale: 1.05,
        },
      }}
      className="relative h-full  overflow-hidden rounded-xl shadow-md bg-white"
    >
      <Link to={`/product/${slug}`} className="relative">
        {/* <Link t o=> */}
        <div className="relative aspect-square overflow-hidden">
          <motion.img
            src={variants[0]?.images[0]}
            alt={name}
            className="h-full w-full object-cover "
          />
          {status === "out_of_stock" && (
            <Badge variant="destructive" className="absolute right-4 top-4">
              Out of Stock
            </Badge>
          )}
        </div>
        {/* </Link> */}

        {/* Button Animation */}
        <motion.button
          className="absolute bottom-0  inset-x-0 z-20  py-2 text-center font-mono font-black uppercase    transition-colors group bg-white hover:bg-secondary  text-green-800 hover:text-green-900"
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
          disabled={status === "out_of_stock"}
        >
          <IoBagOutline
            className="inline-block group-hover:text-green-500 mr-2"
            size={20}
          />
          Add to Cart
        </motion.button>
      </Link>

      <div className="p-3">
        <div className="flex flex-col gap-2">
          <div>
            <h3 className="font-semibold">{name}</h3>
            <p className="text-sm text-muted-foreground">{category?.name}</p>
          </div>
          <div className="mt-2">
            {discountedPrice !== price ? (
              <div className="flex flex-col">
                <p className="text-red-600 font-bold text-lg">
                  ₹{discountedPrice.toFixed(2)}
                </p>
                <p className="text-sm text-muted-foreground line-through">
                  ₹{price.toFixed(2)}
                </p>
              </div>
            ) : (
              <p className="text-lg font-bold">₹{price.toFixed(2)}</p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
