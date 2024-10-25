import { TDetails } from "@/schemas/dbSchema";
import { Table, TableBody, TableHeader, TableRow } from "../../ui/table";
import { useAnalyticsData } from "@/context/AnalyticsDataContext";
import { TTalbeHeaders } from "@/schemas/chartsTypes";
import { useState } from "react";
import RenderTableHeaders from "./HeaderRender";
import RowsRender from "./RowsRender";
import { getCurrentDetails } from "./detailsFilter";
import PaginationTable from "./PaginationTable";

type AnalyticsTableProps = {
  onRowClick: (id: string) => void;
  onColumnClick: (column: TTalbeHeaders) => void;
};

const AnalyticsTable: React.FC<AnalyticsTableProps> = ({
  onRowClick,
  onColumnClick,
}) => {
  const { analytics } = useAnalyticsData();
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  if (!analytics?.data) return null;
  const details: TDetails[] = analytics.data.hidden_details;

  const totalPages = Math.ceil(details.length / rowsPerPage);
  const handlePageChange = (page: number) => setCurrentPage(page);
  const currentDetails = getCurrentDetails(details, currentPage, rowsPerPage);

  return (
    <div className="overflow-x-auto">
      <div
        className={`${
          totalPages > 1 && "h-[580px] min-h-[580px] overflow-y-auto"
        }`}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <RenderTableHeaders onColumnClick={onColumnClick} />
            </TableRow>
          </TableHeader>

          <TableBody>
            <RowsRender details={currentDetails} onRowClick={onRowClick} />
          </TableBody>
        </Table>
      </div>
      <PaginationTable
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default AnalyticsTable;
