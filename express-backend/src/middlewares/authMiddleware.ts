import { Request, Response, NextFunction } from "express";
import { tockenVerify } from "../supabase/auth";
import { TCookieCredentials, TUserCredentials } from "../schemas/authTypes";
const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.access_token;
  if (!token) return res.json(null);
  const tokenObject = JSON.parse(token) as TCookieCredentials;
  console.log(tokenObject);
  try {
    const { user } = await tockenVerify(tokenObject.access_token);
    console.log(user);
    if (!user) return res.json(null);
    const userCredentials: TUserCredentials = {
      id: user.id,
      email: user.email!,
      created_at: user.created_at!,
      last_sign_in_at: user.last_sign_in_at!,
    };
    req.user = userCredentials;
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
  if (!token) return res.json(null);
  const tokenObject = JSON.parse(token) as TCookieCredentials;
  if (tokenObject.role !== "master") return res.json(null);
  try {
    const { user } = await tockenVerify(tokenObject.access_token);
    if (!user) return res.json(null);
    const userCredentials: TUserCredentials = {
      id: user.id,
      email: user.email!,
      created_at: user.created_at!,
      last_sign_in_at: user.last_sign_in_at!,
    };
    req.user = userCredentials;
    next();
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export { authMiddleware, authAsMasterMiddleware };
