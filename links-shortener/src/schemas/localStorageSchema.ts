import { z } from "zod";

const anonLinkSchema = z.object({
  short_url: z.string(),
  orginal_url: z.string(),
});
const key = "anonLinks";

const anonLinksSchema = z.array(anonLinkSchema);

type TAnonLinksFromLocalStorage = z.infer<typeof anonLinksSchema>;

export { anonLinksSchema, key };
export type { TAnonLinksFromLocalStorage };
