import { z } from "zod";
import insertLinkSchema from "./InsertLinkSchema";
const updateSchema = insertLinkSchema.omit({ shortUrl: true });

type TUpdateLinkSchema = z.infer<typeof updateSchema>;

export default updateSchema;
export type { TUpdateLinkSchema };
