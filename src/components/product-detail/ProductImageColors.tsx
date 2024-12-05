import { useState } from "react";
import Slider from "react-slick";
import { IoIosArrowDroprightCircle, IoIosArrowDropleftCircle } from "react-icons/io";
import { cn } from "@/lib/utils";

type Variant = {
  id: string;
  color: string;
  images: string[];
};


type Props = {
  onSelectVariant: (variant: Variant) => any;
  variants: Variant[];
};


function ProductImageColors({ onSelectVariant, variants }: Props) {
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);

  console.log(variants)
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const handleSelectVariant = (variant: Variant) => {
    setSelectedVariant(variant.id);
    onSelectVariant(variant);
  };

  return (
    <> 
     { (variants.length) < 4 ?
              <div className="flex gap-3">
              {variants.map((variant) => (
                <div
                  key={variant.id}
                  className={`p-1  cursor-pointer`}
                  onClick={() => handleSelectVariant(variant)}
                >
                  <img
                    src={variant.images[0]}
                    alt={variant.id}
                    className={cn(
                      "h-28 w-24  transition-all p-0.5 duration-300 rounded-sm object-cover",
                      selectedVariant === variant?.id && "border border-black "
                    )}
                  />
                  <p
                    className={cn(
                      "text-center text-sm mt-1",
                      selectedVariant === variant.id && "font-semibold"
                    )}
                  >
                    {variant.color}
                  </p>
                </div>
              ))}
            </div>
            : 
            
    <div className="slider-container">
      <Slider {...settings}>
        {variants.map((variant) => (
          <div
            key={variant.id}
            className={`slider-item p-1 cursor-pointer`}
            style={{
              margin: "0 10px",
              transform: selectedVariant === variant.id ? "scale(1.05)" : "scale(1)",
            }}
            onClick={() => handleSelectVariant(variant)}
          >
            <img
              src={variant.images[0]}
              alt={`Variant ${variant.id}`}
              className={`w-full h-24 sm:h-28 object-cover rounded p-0.5 shadow-lg transition-transform ${
                selectedVariant === variant.id ? "border border-black" : ""
              }`}
            />
            <p className={`text-center text-sm mt-2 ${
                selectedVariant === variant.id ? "font-semibold" : ""
              } `}>{variant.color}</p>
          </div>
        ))}
      </Slider>
    </div>
    } 
    </>
  );
}

const NextArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <IoIosArrowDroprightCircle
      className={className}
      style={{
        ...style,
        color: "black", // Adjust color
        fontSize: "40px", // Adjust size
        right: "-1px", // Position outside the slider
        zIndex: 10,
      }}
      onClick={onClick}
    />
  );
};

const PrevArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <IoIosArrowDropleftCircle
      className={className}
      style={{
        ...style,
        color: "black", // Adjust color
        fontSize: "40px", // Adjust size
        left: "-1px", // Position outside the slider
        zIndex: 10,
      }}
      onClick={onClick}
    />
  );
};

export default ProductImageColors;
