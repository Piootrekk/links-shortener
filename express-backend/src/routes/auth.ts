import { Router, Request, Response, CookieOptions } from "express";
import { signIn, signUp, tockenVerify } from "../supabase/auth";
import { loginSchema, signUpSchema } from "../schemas/authSchema";
import { getZodErrors } from "../utils/getZodErrors";
import { TCookieCredentials, TUserCredentials } from "../schemas/authTypes";

const cookieOptions: CookieOptions = {
  httpOnly: true,
};

const router = Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const parseResult = loginSchema.safeParse({ email, password });
  if (!parseResult.success) {
    const errors = getZodErrors(parseResult.error.errors);
    return res.status(400).json(errors);
  }
  try {
    const user = await signIn(email, password);
    if (!user.user || !user.session || !user) {
      return res.status(400).json({ message: "User not found" });
    }
    const cookieCredentials: TCookieCredentials = {
      access_token: user.session.access_token,
      role: user.user.user_metadata.role,
    };
    res.cookie(
      "access_token",
      JSON.stringify(cookieCredentials),
      cookieOptions
    );
    const userCredentials: TUserCredentials = {
      id: user.user.id,
      email: user.user.email!,
      created_at: user.user.created_at!,
      last_sign_in_at: user.user.last_sign_in_at!,
    };
    res.json(userCredentials);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router.post("/register", async (req, res) => {
  const { email, password, confirmPassword } = req.body;
  const parseResult = signUpSchema.safeParse({
    email,
    password,
    confirmPassword,
  });
  if (!parseResult.success) {
    const errors = getZodErrors(parseResult.error.errors);
    return res.status(400).json(errors);
  }
  try {
    const user = await signUp(email, password);
    if (!user.user || !user.session || !user) {
      return res.status(400).json({ message: "User not found" });
    }
    res.cookie("access_token", user.session.access_token, {
      httpOnly: true,
    });
    const userCredentials: TUserCredentials = {
      id: user.user.id,
      email: user.user.email!,
      created_at: user.user.created_at!,
      last_sign_in_at: user.user.last_sign_in_at!,
    };
    res.json(userCredentials);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router.post("/logout", async (req, res) => {
  const cookies = req.cookies.access_token;
  if (!cookies) {
    return res.status(400).json({ message: "Already logged out" });
  }
  res.clearCookie("access_token");
  res.json(null);
});

router.get("/user", async (req: Request, res: Response) => {
  const token = req.cookies.access_token;
  try {
    if (!token) return res.json(null);
    const tokenObject = JSON.parse(token) as TCookieCredentials;
    const user = await tockenVerify(tokenObject.access_token);
    if (!user) return res.json(null);
    const userCredentials: TUserCredentials = {
      id: user.id,
      email: user.email!,
      created_at: user.created_at!,
      last_sign_in_at: user.last_sign_in_at!,
    };
    res.json(userCredentials);
  } catch (error) {
    res.json(null);
  }
});

export default router;
