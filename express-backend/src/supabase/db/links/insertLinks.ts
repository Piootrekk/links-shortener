import { invokeQR } from "../../files";
import { prisma, seletedColumns } from "../../supabase";

const insertUrl = async (
  orginal_url: string,
  short_url: string,
  title: string,
  user_id: string
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

export { insertUrl };
