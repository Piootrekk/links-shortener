import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getLinks = async (user_id: string) => {
  const links = await prisma.urls.findMany({
    where: {
      user_id,
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
  });
  return link;
};
// kiedyś dorobić idiki na limity
const getAllLinks = async () => {
  const links = await prisma.urls.findMany({
    take: 10,
    orderBy: {
      created_at: "asc",
    },
  });

  return links;
};

const getLinksNotAuthInfo = async () => {
  const linksCount = await prisma.urls.count();
  const lastAdded = await prisma.urls.findMany({
    select: { created_at: true },
    take: 1,
    orderBy: {
      created_at: "desc",
    },
  });
  const detailsCount = await prisma.hidden_details.count();
  return { linksCount, lastAdded, detailsCount };
};

export { getAllLinks, getLink, getLinks, getLinksNotAuthInfo };
