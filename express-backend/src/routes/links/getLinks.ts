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
    return res.status(400).json({ message: "Unauthorized or invalid credentials" });
  }
  try {
    const links = await getPersonalLinks(user.id);
    res.json(links);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get(
  "/links-range",
  authMiddleware,
  async (req: Request, res: Response) => {
    const { min, max } = req.query;
    const minMax = {
      min: parseInt(min as string),
      max: parseInt(max as string),
    };
    const validatedminMax = querySchema.safeParse(minMax);
    if (!validatedminMax.success) {
      const errors = getZodErrors(validatedminMax.error.errors);
      return res.status(400).json(errors);
    }
    const user = req.user;
    if (!user) {
      return res.status(400).json({ message: "Unauthorized or invalid credentials" });
    }
    try {
      const links = getPrersonalLinksRange(
        user.id,
        validatedminMax.data.min,
        validatedminMax.data.max
      );
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

export default router;
