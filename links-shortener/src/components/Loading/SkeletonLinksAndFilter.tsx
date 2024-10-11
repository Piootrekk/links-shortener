import { Filter, Plus, RefreshCcwIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import SkeletonLinks from "./SkeletonLinks";

const SkeletonLinksAndFilter = () => {
  return (
    <>
      <div className="flex justify-between sm:flex-row flex-col gap-4 ">
        <h1 className="text-3xl font-bold">My Links:</h1>
        <div className="flex gap-4">
          <Button variant="outline" className="gap-2">
            <RefreshCcwIcon />
            Refresh
          </Button>
          <Button variant="outline">
            <Plus />
            Create New
          </Button>
        </div>
      </div>
      <div className="relative">
        <Input type="text" placeholder="Search for a link" />
        <Filter className="absolute top-2 right-2 p-1" />
      </div>
      <SkeletonLinks amount={3} />
    </>
  );
};

export default SkeletonLinksAndFilter;
