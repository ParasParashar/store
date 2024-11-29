import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useQuery } from "@tanstack/react-query";
import AxiosBase from "@/lib/axios";

type categoryType = {
  name: string;
  id: string;
};
export function ProductFilters() {
  const [priceRange, setPriceRange] = useState([0, 3000]);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["filters"],
    queryFn: async () => {
      const { data } = await AxiosBase.get("/api/store/filterlist");
      return data.data;
    },
  });

  if (isLoading) return <div>Loading filters...</div>;
  if (isError) return <div>Error loading filters: {error.message}</div>;

  const { category, colors, sizes } = data;
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="categories">
        <AccordionTrigger>Categories</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            {category?.map((category: categoryType) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox id={category.id} />
                <Label htmlFor={category.id}>{category.name}</Label>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="sizes">
        <AccordionTrigger>Sizes</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            {sizes?.map((size: string) => (
              <div key={size} className="flex items-center space-x-2">
                <Checkbox id={size} />
                <Label htmlFor={size}>{size}</Label>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="colors">
        <AccordionTrigger>Colors</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            {colors?.map((color: string) => (
              <div key={color} className="flex items-center space-x-2">
                <Checkbox id={color} />
                <Label htmlFor={color}>{color}</Label>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="price">
        <AccordionTrigger>Price Range</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={3000}
              step={10}
              className="mt-2"
            />
            <div className="flex items-center justify-between text-sm">
              <span>&#8377;{priceRange[0]}</span>
              <span>&#8377;{priceRange[1]}</span>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
