import { Request, Response, Router } from "express";
import {
  allLinksInfo,
  getPersonalLinksWithInfo,
  userLinksWithInfo,
} from "../../supabase/db/statistics/getStaticstics";
import { authMiddleware } from "../../middlewares/authMiddleware";

const router = Router();

router.get("/global-statistics", async (req: Request, res: Response) => {
  const statistics = await allLinksInfo();
  return res.json(statistics);
});

router.get(
  "/personal-statistics",
  authMiddleware,
  async (req: Request, res: Response) => {
    const user = req.user;
    if (!user) {
      return res
        .status(400)
        .json({ message: "Unauthorized or invalid credentials" });
    }
    try {
      const statistics = await userLinksWithInfo(user.id);
      return res.json(statistics);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
);

router.get("/links-with-stats", authMiddleware, async (req, res) => {
  const user = req.user;
  if (!user) {
    return res
      .status(401)
      .json({ message: "Unauthorized or invalid credentials" });
  }
  try {
    const links = await getPersonalLinksWithInfo(user.id);
    return res.json(links);
  } catch (error) {
    return res.status(500).json(error);
  }
});

export default router;
