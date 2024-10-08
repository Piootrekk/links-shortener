import * as express from "express";
import { TUserCredentials } from "../../schemas/authTypes";
import { User } from "@supabase/supabase-js";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
