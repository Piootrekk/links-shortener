import { TDetails } from "@/schemas/dbSchema";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

type AnalyticsTableProps = {
  details: TDetails[];
};

const AnalyticsTable: React.FC<AnalyticsTableProps> = ({ details }) => {
  const tableHeaders = [
    "Date",
    "Location",
    "Device",
    "Browser",
    "IP",
    "OS",
    "ISP",
  ];

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            {tableHeaders.map((header) => (
              <TableHead key={header}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {details.map((detail) => (
            <TableRow key={detail.id}>
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
