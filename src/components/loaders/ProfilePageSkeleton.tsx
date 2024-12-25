import { Skeleton } from "@/components/ui/skeleton";
import { OrderSkeleton } from "./OrderSkeleton";

export const ProfilePageSkeleton = () => {
  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row gap-4 py-6 px-4 container mx-auto mt-2 lg:w-[90%]">
      <div className="lg:h-[500px] h-auto lg:w-1/3 flex flex-col justify-between gap-3 p-4 border-secondary border-2 lg:sticky top-20 rounded-xl">
        <div className="flex items-center justify-center gap-3 pb-4 border-b">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-6 w-3/4" />
        </div>
        <h2 className="text-lg text-slate-700 font-semibold">
          <Skeleton className="h-6 w-1/2" />
        </h2>
        <div className="flex flex-col gap-3">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
      <div className="flex-1 w-full">
        <OrderSkeleton />
      </div>
    </div>
  );
};

export const AddressCardSkeleton = () => {
  return (
    <div className="overflow-hidden">
      {/* Card Header Skeleton */}
      <div className="flex flex-row items-center justify-between gap-3 mb-4 pb-4 border-b">
        <Skeleton className="h-6 w-40" />
        <div className="flex items-center gap-3">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-6 w-6 rounded-full" />
        </div>
      </div>

      {/* Form Skeleton */}
      <div className="grid grid-cols-2 gap-4 px-4 p-2">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full col-span-2" />
        <div className="col-span-2 space-y-3">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
        <Skeleton className="h-12 w-full col-span-2" />
      </div>

      {/* Address Info Skeleton */}
      <div className="p-2 px-2">
        <Skeleton className="h-5 w-full mb-2" />
        <Skeleton className="h-5 w-1/2 mb-2" />
        <Skeleton className="h-5 w-1/4 mb-2" />
        <Skeleton className="h-5 w-1/3" />
      </div>
    </div>
  );
};
