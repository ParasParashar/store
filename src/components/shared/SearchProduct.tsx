import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";
import AxiosBase from "@/lib/axios";
import { Product } from "@/types/product";

const SearchProduct = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedQuery(query);
    }, 800);

    return () => clearTimeout(t);
  }, [query]);

  const { data, isLoading } = useQuery({
    queryKey: ["search", debouncedQuery],
    queryFn: async () => {
      if (!debouncedQuery) return [];
      const { data } = await AxiosBase.get(
        `/api/store/search?search=${debouncedQuery}`
      );
      if (!data.success) throw new Error(data.error || "Something went wrong");
      return data.data;
    },
    enabled: !!debouncedQuery,
  });

  return (
    <div className="relative w-full max-w-xl">
      <div className="flex items-center px-3 py-2  ">
        <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
        <Input
          type="text"
          className="w-full shadow-none ring-0 focus:border-none  bg-transparent border-none outline-none focus:ring-0"
          placeholder="Search products e.g., 'T-shirt'"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 350)}
        />
      </div>

      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-md shadow-lg z-50">
          {isLoading && (
            <div className="p-4">
              <Skeleton className="h-8 w-3/4 mb-2" />
              <Skeleton className="h-8 w-1/2" />
            </div>
          )}
          {!isLoading && data?.length === 0 && (
            <p className="p-4 text-center text-gray-500">No products found</p>
          )}
          {!isLoading && data?.length > 0 && (
            <ul className="divide-y divide-gray-200">
              {data.map((product: Product) => (
                <li key={product.id} className="hover:bg-gray-100">
                  <Link
                    to={`/product/${product.slug}`}
                    className="flex items-center p-4 space-x-4"
                  >
                    <img
                      src={product.variants[0].images[0]}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                    <div>
                      <p className="font-medium line-clamp-1 text-gray-800">
                        {product.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {product.category.name}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchProduct;
