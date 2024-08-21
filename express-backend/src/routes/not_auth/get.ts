import { Router } from "express";
import { getLinksNotAuthInfo } from "../../supabase/db/selects";
const router = Router();

router.get("/home-info", async (req, res) => {
  try {
    const notAuthLinks = getLinksNotAuthInfo();
    res.json(notAuthLinks);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

export default router;
