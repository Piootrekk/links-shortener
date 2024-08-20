import { Router } from "express";
import { User } from "@supabase/supabase-js";
import insertUrl from "../../supabase/db/inserts";
const router = Router();

router.post("/add-link", async (req, res) => {
  const user = req.user as User;
  const { orginal_url, short_url, title } = req.body;
  if (!orginal_url || !short_url || !title) {
    return res.status(400).json({ error: "Missing data" });
  }
  try {
    const newUrl = await insertUrl(orginal_url, short_url, title, user.id);
    res.json(newUrl);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
export default router;
