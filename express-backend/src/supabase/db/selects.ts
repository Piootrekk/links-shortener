import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getLinks = async (user_id: string) => {
  const links = await prisma.urls.findMany({
    where: {
      user_id,
    },
    include: {
      hidden_details: true,
    },
    take: 10,
  });
  return links;
};

const getLink = async (short_url: string) => {
  const link = await prisma.urls.findUnique({
    where: {
      short_url,
    },
    include: {
      hidden_details: true,
    },
  });
  return link;
};
// kiedyś dorobić idiki na limity
const getAllLinks = async () => {
  const links = await prisma.urls.findMany({
    include: {
      hidden_details: {
        take: 5,
      },
    },
    take: 10,
  });

  return links;
};

export { getAllLinks, getLink, getLinks };
