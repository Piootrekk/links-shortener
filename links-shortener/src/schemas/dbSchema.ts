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
  title: z.string(),
  qr_code: z.string(),
  id: z.string().uuid(),
  hidden_details: detailsArraySchema,
});

const urlsArraySchema = z.array(urlSchema);
type TUrls = z.infer<typeof urlsArraySchema>;
type TUrl = z.infer<typeof urlSchema>;

const singleCustomUrlSchema = z.object({
  original_url: z.string().url(),
});

type TCustomeUrl = z.infer<typeof singleCustomUrlSchema>;

export { urlsArraySchema, singleCustomUrlSchema };
export type { TUrls, TUrl, TCustomeUrl };
