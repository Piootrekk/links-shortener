import { Router, Request, Response } from "express";
import { getLinks } from "../supabase/db/selects";
import { User } from "@supabase/supabase-js";
import { getLinksNotAuthInfo, getEveryLinks } from "../supabase/db/selects";
import authenticateUser from "../middlewares/loggedIn";
const router = Router();

router.get("/links", authenticateUser, async (req: Request, res: Response) => {
  const user = req.user as User;
  try {
    const links = await getLinks(user.id);
    res.json(links);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/home-info", async (req, res) => {
  try {
    const notAuthLinks = await getLinksNotAuthInfo();
    console.log(notAuthLinks);
    res.json(notAuthLinks);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/get-all", async (req, res) => {
  try {
    const notAuthLinks = await getEveryLinks();
    res.json(notAuthLinks);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

export default router;
