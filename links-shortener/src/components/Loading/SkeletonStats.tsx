import { Skeleton } from "../ui/skeleton";
const SkeletonStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {Array.from({ length: 3 }).map((_, index) => (
        <Skeleton key={index} className="h-[64px]" />
      ))}
    </div>
  );
};

export default SkeletonStats;
