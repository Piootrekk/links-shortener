import passport from "passport";
import { Strategy as BearerStrategy } from "passport-http-bearer";
import supabase from "../supabase/supabase";
import { NextFunction, Response, Request } from "express";
import { User } from "@supabase/supabase-js";
import { userInfo } from "os";

passport.use(
  new BearerStrategy(async (token, done) => {
    try {
      const { data, error } = await supabase.auth.getUser(token);

      if (error || !data) {
        return done(null, false);
      }
      console.log(data);
      return done(null, data.user);
    } catch (error) {
      return done(error);
    }
  })
);

export const passportMiddleware = passport.initialize();
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate(
    "bearer",
    { session: false },
    (err: unknown, user: User) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Internal Server Error", error: err });
      }
      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      req.user = user;
      next();
    }
  )(req, res, next);
};

export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    "bearer",
    { session: false },
    (err: unknown, user: User) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Internal Server Error", error: err });
      }
      if (!user) {
        return res.json(null);
      }
      req.user = user;
      next();
    }
  )(req, res, next);
};
