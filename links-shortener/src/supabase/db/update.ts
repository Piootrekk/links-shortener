import { TInsertLinkSchema } from "@/schemas/InsertLinkSchema";
import supabase from "../supabase";
import generateQR from "@/lib/qrGenerate";
import { uploadFile } from "./files";

const upldateUrls = async (
  userId: string,
  { url, title, shortUrl }: TInsertLinkSchema
) => {
  const qrBlob = await generateQR(url, shortUrl);
  const qrPath = await uploadFile(qrBlob);

  const { data, error } = await supabase
    .from("urls")
    .update({
      orginal_url: url,
      title: title,
      short_url: shortUrl,
      qr_code: qrPath,
    })
    .eq("user_id", userId);
  if (error) throw new Error(error.message);
  return data;
};

export default upldateUrls;
