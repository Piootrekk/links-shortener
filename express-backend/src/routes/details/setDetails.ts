import { Router, Request, Response } from "express";
import uap from "ua-parser-js";
import { getHashPassword, getShortUrl } from "../../supabase/db/links/getLinks";
import { compareHash } from "../../utils/cryptPassword";
import { config } from "dotenv";
import { getGetDetails } from "../../services/geoService";
import {
  setDetails,
  TDetailsInsert,
} from "../../supabase/db/details/insertDetails";
const router = Router();
config();

const publicIp = process.env.MY_PUBLIC_IP;

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
    return res.status(400).json({ message: "No short URL provided" });
  }
  try {
    const hashedPassword = await getHashPassword(short_url);
    if (!hashedPassword) {
      return res.status(404).json({ message: "Short url not found" });
    }
    if (hashedPassword?.password === null) {
      res.json({
        success: true,
        original_url: hashedPassword.original_url,
      });
    } else {
      const validate = await compareHash(password, hashedPassword.password);
      if (!validate) {
        return res.status(400).json({ message: "Invalid password" });
      }
      res.json({
        success: true,
        original_url: hashedPassword.original_url,
      });
    }

    const { ua, ipGeoDetails } = await parseShadyAnalytics(req);
    const dataToDetails: TDetailsInsert = {
      city: ipGeoDetails.city,
      country: ipGeoDetails.country,
      latitude: ipGeoDetails.lat,
      longitude: ipGeoDetails.lon,
      user_agent: ua.ua,
      browser: ua.browser.name,
      os: ua.os.name,
      device_type: ua.device.type === undefined ? "Desktop" : ua.device.type,
      cpu: ua.cpu.architecture,
      ip: ipGeoDetails.query,
      device:
        ua.device.vendor && ua.device.model
          ? `${ua.device.vendor} ${ua.device.model}`
          : undefined,
      isp: ipGeoDetails.isp,
    };

    const data = await setDetails(short_url, dataToDetails);
    console.log(data);
  } catch (error) {
    return res.status(500).json(error || "Internal server error");
  }
});

const parseShadyAnalytics = async (req: Request) => {
  const ip =
    req.socket.remoteAddress ||
    req.ip ||
    req.headers["x-forwarded-for"] ||
    req.headers["cf-connecting-ip"] ||
    req.headers["x-real-ip"];
  let ipForParse = ip! as string;
  if (ip === "::1" && publicIp !== undefined) {
    ipForParse = publicIp;
  } else ipForParse = ip! as string;

  const userAgent = req.headers["user-agent"];
  const ua = uap(userAgent);
  const ipGeoDetails = await getGetDetails(ipForParse);
  return { ua, ipGeoDetails };
};

export default router;
