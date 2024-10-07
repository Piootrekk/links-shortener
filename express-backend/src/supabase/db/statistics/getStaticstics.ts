import { prisma, seletedColumns } from "../../supabase";

const userLinksWithInfo = async (userId: string) => {
  const [hiddenDetailsCount, linksData] = await Promise.all([
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

  return {
    total_clicks: hiddenDetailsCount,
    total_links: linksData._count._all,
    last_added: linksData._max.created_at,
  };
};

const getPersonalLinksWithInfo = async (userId: string) => {
  const [links, hiddenDetailsCount, linksData] = await Promise.all([
    prisma.urls.findMany({
      select: seletedColumns,
      where: {
        user_id: userId,
      },
      take: 5,
    }),
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

  return {
    links,
    stats: {
      total_clicks: hiddenDetailsCount,
      total_links: linksData._count._all,
      last_added: linksData._max.created_at,
    },
  };
};
const allLinksInfo = async () => {
  const hiddenDetailsCount = await prisma.hidden_details.count();
  const linksData = await prisma.urls.aggregate({
    _count: {
      _all: true,
    },
    _max: {
      created_at: true,
    },
  });

  return {
    total_clicks: hiddenDetailsCount,
    total_links: linksData._count._all,
    last_added: linksData._max.created_at,
  };
};

export { userLinksWithInfo, allLinksInfo, getPersonalLinksWithInfo };
