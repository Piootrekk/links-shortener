import { Card, CardContent, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const SkeletonAuth = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-14">
      <div className="w-[400px] py-12">
        <Skeleton className="h-12 w-full mb-2" />
        <div className="grid grid-cols-2 gap-4 py-4 ">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </div>
        <Card>
          <CardHeader className="text-2xl">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="mt-2 h-6 w-48" />
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Skeleton className="h-12 w-full mb-2" />
            </div>
            <div className="mb-4">
              <Skeleton className="h-12 w-full mb-2" />
            </div>
            <Skeleton className="h-12 w-full" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SkeletonAuth;
