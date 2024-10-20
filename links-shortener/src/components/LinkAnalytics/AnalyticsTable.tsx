import { TDetails } from "@/schemas/dbSchema";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useAnalyticsData } from "@/context/AnalyticsDataContext";

type AnalyticsTableProps = {
  onRowClick: (id: string) => void;
  onColumnClick: (column: string) => void;
  selectedColumn: string | null;
};

const AnalyticsTable: React.FC<AnalyticsTableProps> = ({
  onRowClick,
  onColumnClick,
  selectedColumn,
}) => {
  const tableHeaders = [
    "Date",
    "Location",
    "Device",
    "Browser",
    "IP",
    "OS",
    "ISP",
  ];

  const { analytics } = useAnalyticsData();
  if (!analytics.data) return null;
  const details: TDetails[] = analytics.data.hidden_details;
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            {tableHeaders.map((header) => (
              <TableHead
                onClick={() => onColumnClick(header)}
                key={header}
                className={`${
                  selectedColumn === header && "bg-secondary"
                } cursor-pointer`}
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {details.map((detail) => (
            <TableRow
              onClick={() => onRowClick(detail.id)}
              key={detail.id}
              className="cursor-pointer"
            >
              <TableCell>
                {new Date(detail.created_at).toLocaleString()}
              </TableCell>
              <TableCell>{`${detail.city}, ${detail.country}`}</TableCell>
              <TableCell>
                {detail.device} {detail.device_type}
              </TableCell>
              <TableCell>{detail.browser}</TableCell>
              <TableCell>{detail.ip}</TableCell>
              <TableCell>{detail.os}</TableCell>
              <TableCell>{detail.isp}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AnalyticsTable;
