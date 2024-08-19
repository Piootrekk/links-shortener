import { Router } from "express";
import { signIn, signUp, signOut, getCurrentUser } from "../supabase/auth";
import { AuthError } from "@supabase/supabase-js";
const router = Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  try {
    const user = await signIn(email, password);
    res.json(user);
  } catch (error) {
    if (error instanceof AuthError) {
      res.status(400).json({ message: error.message });
    }
  }
});

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  try {
    const user = await signUp(email, password);
    res.status(401).json(user);
  } catch (error) {
    if (error instanceof AuthError) {
      res.status(400).json({ message: error.message });
    }
  }
});

router.post("/logout", async (req, res) => {
  try {
    await signOut();
    res.json({ message: "Logged out" });
  } catch (error) {
    if (error instanceof AuthError) {
      res.status(400).json({ message: error.message });
    }
  }
});

router.get("/user", async (req, res) => {
  try {
    const user = await getCurrentUser();
    res.send(user);
  } catch (error) {
    if (error instanceof AuthError) {
      res.status(400).json({ message: error.message });
    }
  }
});

export default router;
