import { z } from "zod";

const removeLinkSchema = (title: string) =>
  z.object({
    title: z.string().refine((data) => data === title.trim(), {
      message: "Title does not match",
    }),
  });

export default removeLinkSchema;
