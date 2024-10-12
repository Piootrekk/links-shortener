import { z } from "zod";

const insertLinkSchema = z.object({
  url: z.string().url({ message: "Invalid URL" }),
  title: z
    .string()
    .min(1, { message: "Minimum 1 character" })
    .max(100, { message: "Maximum 100 characters" }),
  shortUrl: z.string().min(1, { message: "Minimum 1 characters" }).max(64, {
    message: "Maximum 20 characters",
  }),
  password: z.string().optional(),
});

type TInsertLinkSchema = z.infer<typeof insertLinkSchema>;

export default insertLinkSchema;
export type { TInsertLinkSchema };
