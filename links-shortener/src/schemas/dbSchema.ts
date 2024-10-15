import { z } from "zod";

const urlSchema = z.object({
  created_at: z.string().datetime({ offset: true }),
  updated_at: z.string().datetime({ offset: true }).nullable(),
  original_url: z.string().url(),
  short_url: z.string(),
  password: z.string().nullable(),
  title: z.string().nullable(),
  qr_code: z.string().nullable(),
  id: z.string().uuid(),
});

const extendedUrlSchema = z.object({
  links: z.array(urlSchema),
  total_clicks: z.number(),
  total_links: z.number(),
  last_added: z.string().datetime({ offset: true }),
});

type TExtendedUrl = z.infer<typeof extendedUrlSchema>;

const urlsArraySchema = z.array(urlSchema);
type TUrl = z.infer<typeof urlSchema>;

const singleCustomUrlSchema = z.object({
  original_url: z.string().url(),
});

type TCustomeUrl = z.infer<typeof singleCustomUrlSchema>;

type TCrud = {
  data: TUrl | null;
  success: boolean;
};

type TStats = {
  last_added: string | null;
  total_links: number;
  total_clicks: number;
};

type TDetailsInsert = {
  city?: string;
  device?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  user_agent?: string;
  browser?: string;
  isp?: string;
  os?: string;
  device_type?: string;
  cpu?: string;
  ip?: string;
};

type TDetails = TDetailsInsert & {
  id: string;
  created_at: string;
  urls_id: string;
};

type TGetDetails = {
  hidden_details: TDetails[];
};

// {
//   hidden_details: [
//     {
//       id: '85dda822-0465-4c33-9fd3-03df1fdcf8ec',
//       created_at: 2024-10-14T23:02:55.789Z,
//       city: 'Lodz',
//       device: null,
//       country: 'Poland',
//       latitude: 51.7558,
//       longitude: 19.4662,
//       user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
//       browser: 'Chrome',
//       isp: 'Orange Polska Spolka Akcyjna',
//       os: 'Windows',
//       device_type: 'Desktop',
//       cpu: 'amd64',
//       ip: '83.26.149.240',
//       urls_id: '3c26bad4-7ba9-4749-8948-e4da609ea932'
//     }
//   ],
//   id: '3c26bad4-7ba9-4749-8948-e4da609ea932',
//   user_id: '2f0b0880-be1f-486a-b702-5cf7ac0554b5'
// }

type TRedirect = {
  password: boolean;
};

export { urlsArraySchema, singleCustomUrlSchema, extendedUrlSchema };
export type {
  TUrl,
  TCustomeUrl,
  TExtendedUrl,
  TCrud,
  TStats,
  TRedirect,
  TDetailsInsert,
  TGetDetails,
};
