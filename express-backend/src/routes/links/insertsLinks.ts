import { Router, Request, Response } from "express";
import { authMiddleware } from "../../middlewares/authMiddleware";
import {
  insertAnonymouslySchema,
  insertRouteSchema,
} from "../../schemas/querySchema";
import { getZodErrors } from "../../utils/getZodErrors";
import {
  insertUrl,
  insertUrlAnonymously,
} from "../../supabase/db/links/insertLinks";
import limitLinksMiddleware from "../../middlewares/validateUserLimit";
const router = Router();
router.post(
  "/link",
  authMiddleware,
  limitLinksMiddleware,
  async (req: Request, res: Response) => {
    const { title, orginal_url, short_url } = req.body;
    const parsed = insertRouteSchema.safeParse({
      title,
      orginal_url,
      short_url,
    });
    if (!parsed.success) {
      const errors = getZodErrors(parsed.error.errors);
      return res.status(400).json(errors);
    }
    const user = req.user;
    if (!user) {
      return res.status(400).json({
        message: "Unauthorized or invalid credentialsr invalid credentials",
      });
    }
    try {
      const insertedLink = await insertUrl(
        parsed.data.orginal_url,
        parsed.data.short_url,
        parsed.data.title,
        user.id
      );
      return res.json(insertedLink);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
);

router.post("link-anon"),
  async (req: Request, res: Response) => {
    const { orginal_url, short_url } = req.body;
    const parsed = insertAnonymouslySchema.safeParse({
      orginal_url,
      short_url,
    });
    if (!parsed.success) {
      const errors = getZodErrors(parsed.error.errors);
      return res.status(400).json(errors);
    }
    try {
      const insertedLink = await insertUrlAnonymously(
        parsed.data.orginal_url,
        parsed.data.short_url
      );
      return res.json(insertedLink);
    } catch (error) {
      return res.status(500).json(error);
    }
  };

export default router;
