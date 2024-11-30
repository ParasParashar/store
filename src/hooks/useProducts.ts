import { useInfiniteQuery } from '@tanstack/react-query';
import { Filters, Product } from '@/types/product';
import AxiosBase from '@/lib/axios';


const fetchProducts = async ({
  pageParam = 1,
  filters,
}: {
  pageParam?: number;
  filters?: Filters;
}): Promise<{ products: Product[]; nextPage: number | null }> => {
  const queryParams = buildFilterQueryParams(filters || {});
  const { data } = await AxiosBase.get(`/api/store/products?page=${pageParam}&${queryParams}`);

  if (!data.success) {
    throw new Error("Failed to fetch products");
  }

  return data.data;
};

export const useProducts = (filters?: Filters) => {
  return useInfiniteQuery({
    queryKey: ["products", filters],
    queryFn: ({ pageParam }) => fetchProducts({ pageParam, filters }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
    enabled: !!filters
  });
};


export const buildFilterQueryParams = (filters: Filters): string => {
  const params = new URLSearchParams();

  if (filters.categoryId) params.set("category_id", filters.categoryId);
  if (filters.categoryName) params.set("category_name", filters.categoryName);
  if (filters.size) params.set("size", filters.size);
  if (filters.color) params.set("color", filters.color);
  if (filters.minPrice !== undefined) params.set("min_price", filters.minPrice.toString());
  if (filters.maxPrice !== undefined) params.set("max_price", filters.maxPrice.toString());

  return params.toString();
};

