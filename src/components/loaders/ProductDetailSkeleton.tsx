import { Skeleton } from "../ui/skeleton";

export function ProductDetailSkeleton() {
  return (
    <div className="container grid gap-8 py-8 md:grid-cols-2">
      <Skeleton className="aspect-square" />
      <div className="space-y-4">
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-32 w-full" />
        <div className="space-y-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </div>
  );
}
