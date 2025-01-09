import { useQuery } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { FaCircleArrowRight } from "react-icons/fa6";
import AxiosBase from "@/lib/axios";

const NewCollection = () => {

  const {data:newArrivals} = useQuery({
    queryKey:["heroNewCollections"],
    queryFn: async () => {
      const data = await AxiosBase.get('/api/store/newarrivals')
      return data.data
    }
  })

  const handleCheckNow = () => { 
    console.log(newArrivals)
  }  

  return (
    <main className="NewCollectioStyles text-white w-full h-screen relative right-0 py-6 px-2 md:p-12 mt-[100vh] z-20">
        <div className="absolute -top-32 md:-top-20 right-0 w-1/2 md:w-1/3 h-full">
            <img src="/NewCollection/newCollection1.png" alt="mainImage" className="w-full h-full object-cover" />
        </div>
      {/* Laptop and mobile layout container */}
      <section className="container flex flex-col md:flex-row md:absolute">
        {/* Left Section */}
        <div className="flex flex-col gap-2 w-full z-10 mb-8 md:mb-0 md:origin-bottom-left md:absolute md:left-1/4 md:top-48  md:-rotate-90">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight playfair-display-regular">NEW</h1> 
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight playfair-display-regular">COLLECTION</h1> 
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight playfair-display-regular">2025</h1>  
        </div>

        <div className="  flex flex-col gap-2 z-10 md:absolute md:left-1/3">
            <p className="text-xl md:text-4xl ubuntu-light order-1 md:order-2 md:mb-4">
            Where style speaks, Fashion Flourishes, trend resonate
          </p>

          <Button variant="secondary" size={"lg"} className="w-40 mb-5 order-2 md:order-3  "
          onClick={handleCheckNow}  
          >
            <span className=" mr-2">Check Now</span>
            <FaCircleArrowRight size={24} />
          </Button>

          <div className=" flex gap-4 order-3 md:order-1 md:mb-8">
            <div className="w-32 h-44 md:w-40 md:h-56 lg:w-48 lg:h-60 ">
                <img src="/NewCollection/newCollection2.jpg" className="w-full h-full object-cover"/>
            </div>
            <div className="w-32 h-44 md:w-40 md:h-56  lg:w-48 lg:h-60">
                <img src="/NewCollection/newCollection5.jpg" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default NewCollection;