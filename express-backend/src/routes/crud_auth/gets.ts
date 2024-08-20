import { Router, Request, Response } from "express";
import { getLinks } from "../../supabase/db/selects";
import { User } from "@supabase/supabase-js";

const router = Router();

router.get("/links", async (req: Request, res: Response) => {
  const user = req.user as User;
  try {
    const links = await getLinks(user.id);
    res.json(links);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

export default router;
