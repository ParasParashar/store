import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

interface SeasonalEssentialsProps {
  className?: string;
  // title: string;
  // description: string;
  // image: string;
}

const ShopByCategory: React.FC<SeasonalEssentialsProps> = ({className})  => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className={` w-full bg-secondary ${className}`}
    >
      <div className="relative w-full h-[650px] overflow-hidden">
        {/* Image Section */}
        <img
          src="/FeaturedCollections/T-shirts.jpg"
          alt="Seasonal Essentials"
          className="w-full h-full object-cover"
        />

        {/* Text Overlay Section */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-black">
          <h1 className="text-4xl font-bold">T-shirts</h1>
          <p className="text-xl mt-2 max-w-xl">
            Transform your wardrobe with curated essentials to suit every season.
          </p>
          <Link to={"/"}>
            <Button size={"lg"} className=" mt-4 ">
              Exeplore
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShopByCategory;
