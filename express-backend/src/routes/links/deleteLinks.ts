import { Router, Request, Response } from "express";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { deleteRouteSchema } from "../../schemas/querySchema";
import { getZodErrors } from "../../utils/getZodErrors";
import { deleteSelectedUrl } from "../../supabase/db/links/deleteLinks";

const router = Router();

router.delete(
  "/link",
  authMiddleware,
  async (req: Request, res: Response) => {
    const { id, qr_code } = req.body;
    const validatedId = deleteRouteSchema.safeParse({ id, qr_code });
    if (!validatedId.success) {
      const errors = getZodErrors(validatedId.error.errors);
      return res.status(400).json(errors);
    }
    const user = req.user;
    if (!user) {
      return res.status(400).json({ message: "Unauthorized or invalid credentials" });
    }
    try {
      const links = await deleteSelectedUrl(
        validatedId.data.id,
        validatedId.data.qr_code
      );
      return res.json(links);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
);
export default router;
