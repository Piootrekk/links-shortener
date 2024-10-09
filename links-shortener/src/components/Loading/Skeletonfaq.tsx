import { Skeleton } from "../ui/skeleton";

const Skeletonfaq = () => {
  return (
    <section className="w-full space-y-3">
      <Skeleton className="w-1/4  h-8" />
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton className="w-full h-14" key={index} />
      ))}
    </section>
  );
};

export default Skeletonfaq;
