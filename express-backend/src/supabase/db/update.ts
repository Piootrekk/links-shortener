import { PrismaClient } from "@prisma/client";

// TODO Kiedyś dodać updated_time

const prisma = new PrismaClient();

const updateUrls = async (
  userId: string,
  id: string,
  formItems: {
    url: string;
    title: string;
    shortUrl: string;
  }
) => {
  const updatedUrl = await prisma.urls.update({
    where: {
      id,
    },
    data: {
      original_url: formItems.url,
      title: formItems.title,
      short_url: formItems.shortUrl,
    },
  });
  return {
    updatedUrl,
    success: true,
  };
};

export default updateUrls;
