import Statistic from "@/components/Dashboard/Statistic";
import { Input } from "@/components/ui/input";
import { Filter, RefreshCwIcon } from "lucide-react";
import LinkCard from "@/components/Dashboard/LinkCard";
import { useEffect, useState } from "react";
import DialogAdd from "@/components/Dashboard/DialogAdd";
import useDb from "@/context/DbContext";
import LoadingSpin from "@/components/ui/loading-spin";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

const DashboardView = () => {
  const { get } = useDb();
  const { user } = useAuth();
  const [search, setSearch] = useState<string>("");

  const filteredData = get.data?.links.filter((link) =>
    link.title!.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    get.execute(user?.session.access_token);
  }, []);

  return (
    <div className="flex flex-col gap-8 pb-12">
      <Statistic
        isLoading={get.isLoading}
        totalLinks={get.data?.total_links}
        totalClicks={get.data?.total_clicks}
        lastLink={get.data?.last_added}
      />
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold">My Links:</h1>
        <div className="flex gap-4">
          <Button
            variant="default"
            disabled={get.isLoading}
            onClick={() => get.execute(user?.session.access_token)}
          >
            <RefreshCwIcon />
          </Button>
          <DialogAdd />
        </div>
      </div>
      <div className="relative">
        <Input
          type="text"
          placeholder="Search for a link"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Filter className="absolute top-2 right-2 p-1" />
      </div>
      {get.isLoading ? (
        <LoadingSpin />
      ) : filteredData === undefined ? (
        <p></p>
      ) : filteredData?.length === 0 ? (
        <p className=" text-center text-sm">No Links Found</p>
      ) : (
        filteredData.map((link) => <LinkCard key={link.id} link={link} />)
      )}
    </div>
  );
};

export default DashboardView;
