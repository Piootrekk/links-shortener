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

export {
  getPersonalLinks,
  getPrersonalLinksRange,
  getUsersLinks,
  getUsersLinksRange,
};
