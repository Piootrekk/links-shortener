import { User } from "@supabase/supabase-js";
import { Router } from "express";
import updateUrls from "../supabase/db/update";
import { authMiddleware } from "../middlewares/loggedIn";

const router = Router();

router.put("/update-link", authMiddleware, async (req, res) => {
  const user = req.user as User;
  const { id, orginal_url, title, short_url } = req.body;
  if (!id || !orginal_url || !title || !short_url) {
    return res.status(400).json({ error: "Missing data" });
  }
  try {
    const updatedUrl = await updateUrls(
      user.id,
      id,
      orginal_url,
      title,
      short_url
    );
    res.json(updatedUrl);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

export default router;