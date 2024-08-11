import ErrorMessage from "@/components/Error/ErrorMessage";
import { Button } from "@/components/ui/button";
import Statistic from "@/components/Dashboard/Statistic";
import { Input } from "@/components/ui/input";
import { Filter } from "lucide-react";
import { useDbAll, useDbAuth } from "@/hooks/useDB";

const DashboardView = () => {
  const { data } = useDbAuth();
  const { data: all } = useDbAll();

  return (
    <div className="flex flex-col gap-8">
      <Statistic data={data} all={all} />
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold">My Links:</h1>
        <Button variant="default">Create New</Button>
      </div>
      <div className="relative">
        <Input type="text" placeholder="Search for a link" />
        <Filter className="absolute top-2 right-2 p-1" />
      </div>
      <ErrorMessage className="text-xl text-center" message="No links found." />
    </div>
  );
};

export default DashboardView;
