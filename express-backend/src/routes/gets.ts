import { Router, Request, Response } from "express";
import isLoggedAuth from "../middlewares/loggedIn";
import { getAllAuthroized } from "../supabase/db/selects";
import { User } from "@supabase/supabase-js";

const router = Router();

router.get("/links", isLoggedAuth, async (req: Request, res: Response) => {
  const user = req.user as User;
  const links = await getAllAuthroized(user.id);
  res.json(links);
});

export default router;
