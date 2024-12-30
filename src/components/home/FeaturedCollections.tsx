import { useEffect, useRef } from "react";
import AxiosBase from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import ShopByCategory from "./ShopByCategory";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function FeaturedCollections() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: collections, isLoading } = useQuery({
    queryKey: ["collections"],
    queryFn: async () => {
      const { data } = await AxiosBase.get("/api/store/collections");
      if (!data.success) throw new Error(data.message);
      return data.data;
    },
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".collection-item");

      items.forEach((item, index) => {
        gsap.fromTo(
          item as gsap.TweenTarget,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: index * 0.2,
            scrollTrigger: {
              trigger: item as Element,
              start: "top 80%",
              end: "top 90%",
              scrub: true,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [collections]);

  if (isLoading) return null;

  return (
    <section
      ref={containerRef}
      className="py-16 md:py-24 w-full bg-white z-20 relative"
    >
      <div className="w-full flex flex-col items-center">
        <h2 className="mb-12 text-3xl font-bold md:text-4xl">
          Featured Categories
        </h2>

        <div className="w-full h-full sm:grid sm:grid-cols-2 gap-6">

          <ShopByCategory className="collection-item" />
          <ShopByCategory className="collection-item" />
          <ShopByCategory className="collection-item" />
          <ShopByCategory className="collection-item" />
          {/* {!isLoading &&
            collections.map((collection: any) => (
              <ShopByCategory
                key={collection.id}
                title={collection.title}
                description={collection.description}
                image={collection.img}
                className="collection-item"
              />
            ))} */}
        </div>
      </div>
    </section>
  );
}
