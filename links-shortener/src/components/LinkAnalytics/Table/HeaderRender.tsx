import { TableHead } from "@/components/ui/table";
import { TTalbeHeaders } from "@/schemas/chartsTypes";

type RenderTableHeadersProps = {
  onColumnClick: (column: TTalbeHeaders) => void;
};

const RenderTableHeaders: React.FC<RenderTableHeadersProps> = ({
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

  return talbeHeaders.map((tableHeader) => (
    <TableHead
      key={tableHeader.key}
      onClick={() => tableHeader.allowToChart && onColumnClick(tableHeader)}
      className={tableHeader.allowToChart ? "cursor-pointer" : "cursor-auto"}
    >
      {tableHeader.header}
    </TableHead>
  ));
};

export default RenderTableHeaders;
