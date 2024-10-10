import { Skeleton } from "../ui/skeleton";

const SkeletonUniversal = () => {
  return (
    <>
      <section className="flex flex-col justify-center my-48 h-full space-y-4">
        <Skeleton className="w-full h-14" />
        <Skeleton className="w-full h-14" />
        <Skeleton className="w-full h-14" />
      </section>
    </>
  );
};

export default SkeletonUniversal;
