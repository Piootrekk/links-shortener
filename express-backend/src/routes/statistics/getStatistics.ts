import { Router } from "express";
import {
  allLinksInfo,
  userLinksWithInfo,
} from "../../supabase/db/statistics/getStaticstics";
import { authMiddleware } from "../../middlewares/authMiddleware";

const router = Router();

router.get("/global-statistics", (req, res) => {
  const statistics = allLinksInfo();
  res.json(statistics);
});

router.get("/personal-statistics", authMiddleware, (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(400).json({ message: "Unauthorized or invalid credentials" });
  }
  const statistics = userLinksWithInfo(user.id);
  res.json(statistics);
});

export default router;
