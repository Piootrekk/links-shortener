import supabase from "../supabase";
import { deleteFile } from "./files";

const deleteSelectedUrl = async (id: string, qrPath: string) => {
  const { data, error } = await supabase.from("urls").delete().eq("id", id);
  await deleteFile(qrPath);
  if (error) throw new Error(error.message);
  return {
    data,
    success: true,
  };
};

export { deleteSelectedUrl };
