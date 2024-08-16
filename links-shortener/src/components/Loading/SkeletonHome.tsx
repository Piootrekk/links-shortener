import { Skeleton } from "../ui/skeleton";
import SkeletonBullshit from "./SkeletonBullshit";
import SkeletonFutures from "./SkeletonFutures";

const SkeletonHome = () => {
  return (
    <div className="flex flex-col items-center">
      <Skeleton className="my-14 sm:my-24 h-12 sm:h-20 lg:h-24 w-3/4" />
      <div className="md:h-16 flex flex-col flex-wrap items-center gap-2 justify-center w-4/5">
        <Skeleton className="h-16 w-full p-4" />
        <Skeleton className="h-16 w-32" />
      </div>
      <SkeletonFutures />
      <SkeletonBullshit />
    </div>
  );
};

export default SkeletonHome;
