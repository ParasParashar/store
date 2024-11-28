import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedCollections } from "@/components/home/FeaturedCollections";
import { TrendingProducts } from "@/components/home/TrendingProducts";

export function HomePage() {
  return (
    <main className="min-h-screen w-full   ">
      <HeroSection />
      <div className="px-10">
        <FeaturedCollections />
        <TrendingProducts />
      </div>
    </main>
  );
}
