// import DiscountProducts from "@/components/home/DiscountProducts";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Suspense, lazy } from "react";

// export function HomePage() {

//   const HeroSection = lazy(() => import("@/components/home/HeroSection"))
//   const NewCollection = lazy(() => import("@/components/home/NewCollection"))
//   const FeaturedCollections = lazy(() => import("@/components/home/FeaturedCollections"))

//   return (
//     <main className=" min-h-screen w-full overflow-x-hidden ">
//       <div className=" fixed top-0 z-10">
//         <Suspense fallback={<div className="w-full h-screen flex items-center justify-center"> <Skeleton className=" w-full h-screen bg-gray-200 rounded-sm m-1 md:mx-14 md:my-4" /> </div>}>
//           <HeroSection />
//         </Suspense>
//       </div>
//       <div className="w-full">
//         <Suspense fallback={<div className="w-full h-screen flex items-center justify-center"> <Skeleton className=" w-full h-screen bg-gray-200 rounded-sm m-1 md:mx-14 md:my-4" /> </div>}>
//           <NewCollection />
//         </Suspense>

//         <Suspense fallback={<div className="w-full h-screen flex items-center justify-center"> <Skeleton className=" w-full h-screen bg-gray-200 rounded-sm m-1 md:mx-14 md:my-4" /> </div>}>
//         <FeaturedCollections />
//         </Suspense>

//         <Suspense fallback={<div className="w-full h-screen flex items-center justify-center"> <Skeleton className=" w-full h-screen bg-gray-200 rounded-sm m-1 md:mx-14 md:my-4" /> </div>}>
//         <DiscountProducts />
//         </Suspense> 

          
          
        
//       </div>
//     </main>
//   );
// }



import DiscountProducts from "@/components/home/DiscountProducts";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense, lazy } from "react";

// Lazy-loaded components
const HeroSection = lazy(() => import("@/components/home/HeroSection"));
const NewCollection = lazy(() => import("@/components/home/NewCollection"));
const FeaturedCollections = lazy(() => import("@/components/home/FeaturedCollections"));

// Reusable fallback component
const LoadingSkeleton = ({ height = "screen" }) => (
  <div className="w-full h-screen flex items-center justify-center">
    <Skeleton
      className={`w-full h-${height} bg-gray-200 rounded-sm m-1 md:mx-14 md:my-4`}
    />
  </div>
);

export function HomePage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      {/* Suspense Wrapper for Hero Section */}
      <div className="fixed top-0 z-10">
        <Suspense fallback={<LoadingSkeleton />}>
          <HeroSection />
        </Suspense>
      </div>

      {/* Suspense Wrapper for Other Sections */}
      <div className="w-full">
        <Suspense fallback={<LoadingSkeleton />}>
          <NewCollection />
        </Suspense>
        <Suspense fallback={<LoadingSkeleton />}>
          <FeaturedCollections />
        </Suspense>
        
          <DiscountProducts />
       
      </div>
    </main>
  );
}
