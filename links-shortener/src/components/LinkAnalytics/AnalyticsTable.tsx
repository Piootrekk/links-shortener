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
import { TTalbeHeaders } from "@/schemas/chartsTypes";

type AnalyticsTableProps = {
  onRowClick: (id: string) => void;
  onColumnClick: (column: TTalbeHeaders) => void;
};

const AnalyticsTable: React.FC<AnalyticsTableProps> = ({
  onRowClick,
  onColumnClick,
}) => {
  const talbeHeaders: TTalbeHeaders[] = [
    { header: "Date", key: "created_at", allowToChart: false },
    { header: "Location", key: "city", allowToChart: true },
    { header: "Device", key: "device_type", allowToChart: true },
    { header: "Browser", key: "browser", allowToChart: true },
    { header: "IP", key: "ip", allowToChart: true },
    { header: "OS", key: "os", allowToChart: true },
    { header: "ISP", key: "isp", allowToChart: true },
  ];

  const { analytics } = useAnalyticsData();
  if (!analytics.data) return null;
  const details: TDetails[] = analytics.data.hidden_details;
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            {talbeHeaders.map((tableHeader) => (
              <TableHead
                onClick={() =>
                  tableHeader.allowToChart && onColumnClick(tableHeader)
                }
                key={tableHeader.key}
                className={`${
                  tableHeader.allowToChart ? "cursor-pointer" : "cursor-auto"
                }`}
              >
                {tableHeader.header}
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
