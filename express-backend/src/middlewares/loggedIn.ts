import { User } from "@supabase/supabase-js";
import passport from "passport";
import { Strategy as BearerStrategy } from "passport-http-bearer";
import supabase from "../supabase/supabase";
import { tockenVerify } from "../supabase/auth";
passport.use(
  new BearerStrategy(async (token, done) => {
    try {
      const user = await tockenVerify(token);
      if (user === null) {
        return done(null, false);
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

const authenticateUser = passport.authenticate("bearer", { session: false });

export default authenticateUser;
