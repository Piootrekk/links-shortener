import { z } from "zod";

const detailsSchema = z.object({
  created_at: z.string().datetime({ offset: true }),
  id: z.string().uuid(),
  city: z.string(),
  country: z.string(),
  device: z.string(),
  lattitude: z.number(),
  longitude: z.number(),
  urls_id: z.string().uuid(),
});

const detailsArraySchema = z.array(detailsSchema);
type TDetailsData = z.infer<typeof detailsArraySchema>;

export { detailsArraySchema };
export type { TDetailsData };
