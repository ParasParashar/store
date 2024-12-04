import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

type Props = {
  images: string[];
};

const ProductImages = ({ images }: Props) => {
  const [posterImage, setPosterImage] = useState<string>(images[0] || "");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setPosterImage(images[0]);
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    setPosterImage(images[currentImageIndex]);

    return () => clearInterval(interval);
  }, [currentImageIndex, images]);

  // Change the image on hover
  const setImage = (img: string, index: number) => {
    setPosterImage(img);
    setCurrentImageIndex(index);
  };

  return (
    <div className="flex flex-col-reverse gap-4 h-full items-start justify-center ">
      {/* Thumbnail Section */}
      <div className="flex  h-full md:flex-nowrap flex-wrap gap-3 p-1 items-start justify-start  ">
        {images.map((img, index) => (
          <div
            key={img}
            onMouseEnter={() => setImage(img, index)}
            className={`w-20 h-20 relative cursor-pointer rounded-sm overflow-hidden transition-all duration-300 shadow-md hover:scale-110 
            }`}
          >
            <img
              src={img}
              alt="Thumbnail"
              className={cn(
                "w-full h-full object-cover",
                posterImage === img &&
                  "scale-110 border-2 border-muted-foreground "
              )}
            />
          </div>
        ))}
      </div>

      {/* Primary Image Section */}
      <div className="flex-1 w-full h-full">
        <div className=" flex justify-center items-center overflow-hidden rounded-sm shadow-lg aspect-square" >
          <img
            src={posterImage}
            alt="Product Primary"
            className="w-full h-full object-cover transition-all duration-500"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductImages;
