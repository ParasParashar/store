import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AxiosBase from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export function NewArrivals() {
  const { data: newProducts, isLoading } = useQuery({
    queryKey: ["newArrivals"],
    queryFn: async () => {
      const { data } = await AxiosBase.get("/api/store/newarrivals");
      if (!data.success) throw new Error(data.message);
      return data.data;
    },
  });

  const settings = {
    dots: true,
    className: "slider variable-height",
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 3000,
    cssEase: "linear",
  };

  if (isLoading) return null;
  return (
    <section className="py-16 bg-white z-20 h-screen w-full relative">
      <div className="container absolute">
        <h2 className="mb-12 text-center text-2xl  md:text-4xl font-bold ">
          New Arrivals
        </h2>
        <Slider {...settings}>
          {!isLoading &&
            newProducts.map((newProduct: any) => {
              const productImg = newProduct.variants[0].images[0];
              return (
                <Link key={newProduct.id} to={`/product/${newProduct.slug}`}>
                  <Card className="newProduct-card scale-95 overflow-hidden  m-1 transition-all duration-300 hover:scale-100">
                    <CardContent className="p-0">
                      <div className="relative">
                        <img
                          src={productImg}
                          alt={newProduct.name}
                          onLoad={(e) =>
                            e.currentTarget.classList.remove("opacity-0")
                          }
                          className="h-[100px] md:h-[300px]  opacity-0 w-full object-fill"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                        <div className="absolute bottom-0 p-6 text-white">
                          <h3 className="mb-2 text-3xl truncate font-semibold text-popover">
                            {newProduct.name}
                          </h3>
                          <p className="text-md font-light">
                            {newProduct.category.name}
                          </p>
                          <p className="text-xl line-clamp-1 leading-relaxed">
                            {" "}
                            &#8377;{newProduct.price}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
        </Slider>
      </div>
    </section>
  );
}
