import { Skeleton } from "../ui/skeleton";

const SkeletonFutures = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {Array.from({ length: 8 }).map((_, index) => (
        <Skeleton className="w-[240px] h-[212px]" key={index} />
      ))}
    </section>
  );
};

export default SkeletonFutures;
