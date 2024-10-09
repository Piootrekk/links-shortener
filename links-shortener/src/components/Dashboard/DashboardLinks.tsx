import { TUrl } from "@/schemas/dbSchema";
import { Button } from "../ui/button";
import { RefreshCwIcon } from "lucide-react";
import DialogAdd from "./DialogAdd";
import LinkCard from "./LinkCard";
import { useState } from "react";
import DashboardFilters from "./DashboardFilters";
import { useRefreshData } from "@/context/RefreshDataContext";

type DashboardLinksProps = {
  links: TUrl[];
};

const DashboardLinks: React.FC<DashboardLinksProps> = ({ links }) => {
  const [search, setSearch] = useState<string>("");
  const filteredData = links.filter((link) =>
    link.title!.toLowerCase().includes(search.toLowerCase().trim())
  );

  const { refreshBoth } = useRefreshData();
  const handleRefresh = async () => {
    await refreshBoth();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between sm:flex-row flex-col gap-4 ">
        <h1 className="text-3xl font-bold">My Links:</h1>
        <div className="flex gap-4">
          <Button variant="outline" onClick={handleRefresh}>
            <RefreshCwIcon />
          </Button>
          <DialogAdd />
        </div>
      </div>
      <DashboardFilters search={search} setSearch={setSearch} />
      {filteredData?.length === 0 ? (
        <p className=" text-center text-sm text-muted-foreground">
          No Links Found
        </p>
      ) : (
        filteredData.map((link) => <LinkCard key={link.id} link={link} />)
      )}
    </div>
  );
};

export default DashboardLinks;
