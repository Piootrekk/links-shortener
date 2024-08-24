import { prisma } from "../supabase";

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

const getLinksInfo = async (userId: string) => {
  const hiddenDetailsCount = await prisma.hidden_details.count({
    where: {
      urls: {
        user_id: userId,
      },
    },
  });
  const linksCount = await prisma.urls.count({
    where: {
      user_id: userId,
    },
  });
  const lastAdded = await prisma.urls.findFirst({
    select: { created_at: true },
    where: {
      user_id: userId,
    },
    take: 1,
    orderBy: {
      created_at: "desc",
    },
  });
  return {
    total_clicks: hiddenDetailsCount,
    total_links: linksCount,
    last_added: lastAdded?.created_at,
  };
};

const userLinksWithInfo = async (userId: string) => {
  const [hiddenDetailsCount, linksData] = await prisma.$transaction([
    prisma.hidden_details.count({
      where: {
        urls: {
          user_id: userId,
        },
      },
    }),
    prisma.urls.aggregate({
      where: {
        user_id: userId,
      },
      _count: {
        _all: true,
      },
      _max: {
        created_at: true,
      },
    }),
  ]);

  const links = await prisma.urls.findMany({
    where: {
      user_id: userId,
    },
    orderBy: {
      created_at: "desc",
    },
  });

  return {
    total_clicks: hiddenDetailsCount,
    total_links: linksData._count._all,
    last_added: linksData._max.created_at,
    links,
  };
};

export {
  getEveryLinks,
  getLink,
  getLinks,
  getLinksNotAuthInfo,
  getLinksInfo,
  userLinksWithInfo,
};
