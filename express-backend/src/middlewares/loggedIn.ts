import { User } from "@supabase/supabase-js";
import passport from "passport";
import { Strategy as BearerStrategy } from "passport-http-bearer";
import supabase from "../supabase/supabase";

passport.use(
  new BearerStrategy(async (token, done) => {
    try {
      const { data, error } = await supabase.auth.getUser(token);

      if (error || !data.user) {
        return done(null, false, "User not found");
      }
      const user: User = data.user;
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

const authenticateUser = passport.authenticate("bearer", { session: false });

export default authenticateUser;
