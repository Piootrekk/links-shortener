import { config } from "dotenv";
import generateQR from "../../utils/qrGenerate";
import supabase from "../supabase";

config();

const BUCKET_ENDPOINT = process.env.BUCKET_ENDPOINT;

if (!BUCKET_ENDPOINT) {
  throw new Error("BUCKET_ENDPOINT is not defined");
}

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
  const qrBlob = await generateQR(`${BUCKET_ENDPOINT}/${name}`, name);
  const qrPath = await uploadFile(qrBlob);
  return qrPath;
};

export { uploadFile, deleteFile, invokeQR };
