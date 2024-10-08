import { NextFunction, Request, Response } from "express";
import { TUserRoles, isValidUserRole } from "../schemas/enums/role";
import { getUserLinksCount } from "../supabase/db/links/getLinks";

const limits = {
  redneck: 5,
  vip: 20,
  master: 999,
};

const validateUserLimit = (limit: number, role: TUserRoles) => {
  if (limit > limits[role]) {
    throw `User limit exceeded. Your limit is ${limits[role]}`;
  }
};

const limitLinksMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  const role: TUserRoles = user?.user_metadata.role;
  if (!user) return res.status(401).json({ message: "Unauthorized" });
  if (!isValidUserRole(role))
    return res
      .status(403)
      .json({
        message: "Wtf, u dont have a role, please contact contact support",
      });
  try {
    const linksCount = await getUserLinksCount(user.id);
    validateUserLimit(linksCount, role);
    next();
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export default limitLinksMiddleware;
