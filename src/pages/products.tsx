import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductFilters } from "@/components/products/ProductFilters";
import { Skeleton } from "@/components/ui/skeleton";
import { useLocation } from "react-router-dom";
import { Product } from "@/types/product";
import MobileProductFilter from "@/components/products/MobileProductFilter";
import { staggerFadeIn } from "@/lib/animations";

// Helper function to extract filters from the search params
const getFiltersFromSearchParams = (searchParams: URLSearchParams) => {
  return {
    categoryId: searchParams.get("category_id") || undefined,
    categoryName: searchParams.get("category_name") || undefined,
    size: searchParams.get("size") || undefined,
    color: searchParams.get("color") || undefined,
    search: searchParams.get("search") || undefined,
    discountedProducts: searchParams.get("discountedProducts") || undefined,
    newArrivals: searchParams.get("newArrivals") || undefined,
    minPrice: searchParams.get("min_price")
      ? parseInt(searchParams.get("min_price")!)
      : undefined,
    maxPrice: searchParams.get("max_price")
      ? parseInt(searchParams.get("max_price")!)
      : undefined,
  };
};

export function ProductsPage() {
  const { ref, inView } = useInView();
  const { search } = useLocation();

  const searchParams = new URLSearchParams(search);

  const productsRef = useRef<HTMLDivElement>(null);

  const filters = getFiltersFromSearchParams(searchParams);
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useProducts(filters);

  // adding the animations to cards
  useEffect(() => {
    if (productsRef.current && !isLoading) {
      const elements = productsRef.current.querySelectorAll(".product-card");
      staggerFadeIn(Array.from(elements));
    }
  }, [isLoading]);

  // adding infinite loading
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);
  return (
    <div className="w-full h-full md:w-[95%] sm:px-4 md:mx-auto py-2 sm:py-8 lg:py-10  p-5 lg:px-20">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        <div className="block md:hidden w-full h-full">
          <MobileProductFilter />
        </div>
        <aside className="md:col-span-1 hidden md:block  ">
          <ProductFilters />
        </aside>
        <section className="md:col-span-3">
          {/* Show message if no products are found */}
          {!isLoading && !data?.pages.length && (
            <p className="text-center text-lg w-full">No Products Found</p>
          )}

          {/* Product Grid */}

          {data?.pages[0].products.length === 0 && !isLoading ? (
            <p className="text-lg text-center w-full  text-muted-foreground">
              Product not found with the {JSON.stringify(filters)}
            </p>
          ) : (
            <div
              ref={productsRef}
              className="grid grid-cols-2 gap-3 lg:gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {/* Skeleton loader for loading state */}
              {isLoading &&
                Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="h-[300px] w-full" />
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              {data?.pages.map((page) =>
                page.products.map((product: Product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              )}
              {/* Render products */}

              {isFetchingNextPage &&
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="h-[300px] w-full" />
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
            </div>
          )}

          {/* Sentinel Element for Intersection Observer */}
          {hasNextPage && (
            <div ref={ref} className="mt-8 flex justify-center h-4"></div>
          )}
        </section>
      </div>
    </div>
  );
}
