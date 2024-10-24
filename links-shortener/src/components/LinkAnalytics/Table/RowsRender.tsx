import { TableRow, TableCell } from "@/components/ui/table";
import { TDetails } from "@/schemas/dbSchema";
import React from "react";

type RowRenderProps = {
  details: TDetails[];
  onRowClick: (id: string) => void;
};

const RowsRender: React.FC<RowRenderProps> = ({ details, onRowClick }) => {
  return details.map((detail) => (
    <TableRow
      key={detail.id}
      onClick={() => onRowClick(detail.id)}
      className="cursor-pointer"
    >
      <TableCell>{new Date(detail.created_at).toLocaleString()}</TableCell>
      <TableCell>{`${detail.city}, ${detail.country}`}</TableCell>
      <TableCell>
        {detail.device} {detail.device_type}
      </TableCell>
      <TableCell>{detail.browser}</TableCell>
      <TableCell>{detail.ip}</TableCell>
      <TableCell>{detail.os}</TableCell>
      <TableCell>{detail.isp}</TableCell>
    </TableRow>
  ));
};

export default RowsRender;
