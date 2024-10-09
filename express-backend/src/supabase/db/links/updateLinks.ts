import { prisma, seletedColumns } from "../../supabase";

//  TODO updatedTime
const updateUrl = async (
  userId: string,
  id: string,
  url: string,
  title: string
) => {
  const updatedUrl = await prisma.urls.update({
    select: seletedColumns,
    where: {
      id,
      user_id: userId,
    },
    data: {
      original_url: url,
      title: title,
    },
  });
  return {
    updatedUrl,
    success: true,
  };
};

export { updateUrl };
