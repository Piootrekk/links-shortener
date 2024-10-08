import { z } from "zod";

const anonymousLinkSchema = z.object({
  url: z
    .string()
    .url({ message: "Please enter a correct URL address" })
    .max(300, { message: "URL is too long" }),
});

type TAnonymousLinkSchema = z.infer<typeof anonymousLinkSchema>;

export { anonymousLinkSchema };
export type { TAnonymousLinkSchema };
