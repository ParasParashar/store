import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  images: string[];
};

const ProductImages = ({ images }: Props) => {
  const [posterImage, setPosterImage] = useState<string>("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imageRef = useRef<HTMLImageElement>(null);
  const thumbnailsRef = useRef<HTMLDivElement>(null);

  // Set initial image
  useEffect(() => {
    if (images) {
      setPosterImage(images[0]);
    }
  }, [images]);

  // Automatic slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentImageIndex, images]);

  // Animation for main image change
  useEffect(() => {
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { x: "-60%", opacity: 0, scale: 0 },
        { x: "0%", opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" }
      );
    }
  }, [posterImage]);

  // Animate thumbnails on load
  useEffect(() => {
    if (thumbnailsRef.current) {
      const thumbnails = thumbnailsRef.current.querySelectorAll(".thumbnail");
      gsap.fromTo(
        thumbnails,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }
      );
    }
  }, [images]);

  // Functions to handle image transitions
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

  const setImage = (img: string, index: number) => {
    setPosterImage(img);
    setCurrentImageIndex(index);
  };

  return (
    <div className="w-full md:w-[60%] flex flex-col-reverse md:flex-row gap-4 h-full items-start justify-center">
      {/* Thumbnail Section */}
      <div
        ref={thumbnailsRef}
        className="hidden md:flex md:flex-col h-full gap-3 p-1 items-start justify-start"
      >
        {images?.map((img, index) => (
          <div
            key={img}
            onMouseEnter={() => setImage(img, index)}
            className={cn(
              "thumbnail w-20 h-28 relative cursor-pointer rounded-sm overflow-hidden transition-all duration-300  hover:scale-105 hover:shadow-lg",
              posterImage === img && "shadow-md"
            )}
          >
            <img
              src={img}
              alt="Thumbnail"
              className={cn(
                "w-full h-full object-contain",
                posterImage === img &&
                  "scale-110 border-2  border-muted-foreground"
              )}
            />
          </div>
        ))}
      </div>

      {/* Primary Image Section */}
      <div className="flex-1 w-full h-full relative">
        <div className="flex justify-center items-center overflow-hidden rounded-sm aspect-square">
          <img
            ref={imageRef}
            src={posterImage}
            alt="Product Primary"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductImages;
