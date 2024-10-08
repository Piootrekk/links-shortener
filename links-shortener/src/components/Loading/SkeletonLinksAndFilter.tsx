import { Filter, RefreshCwIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import SkeletonLinks from "./SkeletonLinks";

const SkeletonLinksAndFilter = () => {
  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold">My Links:</h1>
        <div className="flex gap-4">
          <Button variant="outline">
            <RefreshCwIcon />
          </Button>
          <Button variant="outline">Create New</Button>
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
