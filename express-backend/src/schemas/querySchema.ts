import { config } from "dotenv";
import { z } from "zod";
config();

const front = process.env.EXPRESS_URL_FRONT;
if (!front) {
  throw new Error("FRONTEND_URL is not set");
}
const restrictedPath = "/direct/";

const insertRouteSchema = z.object({
  title: z.string().max(255, { message: "Max 255 characters" }),
  orginal_url: z
    .string()
    .url({ message: "Invalid URL" })
    .max(300, { message: "Don't be greedy" })
    .refine(
      (url) =>
        !new RegExp(
          `^${front.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")}${restrictedPath}`
        ).test(url),
      {
        message: `Nice try with making infinite loop, but nope`,
      }
    ),
  short_url: z.string().min(1, { message: "min 1 characters" }).max(64, {
    message: "Wtf are you doing 0_o are u shortening? or writing a book?",
  }),
  password: z.string().optional(),
});

const querySchema = z.object({
  take: z
    .number()
    .int({ message: "Must be number" })
    .min(0, { message: "Min 0" })
    .default(0),
  skip: z
    .number()
    .int({ message: "Must be number" })
    .min(1, { message: "Min 1" })
    .max(10, { message: "Max 10" })
    .default(1),
});

const insertAnonymouslySchema = insertRouteSchema.pick({
  orginal_url: true,
  short_url: true,
});
const updateRouteSchema = z.object({
  id: z.string().uuid({ message: "Invalid ID" }),
  title: z.string().max(255, { message: "Max 255 characters" }),
  orginal_url: z
    .string()
    .url({ message: "Invalid URL" })
    .max(300, { message: "Don't be greedy" })
    .refine(
      (url) =>
        !new RegExp(
          `^${front.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")}${restrictedPath}`
        ).test(url),
      {
        message: `Nice try with making infinite loop, but nope`,
      }
    ),
});

const deleteRouteSchema = z.object({
  id: z.string().uuid({ message: "Invalid ID" }),
  qr_code: z.string().optional(),
});

export {
  querySchema,
  insertRouteSchema,
  updateRouteSchema,
  deleteRouteSchema,
  insertAnonymouslySchema,
};
