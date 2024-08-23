import { prisma } from "../supabase";

// TODO Kiedyś dodać updated_time

const updateUrls = async (
  userId: string,
  id: string,
  url: string,
  title: string,
  shortUrl: string
) => {
  const updatedUrl = await prisma.urls.update({
    where: {
      id,
      user_id: userId,
    },
    data: {
      original_url: url,
      title: title,
      short_url: shortUrl,
    },
  });
  return {
    updatedUrl,
    success: true,
  };
};

export default updateUrls;
