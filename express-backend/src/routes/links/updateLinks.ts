import { Router, Request, Response } from "express";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { updateUrl } from "../../supabase/db/links/updateLinks";
import { updateRouteSchema } from "../../schemas/querySchema";
import { getZodErrors } from "../../utils/getZodErrors";
const router = Router();

router.put("/link", authMiddleware, async (req: Request, res: Response) => {
  const { id, title, orginal_url, short_url } = req.body;
  const parsed = updateRouteSchema.safeParse({
    id,
    orginal_url,
    title,
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
    const updatedLink = await updateUrl(
      user.id,
      parsed.data.id,
      parsed.data.orginal_url,
      parsed.data.title,
      parsed.data.short_url
    );
    res.json(updatedLink);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
