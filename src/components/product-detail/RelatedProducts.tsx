import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AxiosBase from "@/lib/axios";
import { Product } from "@/types/product";
import { ProductCard } from "../products/ProductCard";

interface RelatedProductsProps {
  categoryId: string;
}
const RelatedProducts: React.FC<RelatedProductsProps> = ({ categoryId }) => {
  console.log(categoryId);
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["relatedProducts", categoryId],
    queryFn: async () => {
      const { data } = await AxiosBase.get(
        `/api/store/products?category_id=${categoryId}`
      );
      if (!data.success) throw new Error(data.message);
      return data.data;
    },
    enabled: !!categoryId,
  });

  console.log(products);
  if (isError) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <Skeleton
            key={index}
            className="w-full h-72 rounded-md bg-gray-100"
          />
        ))}
      </div>
    );
  }

  if (!products || (products.length === 0 && !isError)) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default RelatedProducts;
