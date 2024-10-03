import { z } from "zod";

const querySchema = z.object({
  min: z
    .number()
    .int({ message: "Must be number" })
    .min(0, { message: "Min 0" })
    .default(0),
  max: z
    .number()
    .int({ message: "Must be number" })
    .min(1, { message: "Min 1" })
    .max(10, { message: "Max 10" })
    .default(1),
});

const insertRouteSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Min 1 character" })
    .max(255, { message: "Max 255 characters" }),
  orginal_url: z
    .string()
    .url({ message: "Invalid URL" })
    .max(300, { message: "Don't be greedy" }),
  short_url: z.string().min(3, { message: "min 3 characters" }).max(64, {
    message: "Wtf are you doing 0_o are u shortening? or writing a book?",
  }),
});

const updateRouteSchema = insertRouteSchema.merge(
  z.object({
    id: z.string().uuid({ message: "Invalid ID" }),
  })
);

const deleteRouteSchema = z.object({
  id: z.string().uuid({ message: "Invalid ID" }),
  qr_code: z.string().optional(),
});

export { querySchema, insertRouteSchema, updateRouteSchema, deleteRouteSchema };
