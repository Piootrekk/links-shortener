import { prisma } from "../../supabase";

const getAllLinks = async () => {
  const links = await prisma.urls.findMany({
    include: {
      hidden_details: true,
    },
  });
  return links;
};

export { getAllLinks };
