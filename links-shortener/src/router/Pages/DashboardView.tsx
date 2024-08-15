import Statistic from "@/components/Dashboard/Statistic";
import { Input } from "@/components/ui/input";
import { Filter } from "lucide-react";
import LinkCard from "@/components/Dashboard/LinkCard";
import { useState } from "react";
import CreateDialogUrl from "@/components/Dashboard/DialogUrlForm";
import useDb from "@/context/DbContext";

const DashboardView = () => {
  const { get } = useDb();
  const [search, setSearch] = useState<string>("");
  const data = get.data;
  const filteredData = data?.filter((link) =>
    link.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8 pb-12">
      <Statistic data={data} />
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold">My Links:</h1>
        <CreateDialogUrl />
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
      {filteredData === undefined || filteredData?.length === 0 ? (
        <p className="text-white text-center text-sm">No Links Found</p>
      ) : (
        filteredData.map((link) => <LinkCard key={link.id} link={link} />)
      )}
    </div>
  );
};

export default DashboardView;
