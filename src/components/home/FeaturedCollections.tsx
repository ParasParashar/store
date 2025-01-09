import { motion } from "framer-motion";
import { LampContainer } from '../ui/lamp';
import FeaturedCollectionsSlider from './FeaturedCollectionsSlider';
import { useQuery } from '@tanstack/react-query';
import AxiosBase from '@/lib/axios';

const FeaturedCollections: React.FC = () => {

  // fetching the data
  const {data: featuredproducts} = useQuery(
    {
      queryKey: ["homeFeaturedProducts"],
      queryFn: async () => {
        const {data} = await AxiosBase.get("/api/store/featuredproducts")
        return data.data
      }
    }
  )

  // console.log(featuredproducts)

  return (
    <div className="bg-[#010517] text-white pb-14 w-full relative z-20">
          
      {/* Featured Collection title and subtitle with aceternity ui */}
        <LampContainer>
           <motion.h1
           initial={{ opacity: 0, y: 100 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{
             delay: 0.3,
             duration: 0.8,
             ease: "easeInOut",
             
           }} >

            <h1 className="text-2xl md:text-4xl font-semibold text-center tracking-wide mb-10">FEATURED COLLECTIONS</h1>
        
            <h1 className="text-3xl md:text-5xl font-bold tracking-widest mb-4 p-1 protest-revolution-regular text-center ">
              DIVE INTO A WORLD OF ENDLESS FASHION POSSIBILITIES
            </h1>
           </motion.h1>
        
        
         
        </LampContainer>

      {/* Featured Collection products in unique slider */}
      <div className=' container mx-auto'>
          <FeaturedCollectionsSlider products={featuredproducts} />
      </div>
    </div>
  );
};

export default FeaturedCollections;
