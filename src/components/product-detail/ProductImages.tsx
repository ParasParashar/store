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
    <div className="flex flex-col gap-4 border-b border-black pb-4 sm:flex-row items-center justify-center">
      {/* Thumbnail Section */}
      <div className="flex sm:flex-col gap-3 items-center overflow-hidden max-sm:w-full max-sm:justify-center  p-3">
        {images.map((img, index) => (
          <div
            key={img}
            onMouseEnter={() => setImage(img, index)}
            className={`w-20 h-20 relative cursor-pointer rounded-lg overflow-hidden transition-all duration-300 shadow-md hover:scale-110 ${
              posterImage === img
                ? "scale-110 border-2 border-muted-foreground "
                : ""
            }`}
          >
            <img
              src={img}
              alt="Thumbnail"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Primary Image Section */}
      <div className="w-full sm:w-2/3">
        <div className=" flex justify-center items-center overflow-hidden rounded-lg shadow-lg aspect-square">
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
