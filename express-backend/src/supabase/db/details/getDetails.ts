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

// const getDetails = async (id: string, user_id: string) => {
//   const hidden_details = await prisma.hidden_details.findMany({
//     where: {
//       urls: {
//         id,
//         user_id,
//       },
//     },
//     distinct: ["id"],
//   });

//   console.log(hidden_details);
//   return hidden_details;
// };

const getDetails = async (id: string, user_id: string) => {
  const linksWithDetails = await prisma.urls.findUnique({
    where: {
      id,
      user_id,
    },

    select: {
      hidden_details: true,
    },
  });
  return linksWithDetails;
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
  getDetails,
  getLinkWithDetailsLimits,
};
