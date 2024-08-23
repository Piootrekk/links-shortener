import { Router, Request, Response } from "express";
import { signIn, signUp, getCurrentUser } from "../supabase/auth";
import { isLoggedIn } from "../middlewares/loggedIn";
import { AuthError } from "@supabase/supabase-js";
const router = Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  try {
    const user = await signIn(email, password);
    req.user = user;
    res.json(user);
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
    res.status(201).json(user);
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
  const user = req.user;
  res.json(user);
});

export default router;
