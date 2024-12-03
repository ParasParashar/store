import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { X } from "lucide-react";
import { Button } from "../ui/button";

const SizeChart = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#1C1D45] max-lg:hidden">
            Check your size?
          </span>
          <Button
            variant="link"
            className="text-xs uppercase text-[#1C1D45] hover:text-[#3B82F6]"
          >
            Size chart
          </Button>
        </div>
      </SheetTrigger>

      <SheetContent
        side="bottom"
        className="h-full w-full bg-transparent text-white overflow-y-auto p-6"
      >
        <SheetHeader>
          <SheetTitle className="text-3xl font-semibold text-center mb-4 text-white">
            Size Chart
          </SheetTitle>
        </SheetHeader>

        <SheetDescription>
          <div className="max-w-3xl mx-auto shadow-lg rounded-lg overflow-hidden">
            <table className="w-full table-fixed border-collapse">
              <thead>
                <tr className="bg-[#3B82F6] text-white">
                  <th className="p-3 text-center text-lg font-semibold">
                    Size
                  </th>
                  <th className="p-3 text-center text-lg font-semibold">
                    Waist (cm)
                  </th>
                  <th className="p-3 text-center text-lg font-semibold">
                    Length (cm)
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { size: "S", waist: "99.06", length: "68.58" },
                  { size: "M", waist: "104.14", length: "69.85" },
                  { size: "L", waist: "109.22", length: "71.12" },
                  { size: "XL", waist: "114.3", length: "72.39" },
                  { size: "XXL", waist: "119.38", length: "73.66" },
                ].map((item, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0
                        ? "bg-[#ffffff10] text-white"
                        : "bg-[#ffffff05] text-white"
                    }`}
                  >
                    <td className="p-4 text-center text-base font-medium">
                      {item.size}
                    </td>
                    <td className="p-4 text-center text-base">{item.waist}</td>
                    <td className="p-4 text-center text-base">{item.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SheetDescription>

        <SheetClose asChild>
          <button
            aria-label="Close"
            className="absolute top-4 right-4 p-2 rounded-full bg-[#3B82F6] hover:bg-[#2563EB] focus:ring-2 focus:ring-offset-2 focus:ring-[#3B82F6]"
          >
            <X className="text-white w-5 h-5" />
          </button>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
};

export default SizeChart;
