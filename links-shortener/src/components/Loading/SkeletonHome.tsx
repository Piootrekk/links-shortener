import { Skeleton } from "../ui/skeleton";
import Skeletonfaq from "./Skeletonfaq";
import SkeletonFutures from "./SkeletonFutures";

const SkeletonHome = () => {
  return (
    <div className="flex flex-col items-center gap-8 pb-4">
      <section className="text-center mb-12 flex flex-col items-center gap-4 ">
        <Skeleton className="w-[520px] h-12" />
        <Skeleton className="w-[500px] h-5" />
        <div className="h-10">
          <Skeleton className="w-[510px] h-10" />
        </div>
      </section>
      <SkeletonFutures />
      <Skeletonfaq />
    </div>
  );
};

export default SkeletonHome;
