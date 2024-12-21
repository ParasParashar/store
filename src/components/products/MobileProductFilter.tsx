import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { ProductFilters } from "./ProductFilters";

const MobileProductFilter = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <div className="flex justify-between w-full text-muted-foreground items-center gap-3">
          <HiOutlineAdjustmentsHorizontal size={20} />
          <p className="text-muted-foreground text-sm lg:text-lg">filters</p>
        </div>
      </SheetTrigger>
      <SheetContent side={"left"} className="w-[65%]">
        <SheetHeader>
          <ProductFilters />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default MobileProductFilter;
