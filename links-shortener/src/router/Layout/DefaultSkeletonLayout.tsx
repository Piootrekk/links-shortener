import SkeletonHeader from "@/components/Loading/SkeletonHeader";
import { Skeleton } from "@/components/ui/skeleton";

import { Outlet } from "react-router-dom";

const DefaultSkeletonLayout: React.FC = () => {
  return (
    <>
      <div className="min-h-screen container">
        <header>
          <SkeletonHeader />
        </header>
        <main>
          <Outlet />
        </main>
      </div>
      <footer className="p-8 text-center bg-secondary">
        <Skeleton className="h-8 w-full" />
      </footer>
    </>
  );
};

export default DefaultSkeletonLayout;
