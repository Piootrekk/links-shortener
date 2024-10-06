import { Input } from "../ui/input";
import { Filter } from "lucide-react";

type DashboardFiltersProps = {
  search: string;
  setSearch: (search: string) => void;
};

const DashboardFilters: React.FC<DashboardFiltersProps> = ({
  search,
  setSearch,
}) => {
  return (
    <div className="relative">
      <Input
        type="text"
        placeholder="Search for a link"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Filter className="absolute top-2 right-2 p-1" />
    </div>
  );
};

export default DashboardFilters;
