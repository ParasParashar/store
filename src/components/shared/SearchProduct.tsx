import React, { useState, useRef } from "react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { Button } from "../ui/button";

const SearchProduct = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      if (value) {
        navigate(`/products?search=${value}`, { replace: true });
      } else {
        navigate("/products", { replace: true });
      }
    }, 800);
  };

  const clearSearch = () => {
    setQuery("");
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
  };

  return (
    <div className="relative w-full max-w-xl">
      <div className="flex items-center bg-white/80 rounded-full px-3 py-2 gap-4">
        <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
        <input
          type="text"
          className="w-full shadow-none ring-0 focus:border-none bg-transparent border-none outline-none focus:ring-0"
          placeholder="Search products e.g., 'T-shirt'"
          value={query}
          onChange={handleChange}
        />
        {query.length > 1 && (
          <Button
            size={"icon"}
            variant={"ghost"}
            onClick={clearSearch}
            className="rounded-full transition-all ease-in-out duration-300"
          >
            <X size={15} className="text-muted-foreground" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default SearchProduct;
