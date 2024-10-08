import { Skeleton } from "../ui/skeleton";
const SkeletonStats = () => {
  return (
    <div className="flex flex-row flex-wrap gap-4 mt-12 w-full truncate text-ellipsis">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="flex-1 h-32">
          <Skeleton className="w-full h-full" />
        </div>
      ))}
    </div>
  );
};

export default SkeletonStats;
