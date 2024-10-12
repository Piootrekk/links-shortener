import { config } from "dotenv";
import generateQR from "../utils/qrGenerate";
import supabase from "./supabase";
import streamifier from "streamifier";
config();

const URL_FRONT = process.env.URL_FRONT;

if (!URL_FRONT) {
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
  const qrBlob = await generateQR(`${URL_FRONT}/direct/${name}`, name);
  const qrPath = await uploadFile(qrBlob);
  return qrPath;
};

const downloadFile = async (path: string) => {
  const { data, error } = await supabase.storage.from("qrs").download(path);
  if (error) throw new Error(error.message);
  const buffer = Buffer.from(await data.arrayBuffer());
  const stream = streamifier.createReadStream(buffer);
  return stream;
};

export { uploadFile, deleteFile, invokeQR, downloadFile };
