import { prisma } from "../../supabase";

const getPersonalLinks = async (user_id: string) => {
  const links = await prisma.urls.findMany({
    where: {
      user_id,
    },
    take: 5,
  });
  return links;
};

const getPrersonalLinksLimits = async (
  user_id: string,
  min: number,
  max: number
) => {
  const links = await prisma.urls.findMany({
    where: {
      user_id,
    },
    take: max,
    skip: min,
  });
  return links;
};

const getUsersLinks = async () => {
  const links = await prisma.urls.findMany();
  return links;
};

const getUsersLinksLimits = async (min: number, max: number) => {
  const links = await prisma.urls.findMany({
    take: max,
    skip: min,
  });
  return links;
};
