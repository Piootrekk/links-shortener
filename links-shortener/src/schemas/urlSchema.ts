import { z } from "zod";

const urlSchema = z.object({
  created_at: z.string().datetime({ offset: true }),
  original_url: z.string().url(),
  short_url: z.string(),
  user_id: z.string().uuid().nullable(),
  title: z.string(),
  qr_code: z.string(),
  id: z.string().uuid(),
});

const urlsArraySchema = z.array(urlSchema);
type TUrlsArray = z.infer<typeof urlsArraySchema>;

export { urlsArraySchema };
export type { TUrlsArray };
