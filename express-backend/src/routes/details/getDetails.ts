import { Router, Request, Response } from "express";
import { authMiddleware } from "../../middlewares/authMiddleware";
import uap from "ua-parser-js";
const router = Router();

router.get("/redirect", async (req: Request, res: Response) => {
  const ip = req.socket.remoteAddress;
  const ip2 = req.headers["x-real-ip"] || req.headers["x-forwarded-for"];
  const ip3 = req.headers["cf-connecting-ip"];
  const ip4 = req.ip;
  const userAgent = req.headers["user-agent"];
  const ua = uap(userAgent);
  res.json({
    ip: {
      ip,
      ip2,
      ip3,
      ip4,
    },
    ua,
  });
});

export default router;
