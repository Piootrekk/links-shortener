import { deleteFile } from "./files";
import { prisma } from "../supabase";

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
