import supabase from "../supabase";
import generateQR from "@/lib/qrGenerate";
import { uploadFile } from "./files";

const insertUrl = async (
  orginal_url: string,
  short_url: string,
  title: string,
  user_id: string
) => {
  const qrBlob = await generateQR(orginal_url, short_url);
  const qrPath = await uploadFile(qrBlob);

  const { data, error } = await supabase.from("urls").insert([
    {
      original_url: orginal_url,
      short_url: short_url,
      user_id: user_id,
      title: title,
      qr_code: qrPath,
    },
  ]);
  if (error) throw new Error(error.message);
  return data;
};

export default insertUrl;
