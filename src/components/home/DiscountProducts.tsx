import AxiosBase from "@/lib/axios";
import { ProductCard } from "../products/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types/product";
import { cn } from "@/lib/utils";

const DiscountProducts = () => {
  // fetching discounted products
  const { data: discountProduct } = useQuery({
    queryKey: ["homeDiscountProduct"],
    queryFn: async () => {
      const { data } = await AxiosBase.get("/api/store/discountedproducts");
      return data.data;
    },
  });

  return (
    <div className="relative bg-gradient-to-b from-[#373737] to-[#0f0f0f]   z-20  w-full py-8 ">
      <h2 className="text-center text-3xl md:text-5xl font-bold my-12 uppercase">
        {" "}
        Discounted Products
      </h2>
      <div className="container mx-auto grid grid-cols-2 gap-2 sm:grid-cols-3 w-3/4 ">
        {discountProduct?.map((product: Product, index: number) => (
          <section
            className={cn(index % 3 === 0 && "col-span-2")}
            key={product.id}
          >
            <ProductCard product={product} />
          </section>
        ))}
      </div>
    </div>
  );
};

export default DiscountProducts;
