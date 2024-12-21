import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

type Props = {
  images: string[];
};

const ProductImages = ({ images }: Props) => {
  const [posterImage, setPosterImage] = useState<string>("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (images) {
      setPosterImage(images[0]);
    }
  }, [images]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    setPosterImage(images[currentImageIndex]);

    return () => clearInterval(interval);
  }, [currentImageIndex, images]);

  const nextImage = () => {
    const nextIndex = (currentImageIndex + 1) % images.length;
    setPosterImage(images[nextIndex]);
    setCurrentImageIndex(nextIndex);
  };

  const prevImage = () => {
    const prevIndex =
      currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1;
    setPosterImage(images[prevIndex]);
    setCurrentImageIndex(prevIndex);
  };

  // Change the image on hover for thumbnails
  const setImage = (img: string, index: number) => {
    setPosterImage(img);
    setCurrentImageIndex(index);
  };

  return (
    <div className="w-full md:w-[60%] flex flex-col-reverse md:flex-row gap-4 h-full items-start justify-center">
      {/* Thumbnail Section (only visible on medium screens and above) */}
      <div className="hidden md:flex md:flex-col h-full gap-3 p-1 items-start justify-start">
        {images?.map((img, index) => (
          <div
            key={img}
            onMouseEnter={() => setImage(img, index)}
            className="w-20 h-28 relative cursor-pointer rounded-sm overflow-hidden transition-all duration-300 shadow-md hover:scale-110"
          >
            <img
              src={img}
              alt="Thumbnail"
              className={cn(
                "w-full h-full object-contain",
                posterImage === img &&
                  "scale-110 border-2 border-muted-foreground"
              )}
            />
          </div>
        ))}
      </div>

      {/* Primary Image Section */}
      <div className="flex-1 w-full h-full relative">
        <div className="flex justify-center items-center overflow-hidden rounded-sm aspect-square">
          <img
            src={posterImage}
            alt="Product Primary"
            className="w-full h-full object-contain transition-all duration-500"
          />
        </div>
        {/* Navigation Buttons (only visible on smaller screens) */}
        <div className="absolute top-1/2 -translate-y-1/2 w-full flex md:hidden justify-between px-1 sm:px-4">
          <button
            onClick={prevImage}
            className="bg-white/50 w-8 h-8 text-black p-1 rounded-full shadow-lg hover:bg-gray-200"
          >
            ❮
          </button>
          <button
            onClick={nextImage}
            className="bg-white/50 w-8 h-8 text-black/90 p-1 rounded-full shadow-lg hover:bg-gray-200"
          >
            ❯
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductImages;
