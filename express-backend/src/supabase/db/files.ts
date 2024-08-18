import { config } from "dotenv";
import generateQR from "../../utils/qrGenerate";
import supabase from "../supabase";

config();

const DB_ENDPOINT = process.env.DB_ENDPOINT;
if (!DB_ENDPOINT) throw new Error("DB_ENDPOINT is not defined");

const uploadFile = async (file: File) => {
  const { data, error } = await supabase.storage
    .from("qrs")
    .upload(`/${file.name}`, file);
  if (error) throw new Error(error.message);
  return data.path;
};

const deleteFile = async (path: string) => {
  const { error } = await supabase.storage.from("qrs").remove([path]);
  if (error) throw new Error(error.message);
};

const invokeQR = async (name: string) => {
  const qrBlob = await generateQR(`${DB_ENDPOINT}/${name}`, name);
  const qrPath = await uploadFile(qrBlob);
  return qrPath;
};

export { uploadFile, deleteFile, invokeQR };
