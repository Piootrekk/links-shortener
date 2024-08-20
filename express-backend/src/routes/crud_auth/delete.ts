import { Router } from "express";
import { deleteSelectedUrl } from "../../supabase/db/delete";

const router = Router();

router.delete("/delete-link", async (req, res) => {
  const { id, qrPath } = req.body;
  if (!id || !qrPath) {
    return res.status(400).json({ error: "Missing data" });
  }
  try {
    const deletedUrl = await deleteSelectedUrl(id, qrPath);
    res.json(deletedUrl);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

export default router;
