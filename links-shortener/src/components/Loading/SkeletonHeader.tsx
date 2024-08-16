import { Skeleton } from "../ui/skeleton";

const SkeletonHeader = () => {
  return (
    <nav className="flex justify-between items-center py-4">
      <Skeleton className="h-8 w-48" />
      <div className="flex space-x-4">
        <Skeleton className="h-10 w-32" />
      </div>
    </nav>
  );
};

export default SkeletonHeader;
