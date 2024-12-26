import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { staggerFadeIn } from "@/lib/animations";
import AxiosBase from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export function FeaturedCollections() {
  const { data: collections, isLoading } = useQuery({
    queryKey: ["collections"],
    queryFn: async () => {
      const { data } = await AxiosBase.get("/api/store/collections");
      if (!data.success) throw new Error(data.message);
      return data.data;
    },
  });
  if (isLoading) return null;
  return (
    <section className="py-16 md:py-24 w-full h-screen bg-white z-20 relative ">
      <div className="container absolute">
        <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
          Featured Collections
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {!isLoading &&
            collections.map((collection: any) => (
              <Link key={collection.id} to={`/collections/${collection.id}`}>
                <Card className="collection-card overflow-hidden transition-all duration-300 hover:scale-110">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={collection.image}
                        alt={collection.title}
                        onLoad={(e) =>
                          e.currentTarget.classList.remove("opacity-0")
                        }
                        className="h-[300px] opacity-0 w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-0 p-6 text-white">
                        <h3 className="mb-2 text-xl font-semibold">
                          {collection.name}
                        </h3>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
