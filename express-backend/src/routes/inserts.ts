import { Router } from "express";
import { User } from "@supabase/supabase-js";
import insertUrl from "../supabase/db/inserts";
const router = Router();
import { authMiddleware } from "../middlewares/loggedIn";

router.post("/add-link", authMiddleware, async (req, res) => {
  const user = req.user as User;
  const { orginal_url, short_url, title } = req.body;

  if (!orginal_url || !short_url || !title) {
    return res.status(400).json({ error: "Missing data" });
  }

  const newUrl = await insertUrl(orginal_url, short_url, title, user.id);
  res.json(newUrl);
});
export default router;