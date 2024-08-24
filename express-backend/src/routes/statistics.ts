import { Router, Request, Response } from "express";
import uap from "ua-parser-js";
const router = Router();

router.get("/stats", async (req: Request, res: Response) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const userAgent = req.headers["user-agent"];
  const ua = uap(userAgent);
  res.json({ ip, ua });
});

export default router;
