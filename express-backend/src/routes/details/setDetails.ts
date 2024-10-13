import { Router, Request, Response } from "express";
import uap from "ua-parser-js";
import { getHashPassword, getShortUrl } from "../../supabase/db/links/getLinks";
import { compareHash } from "../../utils/cryptPassword";
const router = Router();

router.get("/redirect/:short_url", async (req: Request, res: Response) => {
  const { short_url } = req.params;
  if (!short_url) {
    return res.status(400).json({ message: "No short url provided" });
  }
  try {
    const checkIfShortUrlExists = await getShortUrl(short_url);
    if (!checkIfShortUrlExists) {
      return res.status(404).json({ message: "Short url not found" });
    }
    res.json({
      password: checkIfShortUrlExists.password ? true : false,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/validate-redirect", async (req: Request, res: Response) => {
  const { password, short_url } = req.body;
  if (!short_url) {
    return res
      .status(400)
      .json({ message: "No short URL provided" });
  }
  try {
    const hashedPassword = await getHashPassword(short_url);
    if (!hashedPassword) {
      return res.status(404).json({ message: "Short url not found" });
    }
    if (hashedPassword?.password === null) {
      return res.json({
        success: true,
        original_url: hashedPassword.original_url,
      });
    }
    const validate = await compareHash(password, hashedPassword.password);
    if (!validate) {
      return res.status(400).json({ message: "Invalid password" });
    }
    return res.json({
      success: true,
      original_url: hashedPassword.original_url,
    });
  } catch (error) {
    return res.status(500).json(error || "Internal server error");
  }
});

// const ip =
// req.socket.remoteAddress ||
// req.ip ||
// req.headers["x-forwarded-for"] ||
// req.headers["cf-connecting-ip"] ||
// req.headers["x-real-ip"];
// const userAgent = req.headers["user-agent"];
// const ua = uap(userAgent);
// console.log(ip, ua);

export default router;
