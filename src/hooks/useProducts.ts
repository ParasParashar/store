import { useInfiniteQuery } from '@tanstack/react-query';
import { Product, ProductFilters } from '@/types/product';

const fetchProducts = async ({
  pageParam = 1,
  filters,
}: {
  pageParam?: number;
  filters?: ProductFilters;
}): Promise<{ products: Product[]; nextPage: number | null }> => {
  // Simulated API call - replace with actual API endpoint
  const response = await fetch(
    `/api/products?page=${pageParam}&${new URLSearchParams(
      filters as Record<string, string>
    ).toString()}`
  );
  return response.json();
};

export const useProducts = (filters?: ProductFilters) => {
  return useInfiniteQuery({
    queryKey: ['products', filters],
    queryFn: ({ pageParam }) => fetchProducts({ pageParam, filters }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
  });
};

export const useFeaturedProducts = () => {
  return useInfiniteQuery({
    queryKey: ['featured-products'],
    queryFn: ({ pageParam = 1 }) =>
      fetchProducts({ pageParam, filters: { featured: true } }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
  });
};

export const useTrendingProducts = () => {
  return useInfiniteQuery({
    queryKey: ['trending-products'],
    queryFn: ({ pageParam = 1 }) =>
      fetchProducts({ pageParam, filters: { trending: true } }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
  });
};