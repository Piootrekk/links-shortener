import { Skeleton } from "../ui/skeleton";
type SkeletonLinksProps = {
  amount: number;
};

const SkeletonLinks: React.FC<SkeletonLinksProps> = ({ amount }) => {
  return Array.from({ length: amount }).map((_, index) => (
    <div className="space-y-4 " key={index}>
      <Skeleton className="flex flex-col md:flex-row gap-5 p-4 rounded-lg w-full h-40" />
    </div>
  ));
};

export default SkeletonLinks;
