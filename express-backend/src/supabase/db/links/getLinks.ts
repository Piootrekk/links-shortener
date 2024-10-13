import { prisma, seletedColumns } from "../../supabase";

const getPersonalLinks = async (user_id: string) => {
  const links = await prisma.urls.findMany({
    select: seletedColumns,
    where: {
      user_id,
    },
    take: 5,
  });
  return links;
};

const getPrersonalLinksRange = async (
  user_id: string,
  take: number,
  skip: number
) => {
  const links = await prisma.urls.findMany({
    select: seletedColumns,
    where: {
      user_id,
    },
    take: take,
    skip: skip,
  });
  return links;
};

const getUsersLinks = async () => {
  const links = await prisma.urls.findMany({
    select: seletedColumns,
  });
  return links;
};

const getUsersLinksRange = async (min: number, max: number) => {
  const links = await prisma.urls.findMany({
    select: seletedColumns,
    take: max,
    skip: min,
  });
  return links;
};

const getUserLinksCount = async (user_id: string) => {
  const count = await prisma.urls.count({
    where: {
      user_id,
    },
  });
  return count;
};

const getShortUrl = async (short_url: string) => {
  const custom_url = await prisma.urls.findFirst({
    select: { id: true, password: true },
    where: {
      short_url,
    },
  });
  return custom_url;
};

const getHashPassword = async (short_url: string) => {
  const query = await prisma.urls.findFirst({
    select: { password: true, original_url: true },
    where: {
      short_url,
    },
  });
  return query;
};

export {
  getPersonalLinks,
  getPrersonalLinksRange,
  getUsersLinks,
  getUsersLinksRange,
  getUserLinksCount,
  getShortUrl,
  getHashPassword,
};
