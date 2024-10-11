import { Router, Request, Response } from "express";
import uap from "ua-parser-js";
import { getShortUrl } from "../../supabase/db/links/getLinks";
const router = Router();

router.get("/redirect/:short_url", async (req: Request, res: Response) => {
  const { short_url } = req.params;
  if (!short_url) {
    return res.status(400).json({ error: "No short url provided" });
  }
  try {
    const checkIfShortUrlExists = await getShortUrl(short_url);
    if (!checkIfShortUrlExists) {
      return res.status(404).json({ error: "Short url not found" });
    }
    res.json({ original_url: checkIfShortUrlExists.original_url });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
  const ip =
    req.socket.remoteAddress ||
    req.ip ||
    req.headers["x-forwarded-for"] ||
    req.headers["cf-connecting-ip"] ||
    req.headers["x-real-ip"];
  const userAgent = req.headers["user-agent"];
  const ua = uap(userAgent);
  console.log(ip, ua);
});

router.get("/redirect", async (req: Request, res: Response) => {
  const ip =
    req.socket.remoteAddress ||
    req.ip ||
    req.headers["x-forwarded-for"] ||
    req.headers["cf-connecting-ip"] ||
    req.headers["x-real-ip"];
  const userAgent = req.headers["user-agent"];
  const ua = uap(userAgent);
  console.log(ip, ua);
  res.json({ ip, ua });
});

export default router;
