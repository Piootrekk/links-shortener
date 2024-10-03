import { prisma } from "../../supabase";

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
  return {
    total_clicks: hiddenDetailsCount,
    total_links: linksData._count._all,
    last_added: linksData._max.created_at,
  };
};

const AllLinksInfo = async () => {
  const [hiddenDetailsCount, linksData] = await prisma.$transaction([
    prisma.hidden_details.count(),
    prisma.urls.aggregate({
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

export { userLinksWithInfo, AllLinksInfo };
