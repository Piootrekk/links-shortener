import { z } from "zod";

const detailsSchema = z.object({
  created_at: z.string().datetime({ offset: true }),
  id: z.string().uuid(),
  city: z.string(),
  country: z.string(),
  device: z.string(),
  latitude: z.number(),
  longitude: z.number(),
});

const detailsArraySchema = z.array(detailsSchema);

const urlSchema = z.object({
  created_at: z.string().datetime({ offset: true }),
  original_url: z.string().url(),
  short_url: z.string(),
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
type TUrls = z.infer<typeof urlsArraySchema>;
type TUrl = z.infer<typeof urlSchema>;

const singleCustomUrlSchema = z.object({
  original_url: z.string().url(),
});

type TCustomeUrl = z.infer<typeof singleCustomUrlSchema>;

type TCrud = {
  data: TUrl | null;
  success: boolean;
};

export {
  urlsArraySchema,
  singleCustomUrlSchema,
  detailsArraySchema,
  extendedUrlSchema,
};
export type { TUrls, TUrl, TCustomeUrl, TExtendedUrl, TCrud };
