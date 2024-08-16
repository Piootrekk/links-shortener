import { Skeleton } from "../ui/skeleton";

const SkeletonBullshit = () => {
  return (
    <div className="w-full my-11 px-11">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="mb-4">
          <div className="flex flex-col">
            <Skeleton className="h-8 w-full mb-2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full mt-2" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonBullshit;
