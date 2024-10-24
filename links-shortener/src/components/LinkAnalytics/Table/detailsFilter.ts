import { TDetails } from "@/schemas/dbSchema";

const getCurrentDetails = (
  details: TDetails[],
  currentPage: number,
  rowsPerPage: number
) => {
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  return details.slice(indexOfFirstRow, indexOfLastRow);
};

export { getCurrentDetails };
