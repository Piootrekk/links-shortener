import { PrismaClient } from "@prisma/client";
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";

config();

const supabaseUrl = process.env.EXPRESS_SUPABASE_URL;
const supabaseKey = process.env.EXPRESS_SUPABASE_KEY;

if (!supabaseUrl) throw new Error("EXPRESS_SUPABASE_URL is not defined");
if (!supabaseKey) throw new Error("EXPRESS_SUPABASE_KEY is not defined");

const supabase = createClient(supabaseUrl, supabaseKey);

const seletedColumns = {
  id: true,
  original_url: true,
  short_url: true,
  password: true,
  title: true,
  qr_code: true,
  created_at: true,
  updated_at: true,
};

const prisma = new PrismaClient({
  log: ["warn"],
  errorFormat: "pretty",
});
export { prisma, seletedColumns };
export default supabase;
