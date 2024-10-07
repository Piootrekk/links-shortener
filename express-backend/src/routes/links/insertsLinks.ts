import { Router, Request, Response } from "express";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { insertRouteSchema } from "../../schemas/querySchema";
import { getZodErrors } from "../../utils/getZodErrors";
import { insertUrl } from "../../supabase/db/links/insertLinks";
const router = Router();
router.post("/link", authMiddleware, async (req: Request, res: Response) => {
  const { title, orginal_url, short_url } = req.body;
  const parsed = insertRouteSchema.safeParse({ title, orginal_url, short_url });
  if (!parsed.success) {
    const errors = getZodErrors(parsed.error.errors);
    return res.status(400).json(errors);
  }
  const user = req.user;
  if (!user) {
    return res.status(400).json({ message: "Unauthorized or invalid credentialsr invalid credentials" });
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
});

export default router;
