import SkeletonStats from "./SkeletonStats";
import { Skeleton } from "../ui/skeleton";
import SkeletonLinks from "./SkeletonLinks";

const SkeletonDashboard = () => {
  return (
    <div className="flex flex-col gap-8 pb-12">
      <SkeletonStats />
      <div className="flex justify-between sm:flex-row flex-col gap-4 ">
        <Skeleton className="w-40 h-10" />
        <div className="flex gap-4">
          <Skeleton className="w-[120px] h-10" />
          <Skeleton className="w-[140px] h-10" />
        </div>
      </div>
      <Skeleton className="w-full h-10" />
      <SkeletonLinks amount={3} />
    </div>
  );
};

export default SkeletonDashboard;
