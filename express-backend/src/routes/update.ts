import { User } from "@supabase/supabase-js";
import { Router } from "express";
import updateUrls from "../supabase/db/update";
import authenticateUser from "../middlewares/loggedIn";

const router = Router();

router.put("/update-link", authenticateUser, async (req, res) => {
  const user = req.user as User;
  const { id, url, title, shortUrl } = req.body;
  if (!id || !url || !title || !shortUrl) {
    return res.status(400).json({ error: "Missing data" });
  }
  try {
    const updatedUrl = await updateUrls(user.id, id, {
      url,
      title,
      shortUrl,
    });
    res.json(updatedUrl);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

export default router;
