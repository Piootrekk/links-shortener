import { deleteFile } from "../../files";
import { prisma } from "../../supabase";

// TODO provide transaction for file deletion,
//if delete query fails then rollback file from cache

const deleteSelectedUrl = async (id: string, qrPath?: string) => {
  if (qrPath) await deleteFile(qrPath);
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
