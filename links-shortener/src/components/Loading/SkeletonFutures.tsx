import { Skeleton } from "../ui/skeleton";

const SkeletonFutures = () => {
  return (
    <div className="flex flex-row flex-wrap justify-center items-stretch gap-4 pt-24 py-11 w-3/4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="w-48">
          <div className="p-4 border rounded-lg">
            <div className="flex flex-col items-center gap-2">
              <Skeleton className="h-12 w-12" />
              <Skeleton className="h-6 w-32" />
            </div>
            <div className="mt-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full mt-2" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonFutures;
