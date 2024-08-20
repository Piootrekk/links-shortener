import supabase from "../supabase";
import { deleteFile } from "./files";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
