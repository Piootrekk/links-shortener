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
    include: {
      hidden_details: true,
    },
  });
  return link;
};

// kiedyś dorobić idiki na limity
const getEveryLinks = async () => {
  const links = await prisma.urls.findMany({
    take: 10,
    orderBy: {
      created_at: "asc",
    },
  });

  return links;
};

const getLinksNotAuthInfo = async () => {
  const detailsCount = await prisma.hidden_details.count();
  const linksCount = await prisma.urls.count();
  const lastAdded = await prisma.urls.findFirst({
    select: { created_at: true },
    take: 1,
    orderBy: {
      created_at: "desc",
    },
  });
  return {
    total_clicks: detailsCount,
    total_links: linksCount,
    last_added: lastAdded?.created_at,
  };
};

export { getEveryLinks, getLink, getLinks, getLinksNotAuthInfo };
