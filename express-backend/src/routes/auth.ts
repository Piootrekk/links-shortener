import { Router, Request, Response } from "express";
import { signIn, signUp, getCurrentUser } from "../supabase/auth";
import { isLoggedIn, TPasportUser } from "../middlewares/loggedIn";

type TUser = {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string;
  meta_role: string;
  email_verified: boolean;
  session: {
    access_token: string;
  };
};

const router = Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  try {
    const user = await signIn(email, password);
    res.json({
      id: user.user.id,
      email: user.user.email,
      created_at: user.user.created_at,
      last_sign_in_at: user.user.last_sign_in_at,
      meta_role: user.user.app_metadata.role,
      email_verified: user.user.user_metadata.email_verified,
      session: {
        access_token: user.session.access_token,
      },
    } as TUser);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  try {
    const user = await signUp(email, password);
    if (user.user && user.session) {
      res.json({
        id: user.user.id,
        email: user.user.email,
        created_at: user.user.created_at,
        last_sign_in_at: user.user.last_sign_in_at,
        meta_role: user.user.app_metadata.role,
        email_verified: user.user.user_metadata.email_verified,
        session: {
          access_token: user.session.access_token,
        },
      } as TUser);
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/user-test", async (req, res) => {
  try {
    const user = await getCurrentUser();
    res.json(user);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/user", isLoggedIn, async (req, res) => {
  const user = req.user as TPasportUser;

  if (user) {
    res.json({
      id: user.id,
      email: user.email,
      created_at: user.created_at,
      last_sign_in_at: user.last_sign_in_at,
      meta_role: user.user_metadata.role,
      email_verified: user.user_metadata.email_verified,
      session: {
        access_token: user.token,
      },
    } as TUser);
  }
});

export default router;
