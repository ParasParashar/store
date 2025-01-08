import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { MdDiscount } from "react-icons/md";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useQuery } from "@tanstack/react-query";
import AxiosBase from "@/lib/axios";
import { Skeleton } from "../ui/skeleton";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { FcClearFilters } from "react-icons/fc";
import { IoMdTrendingUp } from "react-icons/io";

export function ProductFilters() {
  const [selectedFilters, setSelectedFilters] = useState<{
    category: { id: string | null; name: string | null };
    size: string | null;
    color: string | null;
    discountedProducts: string | null;
    newArrivals: string | null;
    priceRange: [number, number];
  }>({
    category: { id: null, name: null },
    size: null,
    color: null,
    newArrivals: null,
    discountedProducts: null,
    priceRange: [0, 3000],
  });

  const location = useLocation();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["filters"],
    queryFn: async () => {
      const { data } = await AxiosBase.get("/api/store/filterlist");
      return data.data;
    },
  });

  const updateURLParams = () => {
    const params = new URLSearchParams(location.search);
    if (selectedFilters.category.id && selectedFilters.category.name) {
      params.set("category_id", selectedFilters.category.id);
      params.set("category_name", selectedFilters.category.name);
    } else {
      params.delete("category_id");
      params.delete("category_name");
    }

    if (selectedFilters.size) {
      params.set("size", selectedFilters.size);
    } else {
      params.delete("size");
    }

    if (selectedFilters.color) {
      params.set("color", selectedFilters.color);
    } else {
      params.delete("color");
    }
    if (selectedFilters.newArrivals) {
      params.set("newArrivals", "true");
    } else {
      params.delete("newArrivals");
    }
    if (selectedFilters.discountedProducts) {
      params.set("discountedProducts", "true");
    } else {
      params.delete("discountedProducts");
    }
    params.set("min_price", String(selectedFilters.priceRange[0]));
    params.set("max_price", String(selectedFilters.priceRange[1]));

    navigate({ search: params.toString() }, { replace: true });
  };

  const handleCategoryChange = (id: string, name: string) => {
    setSelectedFilters((prev) => {
      return {
        ...prev,
        category:
          prev.category.id === id ? { id: null, name: null } : { id, name },
      };
    });
  };

  const handleSizeChange = (size: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      size: prev.size === size ? null : size,
    }));
  };

  const handleColorChange = (color: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      color: prev.color === color ? null : color,
    }));
  };

  const handlePriceChange = ([min, max]: number[]) => {
    setSelectedFilters((prev) => ({
      ...prev,
      priceRange: [min, max],
    }));
  };

  const handleNewDiscount = (type: string) => {
    if (type === "new") {
      setSelectedFilters((prev) => ({
        ...prev,
        newArrivals: "true",
      }));
    } else {
      setSelectedFilters((prev) => ({
        ...prev,
        discountedProducts: "true",
      }));
    }
  };

  useEffect(() => {
    updateURLParams();
  }, [selectedFilters]);

  const clearFilters = () => {
    setSelectedFilters({
      category: { id: null, name: null },
      size: null,
      color: null,
      priceRange: [0, 3000],
      discountedProducts: null,
      newArrivals: null,
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center flex-col gap-3">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="w-full gap-3 flex items-center justify-between"
          >
            <Skeleton className="w-1/2 h-10" />
            <Skeleton className="w-5 rounded-full h-5" />
          </div>
        ))}
      </div>
    );
  }

  if (isError) return <div>Error loading filters: {error.message}</div>;

  const { category, colors, sizes } = data;

  return (
    <Accordion type="multiple" className="w-full">
      <div className="flex  my-1 mb-2 w-full items-center gap-3">
        <HiOutlineAdjustmentsHorizontal className="text-muted-foreground" />
        <p className="text-muted-foreground text-sm ">filters</p>
      </div>
      <button
        onClick={clearFilters}
        className="my-5 flex  gap-3 items-center text-muted-foreground text-xs group  hover:text-primary"
      >
        <FcClearFilters className="text-muted-foreground group-hover:text-primary" />
        Clear Filters
      </button>
      {/* fetch products by new arrival and discounts */}
      <AccordionItem value="featured">
        <AccordionTrigger className="text-sm hover:no-underline font-semibold">
          Fiter by
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-3">
          <Button
            size={"sm"}
            variant={"ghost"}
            onClick={() => handleNewDiscount("new")}
            className="rounded-full flex items-center justify-start text-sm gap-3  text-muted-foreground font-semibold"
          >
            <IoMdTrendingUp />
            New Arrivals
          </Button>
          <Button
            variant={"ghost"}
            size={"sm"}
            className="rounded-full flex items-center justify-start text-sm gap-3  text-muted-foreground font-semibold"
            onClick={() => handleNewDiscount("discount")}
          >
            <MdDiscount size={20} />
            Discounte Products
          </Button>
        </AccordionContent>
      </AccordionItem>

      {/* Categories */}
      <AccordionItem value="categories">
        <AccordionTrigger className="text-sm hover:no-underline font-semibold">
          Categories
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-3">
          {category?.map((cat: { id: string; name: string }) => (
            <div key={cat.id} className="flex items-center space-x-2">
              <Checkbox
                id={cat.id}
                checked={selectedFilters.category.id === cat.id}
                onCheckedChange={() => handleCategoryChange(cat.id, cat.name)}
              />
              <Label htmlFor={cat.id}>{cat.name}</Label>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>

      {/* Sizes */}
      <AccordionItem value="sizes">
        <AccordionTrigger className="text-sm hover:no-underline font-semibold">
          Sizes
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-3">
          {sizes?.map((size: string) => (
            <div key={size} className="flex items-center space-x-2">
              <Checkbox
                id={size}
                checked={selectedFilters.size === size}
                onCheckedChange={() => handleSizeChange(size)}
              />
              <Label htmlFor={size}>{size}</Label>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>

      {/* Colors */}
      <AccordionItem value="colors">
        <AccordionTrigger className="text-sm hover:no-underline font-semibold">
          Colors
        </AccordionTrigger>
        <AccordionContent className="flex flex-wrap gap-3">
          {colors?.map((color: string) => (
            <div
              key={color}
              className="flex items-center space-x-2 rounded-full border p-1 cursor-pointer hover:border-muted-foreground"
            >
              <Checkbox
                id={color}
                hidden
                checked={selectedFilters.color === color}
                onCheckedChange={() => handleColorChange(color)}
              />
              <span
                style={{
                  backgroundColor: color,
                  width: "10px",
                  height: "10px",
                  border: "1px solid black",
                  borderRadius: "100%",
                }}
              ></span>
              <Label htmlFor={color}>{color}</Label>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>

      {/* Price Range */}
      <AccordionItem value="price">
        <AccordionTrigger className="text-sm hover:no-underline font-semibold">
          Price Range
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-3">
          <Slider
            value={selectedFilters.priceRange}
            onValueChange={handlePriceChange}
            max={3000}
            step={10}
          />
          <div className="flex justify-between text-sm">
            <span>&#8377;{selectedFilters.priceRange[0]}</span>
            <span>&#8377;{selectedFilters.priceRange[1]}</span>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
