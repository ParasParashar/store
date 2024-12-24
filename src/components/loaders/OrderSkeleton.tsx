import { Skeleton } from "../ui/skeleton";

export function OrderSkeleton() {
  return (
    <div className="space-y-6 overflow-hidden">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="w-full">
          <div>
            <div className="flex justify-between items-center">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-5 w-[80px]" />
            </div>
          </div>
          <div>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i}>
                    <Skeleton className="h-4 w-[100px] mb-2" />
                    <Skeleton className="h-4 w-[80px]" />
                  </div>
                ))}
              </div>
              <div>
                <Skeleton className="h-4 w-[100px] mb-2" />
                <div className="space-y-4">
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="flex items-center space-x-4">
                      <Skeleton className="h-16 w-16 rounded" />
                      <div className="flex-1">
                        <Skeleton className="h-4 w-[200px] mb-2" />
                        <Skeleton className="h-4 w-[100px]" />
                      </div>
                      <Skeleton className="h-4 w-[80px]" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
