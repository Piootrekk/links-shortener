import { PrismaClient } from "@prisma/client";
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";

config();
const supabaseUrl = process.env.EXPRESS_SUPABASE_URL;
const supabaseKey = process.env.EXPRESS_SUPABASE_KEY;
const service_role = process.env.EXPRESS_SUPABASE_SERVICE_ROLE;
if (!supabaseUrl) throw new Error("EXPRESS_SUPABASE_URL is not defined");
if (!supabaseKey) throw new Error("EXPRESS_SUPABASE_KEY is not defined");
if (!service_role)
  throw new Error("EXPRESS_SUPABASE_ACCESS_TOKEN is not defined");

const supabase = createClient(supabaseUrl, supabaseKey);
const adminSupabase = createClient(supabaseUrl, service_role, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

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
export { prisma, seletedColumns, adminSupabase };
export default supabase;
