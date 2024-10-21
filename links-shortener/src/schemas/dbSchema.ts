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
  city?: string | null;
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
  totalClicks: number;
  uniqueClicks: number;
  uniqueCountries: number;
  uniqueISP: number;
  uniqueDevices: number;
  uniqueBrowsers: number;
};

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
  TDetails,
};
