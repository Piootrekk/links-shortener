import { prisma } from "../../supabase";

const getLinkWithDetailsUnauthorized = async (short_url: string) => {
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

const getLinkWithDetailsUnauthorizedLimits = async (
  short_url: string,
  min: number,
  max: number
) => {
  const link = await prisma.urls.findUnique({
    where: {
      short_url,
    },
    include: {
      hidden_details: {
        take: max,
        skip: min,
      },
    },
  });
  return link;
};

const getLinkWithDetails = async (short_url: string, user_id: string) => {
  const link = await prisma.urls.findUnique({
    where: {
      short_url,
      user_id,
    },
    include: {
      hidden_details: true,
    },
  });
  return link;
};

const getLinkWithDetailsLimits = async (
  short_url: string,
  user_id: string,
  min: number,
  max: number
) => {
  const link = await prisma.urls.findUnique({
    where: {
      short_url,
      user_id,
    },
    include: {
      hidden_details: {
        take: max,
        skip: min,
      },
    },
  });
  return link;
};

export {
  getLinkWithDetailsUnauthorized,
  getLinkWithDetailsUnauthorizedLimits,
  getLinkWithDetails,
  getLinkWithDetailsLimits,
};
