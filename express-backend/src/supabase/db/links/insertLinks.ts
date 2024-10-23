import { invokeQR } from "../../files";
import { prisma, seletedColumns } from "../../supabase";

const insertUrl = async (
  orginal_url: string,
  short_url: string,
  title: string,
  user_id: string,
  password?: string
) => {
  const qrPath = await invokeQR(short_url);
  const inserts = await prisma.urls.create({
    select: seletedColumns,
    data: {
      original_url: orginal_url,
      short_url: short_url,
      title: title,
      user_id: user_id,
      qr_code: qrPath,
      password: password,
    },
  });
  if (!inserts) {
    throw new Error("Insert failed");
  }
  return {
    data: inserts,
    success: true,
  };
};

const insertUrlAnonymously = async (orginal_url: string, short_url: string) => {
  const inserts = await prisma.urls.create({
    select: { id: true, original_url: true, short_url: true, created_at: true },
    data: {
      original_url: orginal_url,
      short_url: short_url,
    },
  });
  console.log(inserts);
  if (!inserts) throw new Error("Insert failed");
  return {
    data: inserts,
    success: true,
  };
};

export { insertUrl, insertUrlAnonymously };
