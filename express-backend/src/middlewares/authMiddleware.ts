import { Request, Response, NextFunction } from "express";
import { tockenVerify } from "../supabase/auth";
import {
  TCookieCredentials,
  TMasterCredentials,
  TUserCredentials,
} from "../schemas/authTypes";
const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json({ messege: "Unauthorized" });
  const tokenObject = JSON.parse(token) as TCookieCredentials;

  try {
    const user = await tockenVerify(tokenObject.access_token);

    if (!user) return res.status(401).json({ messege: "Unauthorized" });
    
    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const authAsMasterMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(403).json({ messege: "Unauthorized" });
  const tokenObject = JSON.parse(token) as TCookieCredentials;
  if (tokenObject.role !== "master")
    return res.status(403).json({ message: "Forbidden" });
  try {
    const user = await tockenVerify(tokenObject.access_token);
    if (!user) return res.status(403).json({ messege: "Unauthorized" });
    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export { authMiddleware, authAsMasterMiddleware };
