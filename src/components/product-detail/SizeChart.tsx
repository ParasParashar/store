
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import useBottomCart from "@/hooks/useBottomCart"

const SizeChart = () => {

  const {isOpenBottomSlide, onCloseBottomSlide} = useBottomCart()

  return (
    <Sheet open={isOpenBottomSlide} onOpenChange={() => onCloseBottomSlide()} >
    <SheetContent side={"bottom"} className="h-full bg-transparent flex justify-center w-full pt-[3rem] ">
      <SheetHeader className="w-full md:w-[60%]">

      <button
            onClick={onCloseBottomSlide}
            className="absolute top-10 right-10 text-white px-3 py-1 lowercase -tracking-tighter "
          >
            Close
          </button>

        <SheetTitle className=" text-[#3B82F6] underline text-center text-2xl font-sans">Size Chart</SheetTitle>
        <SheetDescription className="w-full">
        
      <div className="w-full shadow-md rounded-lg p-4">
        
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-4 bg-gray-200 text-center text-lg">Size</th>
              <th className="border border-gray-300 p-4 bg-gray-200 text-center text-lg">Waist in cm</th>
              <th className="border border-gray-300 p-4 bg-gray-200 text-center text-lg">Length in cm</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 text-center text-lg p-3 text-white font-semibold">S</td>
              <td className="border border-gray-300 text-center text-lg p-3 text-white font-semibold">99.06</td>
              <td className="border border-gray-300 text-center text-lg p-3 text-white font-semibold">68.58</td>
            </tr>
            <tr>
              <td className="border border-gray-300 text-center text-lg p-3 text-white font-semibold">M</td>
              <td className="border border-gray-300 text-center text-lg p-3 text-white font-semibold">104.14</td>
              <td className="border border-gray-300 text-center text-lg p-3 text-white font-semibold">69.85</td>
            </tr>
            <tr>
              <td className="border border-gray-300 text-center text-lg p-3 text-white font-semibold">L</td>
              <td className="border border-gray-300 text-center text-lg p-3 text-white font-semibold">109.22</td>
              <td className="border border-gray-300 text-center text-lg p-3 text-white font-semibold">71.12</td>
            </tr>
            <tr>
              <td className="border border-gray-300 text-center text-lg p-3 text-white font-semibold">XL</td>
              <td className="border border-gray-300 text-center text-lg p-3 text-white font-semibold">114.3</td>
              <td className="border border-gray-300 text-center text-lg p-3 text-white font-semibold">72.39</td>
            </tr>
            <tr>
              <td className="border border-gray-300 text-center text-lg p-3 text-white font-semibold">XXL</td>
              <td className="border border-gray-300 text-center text-lg p-3 text-white font-semibold">119.38</td>
              <td className="border border-gray-300 text-center text-lg p-3 text-white font-semibold">73.66</td>
            </tr>
          </tbody>
        </table>
      
    </div>
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  </Sheet>
  
  )
}

export default SizeChart