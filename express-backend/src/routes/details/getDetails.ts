import { Request, Response, Router } from "express";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { getDetails } from "../../supabase/db/details/getDetails";

const router = Router();

router.get(
  "/get-details/:id",
  authMiddleware,
  async (req: Request, res: Response) => {
    const user = req.user;
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "No short url provided" });
    }
    if (!user) {
      return res.status(400).json({
        message: "Unauthorized or invalid credentials",
      });
    }
    try {
      const details = await getDetails(id, user.id);
      console.log(details);
      return res.json(details);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
);

export default router;
