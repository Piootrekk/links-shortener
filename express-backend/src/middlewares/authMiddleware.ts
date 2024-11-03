import { Request, Response, NextFunction } from "express";
import { tockenVerify } from "../supabase/auth";
import { TCookieCredentials } from "../schemas/authTypes";
const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.access_token as string;
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  try {
    const user = await tockenVerify(token);

    if (!user) return res.status(401).json({ message: "Unauthorized" });

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
  const token = req.cookies.access_token as string;
  if (!token) return res.status(403).json({ message: "Unauthorized" });

  try {
    const verifyToken = await tockenVerify(token);
    const userRole = verifyToken.user_metadata.role as string;
    if (userRole !== "master")
      return res.status(403).json({ message: "Forbidden" });
    req.user = verifyToken;
    next();
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export { authMiddleware, authAsMasterMiddleware };
