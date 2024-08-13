import { z } from "zod";

const insertLinkSchema = z.object({
  url: z.string().url({ message: "Invalid URL" }),
  title: z
    .string()
    .min(1, { message: "Minimum 1 character" })
    .max(100, { message: "Maximum 100 characters" }),
  shortUrl: z.string().min(2, { message: "Minimum 2 characters" }).max(20, {
    message: "Maximum 20 characters",
  }),
});

type TInsertLinkSchema = z.infer<typeof insertLinkSchema>;

export default insertLinkSchema;
export type { TInsertLinkSchema };
