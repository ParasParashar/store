import AxiosBase from "@/lib/axios";
import { Product } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import { gsap } from "gsap";

const FeaturedCollections = () => {
  // fetching data
  const { data: FeaturedProducts } = useQuery({
    queryKey: ["homeFeaturedProducts"],
    queryFn: async () => {
      const { data } = await AxiosBase.get("/api/store/featuredproducts");
      return data.data;
    },
  });

  // handle animation on mouse enter and leave
  const handleMouseEnter = (index: number) => {
    gsap.to(`.shade-${index}`, {
      left: "100%",
      duration: 0.8,
      ease: "power2.out",
    });
    gsap.to(`.text-${index}`, {
      x: "0%",
      opacity: 1,
      duration: 0.8,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (index: number) => {
    gsap.to(`.shade-${index}`, {
      left: "0%",
      duration: 0.8,
      ease: "power2.in",
    });
    gsap.to(`.text-${index}`, {
      x: index % 2 === 0 ? "-100%" : "100%",
      opacity: 0,
      duration: 0.8,
      ease: "power2.in",
    });
  };

  return (
    <div className="top-collection-container bg-white py-8 w-full relative z-20">
      <h2 className="text-center text-3xl md:text-5xl font-bold my-12 uppercase">
        {" "}
        Shop By Catagory
      </h2>
      <div className="w-full flex flex-col md:px-4 gap-2">
        {FeaturedProducts?.map((product: Product, index: number) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row items-stretch ${
              index % 2 === 0 ? "md:flex-row-reverse" : ""
            } relative`}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            {/* Text Container for Mobile */}
            <div
              className={`absolute inset-0 flex flex-col justify-center items-center text-center text-${index} text-white md:hidden z-30 `}
              style={{
                transform: `translateX(0%)`,
                opacity: 1,
                transition: "opacity 0.8s ease, transform 0.8s ease",
              }}
            >
              <h3 className="text-3xl font-semibold mb-2">{product.name}</h3>
              <p className="text-xl mb-4">{product.category.name}</p>
              <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                Shop Now
              </button>
            </div>

            {/* Text Container for Desktop */}
            <div
              className={`w-full md:w-1/2 flex flex-col justify-center items-baseline text-start text-${index} hidden md:flex px-32 `}
              style={{
                transform: `translateX(${index % 2 === 0 ? "-100%" : "100%"})`,
                opacity: 0,
                transition: "all 0.8s ease",
              }}
            >
              <h3 className="text-3xl font-semibold mb-2">{product.name}</h3>
              <p className="text-xl mb-4">{product.category.name}</p>
              <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition ">
                Shop Now
              </button>
            </div>

            {/* Image Container */}
            <div className="w-full md:w-1/2 h-[450px] xl:h-[700px] relative overflow-hidden">
              <img
                src={product.variants[0].images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div
                className={`absolute top-0 left-0 h-full bg-black bg-opacity-60 shade-${index}`}
                style={{
                  width: "100%",
                  left: "0%",
                  zIndex: 10,
                  transition: "all 0.8s ease",
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCollections;
