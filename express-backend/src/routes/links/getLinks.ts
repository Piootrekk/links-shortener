import { Router, Request, Response } from "express";
import { authMiddleware } from "../../middlewares/authMiddleware";
import {
  getPersonalLinks,
  getPrersonalLinksRange,
} from "../../supabase/db/links/getLinks";
import { querySchema } from "../../schemas/querySchema";
import { getZodErrors } from "../../utils/getZodErrors";

const router = Router();

router.get("/links", authMiddleware, async (req, res) => {
  const user = req.user;
  if (!user) {
    return res
      .status(401)
      .json({ message: "Unauthorized or invalid credentials" });
  }
  try {
    const links = await getPersonalLinks(user.id);
    return res.json(links);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get(
  "/links-range",
  authMiddleware,
  async (req: Request, res: Response) => {
    const { take, skip } = req.query;
    const takeSkip = {
      take: parseInt(take as string),
      skip: parseInt(skip as string),
    };
    const valiedatedTakeSkip = querySchema.safeParse(takeSkip);
    if (!valiedatedTakeSkip.success) {
      const errors = getZodErrors(valiedatedTakeSkip.error.errors);
      return res.status(400).json(errors);
    }
    const user = req.user;
    if (!user) {
      return res
        .status(400)
        .json({ message: "Unauthorized or invalid credentials" });
    }
    try {
      const links = await getPrersonalLinksRange(
        user.id,
        valiedatedTakeSkip.data.take,
        valiedatedTakeSkip.data.skip
      );
      return res.json(links);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
);

export default router;
