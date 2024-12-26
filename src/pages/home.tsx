import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedCollections } from "@/components/home/FeaturedCollections";
import { TrendingProducts } from "@/components/home/TrendingProducts";
import { NewArrivals } from "@/components/home/NewArrivals";
import NewCollection from "@/components/home/NewCollection";

export function HomePage() {
  return (
    <main className="min-h-screen w-full ">
      <div className=" fixed h-screen top-0 z-10">

      <HeroSection />
      </div>
      <div className="w-full">
       
        <NewCollection />
        <FeaturedCollections />
        <NewArrivals />
        {/* <TrendingProducts /> */}
      </div>
    </main>
  );
}
