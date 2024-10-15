import { prisma } from "../../supabase";

type TDetailsInsert = {
  city?: string;
  device?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  user_agent?: string;
  browser?: string;
  os?: string;
  device_type?: string;
  cpu?: string;
  ip?: string;
  isp?: string;
};

const setDetails = async (short_url: string, details: TDetailsInsert) => {
  const data = await prisma.hidden_details.create({
    data: {
      ...details,
      urls: {
        connect: {
          short_url,
        },
      },
    },
  });
  return data;
};

export { setDetails };
export type { TDetailsInsert };
