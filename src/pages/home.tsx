import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedCollections } from "@/components/home/FeaturedCollections";
import { TrendingProducts } from "@/components/home/TrendingProducts";
import { NewArrivals } from "@/components/home/NewArrivals";

export function HomePage() {
  return (
    <main className="min-h-screen w-full   ">
      <HeroSection />
      <div className="px-10">
        <FeaturedCollections />
        <NewArrivals />
        <TrendingProducts />
      </div>
    </main>
  );
}
