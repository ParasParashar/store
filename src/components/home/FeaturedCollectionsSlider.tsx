import gsap from 'gsap';
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button';
import { HiArrowLongRight } from "react-icons/hi2";

interface FeaturedProducts{
  name:string,
  category: any,
  variants: any
}

interface SliderProps {
  products: FeaturedProducts[];
}

const FeaturedCollectionsSlider: React.FC<SliderProps> = ({products}) => {

  // state for active image
  const [activeIndex, setActiveIndex] = useState(1);

    // handling on click image
    const handleImageClick = (index: number) => {
      setActiveIndex(index);
    };

    // scaling the active image after every index of active image has changed
    useEffect(() => {
      gsap.fromTo(
        `.slider-img-${activeIndex}`,
        { scale: 0.8 },
        { scale: 1, duration: 0.5, ease: "power2.out" }
      );
    }, [activeIndex]);

  return (
    <div className="slider-container bg-cover bg-center h-[80%] flex items-center justify-center">
      <div className="slider-images flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 overflow-hidden">
        {products?.map((product, index) => (
          <div
            key={index}
            className={`flex items-center justify-center
              slider-img-${index} 
              ${
                index === activeIndex
                  ? "active w-[250px] h-[200px] md:w-[270px] md:h-[250px] lg:w-[320px] lg:h-[280px] xl:w-[550px] xl:h-[500px] relative cursor-pointer"
                  : index === 0 || index === products?.length - 1
                  ? "w-[120px] h-[60px] md:w-[60px] md:h-[160px] lg:w-[80px] lg:h-[180px]  xl:w-[110px] xl:h-[380px]  cursor-pointer"
                  : index === 1 || index === products?.length - 2
                  ? "w-[160px] h-[80px] md:w-[60px] md:h-[180px] lg:w-[80px] lg:h-[220px] xl:w-[110px] xl:h-[420px] cursor-pointer"
                  : "w-[200px] h-[100px] md:w-[60px] md:h-[200px] lg:w-[80px] lg:h-[240px] xl:w-[110px] xl:h-[450px] cursor-pointer"
              }
              
            `}
            onClick={() => handleImageClick(index)}
          >
            <img src={product?.variants[0]?.images[0]} alt={product?.name} className="w-full h-full object-cover rounded-sm" />
            {index === activeIndex ? (
              <div className="absolute bottom-10 left-14 text-black">
                <h2 className="text-xl md:text-4xl font-bold uppercase mb-2">{product?.category?.name}</h2>
                <Button size={'lg'} >
                
                  Explore
                  <HiArrowLongRight size={24} className='ml-2' />
                </Button>
              </div>
            ) : (
              <h1 className="text-xs md:text-2xl font-bold text-black rotate-[270deg] absolute uppercase">
                {product?.category?.name}
              </h1>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default FeaturedCollectionsSlider