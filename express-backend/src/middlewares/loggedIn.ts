import { Request, Response, NextFunction } from "express";
import { tockenVerify } from "../supabase/auth";
import { User } from "@supabase/supabase-js";

type ExtendedRequest = Request & { user: User | null | undefined };

const isLoggedAuth = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Auth header missing" });
  }

  const authToken = authHeader.split(" ")[1];
  if (!authToken) {
    return res.status(401).json({ message: "Auth tocken missing" });
  }

  const data = await tockenVerify(authToken);
  if (!data) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  req.user = data.user;
  return next();
};

export default isLoggedAuth;

export type { ExtendedRequest };
