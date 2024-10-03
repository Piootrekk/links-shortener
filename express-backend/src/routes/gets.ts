import { Router, Request, Response } from "express";
import { getLinks, userLinksWithInfo } from "../supabase/db/selects";
import { User } from "@supabase/supabase-js";
import { getLinksNotAuthInfo, getEveryLinks } from "../supabase/db/statistics";
import { authMiddleware } from "../middlewares/loggedIn";
import { downloadFile } from "../supabase/files";

const router = Router();

router.get(
  "/user-links-old",
  authMiddleware,
  async (req: Request, res: Response) => {
    const user = req.user as User;
    try {
      const links = await getLinks(user.id);

      res.json(links);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
);

router.get("/home-info", async (req, res) => {
  try {
    const notAuthLinks = await getLinksNotAuthInfo();
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

router.get("/user-links", authMiddleware, async (req, res) => {
  const user = req.user as User;
  try {
    const data = await userLinksWithInfo(user.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.post("/download-png", authMiddleware, async (req, res) => {
  try {
    const { qrPath } = req.body;
    if (!qrPath) {
      return res.status(400).json({ error: "Missing data" });
    }
    const fileStream = await downloadFile(qrPath);
    res.setHeader("Content-Disposition", `attachment; filename=${qrPath}`);
    res.setHeader("Content-Type", "image/png");
    fileStream.pipe(res);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

export default router;
