import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductFilters } from "@/components/products/ProductFilters";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useLocation } from "react-router-dom";
import { Product } from "@/types/product";

// Helper function to extract filters from the search params
const getFiltersFromSearchParams = (searchParams: URLSearchParams) => {
  return {
    categoryId: searchParams.get("category_id") || undefined,
    categoryName: searchParams.get("category_name") || undefined,
    size: searchParams.get("size") || undefined,
    color: searchParams.get("color") || undefined,
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
  const searchParams = new URLSearchParams(search); // Get the URL search params

  const filters = getFiltersFromSearchParams(searchParams); // Extract filters from the search params
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useProducts(filters);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);
  console.log(data?.pages);
  return (
    <div className="container mx-auto py-8 px-5 w-full md:w-3/4 ">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        <aside className="md:col-span-1">
          <ProductFilters />
        </aside>
        <div className="md:col-span-3">
          {!isLoading && !data?.pages.length && (
            <p className="text-center text-lg w-full">No Products Found</p>
          )}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {isLoading &&
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-[300px] w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            {data?.pages.map((page: any) =>
              page.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
          {hasNextPage && (
            <div ref={ref} className="mt-8 flex justify-center">
              <Button
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage || isFetchingNextPage}
              >
                {isFetchingNextPage
                  ? "Loading more..."
                  : hasNextPage
                  ? "Load More"
                  : "Nothing more to load"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
