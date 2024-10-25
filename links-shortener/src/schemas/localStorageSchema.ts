import { z } from "zod";

const linkStorageSchema = z.object({
  short_url: z.string(),
  original_url: z.string(),
  id: z.string().optional(),
});

const key = "anonLinks";

const anonLinksSchema = z.union([linkStorageSchema, z.null()]);

type TAnonLinkFromLocalStorage = z.infer<typeof anonLinksSchema>;

export { anonLinksSchema, key };
export type { TAnonLinkFromLocalStorage };
