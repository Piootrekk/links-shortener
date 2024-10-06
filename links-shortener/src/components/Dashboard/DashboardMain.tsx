import { TUrls } from "@/schemas/dbSchema";
import { Button } from "../ui/button";
import { RefreshCwIcon } from "lucide-react";
import DialogAdd from "./DialogAdd";
import LinkCard from "./LinkCard";
import { useState } from "react";
import DashboardFilters from "./DashboardFilters";

type DashboardMainProps = {
  links: TUrls;
};

const DashboardMain: React.FC<DashboardMainProps> = ({ links }) => {
  const [search, setSearch] = useState<string>("");
  const filteredData = links?.filter((link) =>
    link.title!.toLowerCase().includes(search.toLowerCase().trim())
  );
  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* <Statistic/> */}
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold">My Links:</h1>
        <div className="flex gap-4">
          <Button variant="outline">
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

export default DashboardMain;
