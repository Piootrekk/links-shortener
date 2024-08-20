import supabase from "../supabase";
import generateQR from "../../utils/qrGenerate";
import { uploadFile, invokeQR } from "./files";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const insertUrl = async (
  orginal_url: string,
  short_url: string,
  title: string,
  user_id: string
) => {
  const qrPath = await invokeQR(short_url);
  const inserts = await prisma.urls.create({
    data: {
      original_url: orginal_url,
      short_url,
      title,
      user_id,
      qr_code: qrPath,
    },
  });
  if (!inserts) {
    throw new Error("Insert failed");
  }
  return {
    inserts,
    success: true,
  };
};

export default insertUrl;
