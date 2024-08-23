import { Router } from "express";
import { deleteSelectedUrl } from "../supabase/db/delete";
import { authMiddleware } from "../middlewares/loggedIn";
const router = Router();

router.delete("/delete-link", authMiddleware, async (req, res) => {
  const { id, qr_code } = req.body;
  if (!id || !qr_code) {
    return res.status(400).json({ error: "Missing data" });
  }
  try {
    const deletedUrl = await deleteSelectedUrl(id, qr_code);
    res.json(deletedUrl);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

export default router;
