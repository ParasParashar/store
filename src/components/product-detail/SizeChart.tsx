import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";

const SizeChart = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#1C1D45] ">Check your size?</span>
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
        className="h-full w-full bg-transparent/60 text-white overflow-y-auto py-6 border-none ring-0 px-2 sm:p-12"
      >
        <SheetHeader>
          <SheetTitle className="text-3xl underline font-mono text-center mb-8 text-[#3B82F6]">
            Size Chart
          </SheetTitle>
        </SheetHeader>

        <SheetDescription>
          <div className="max-w-3xl mx-auto shadow-lg rounded-lg overflow-hidden">
            <table className="w-full table-fixed border-collapse">
              <thead>
                <tr className="bg-[#F3F4F6] text-black">
                  <th className="p-3 text-center text-lg font-semibold border-r border-gray-500">
                    Size
                  </th>
                  <th className="p-3 text-center text-lg font-semibold border-r border-gray-500">
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
                    <td className="p-4 text-center text-xl font-medium">
                      {item.size}
                    </td>
                    <td className="p-4 text-center text-xl">{item.waist}</td>
                    <td className="p-4 text-center text-xl">{item.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default SizeChart;
