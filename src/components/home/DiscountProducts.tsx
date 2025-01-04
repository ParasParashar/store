import AxiosBase from "@/lib/axios"
import { ProductCard } from "../products/ProductCard"
import { useQuery } from "@tanstack/react-query"
import { Product } from "@/types/product"

const DiscountProducts =  () => {

    // fetching discounted products
    const {data:discountProduct} = useQuery({
        queryKey: ['homeDiscountProduct'],
        queryFn: async () => {
            const {data} = await AxiosBase.get("/api/store/discountedproducts")
            return data.data
        }
    })


  return (
    <div className="w-full relative z-20 bg-white py-8 " >
        <h2 className="text-center text-3xl md:text-5xl font-bold my-12 uppercase"> Discounted Products</h2>
        <div className="container mx-auto grid grid-cols-2 gap-2 sm:grid-cols-3 " >
            
            {discountProduct?.map((product:Product,index:number) => (
                <ProductCard key={index} product={product} />
            ))}
        </div>
    </div>
  )
}

export default DiscountProducts