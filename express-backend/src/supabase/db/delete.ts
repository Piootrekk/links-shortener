
import { deleteFile } from "./files";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

const deleteSelectedUrl = async (id: string, qrPath: string) => {
  await deleteFile(qrPath);
  const data = await prisma.urls.delete({
    where: {
      id,
    },
  });

  return {
    data,
    success: true,
  };
};

export { deleteSelectedUrl };
