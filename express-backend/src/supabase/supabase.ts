import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";

config();

const supabaseUrl = process.env.EXPRESS_SUPABASE_URL;
const supabaseKey = process.env.EXPRESS_SUPABASE_KEY;

if (!supabaseUrl) throw new Error("EXPRESS_SUPABASE_URL is not defined");
if (!supabaseKey) throw new Error("EXPRESS_SUPABASE_KEY is not defined");

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
