import { Request, Response, Router } from "express";
import { authMiddleware } from "../../middlewares/authMiddleware";
import {
  getDetails,
  getLinkWithDetailsUnauthorized,
} from "../../supabase/db/details/getDetails";

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
      if (details === null) {
        return res.status(403).json({ message: "Forbidden" });
      }
      const { hidden_details } = details;
      const totalClicks = details.hidden_details.length;
      const uniqueClicks = new Set(
        details.hidden_details.map((item) => item.ip)
      ).size;
      const uniqueCountries = new Set(
        details.hidden_details.map((item) => item.country)
      ).size;
      const uniqueISP = new Set(details.hidden_details.map((item) => item.isp))
        .size;
      const uniqueDevices = new Set(
        details.hidden_details.map((item) => item.device)
      ).size;

      const uniqueBrowsers = new Set(
        details.hidden_details.map((item) => item.browser)
      ).size;
      console.log({
        hidden_details,
        totalClicks,
        uniqueClicks,
        uniqueCountries,
        uniqueISP,
        uniqueDevices,
        uniqueBrowsers,
      });
      return res.json({
        hidden_details,
        totalClicks,
        uniqueClicks,
        uniqueCountries,
        uniqueISP,
        uniqueDevices,
        uniqueBrowsers,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
);

router.get("/get-details-anon/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "No short url provided" });
  }
  try {
    const details = await getLinkWithDetailsUnauthorized(id);
    if (details === null) {
      return res.status(403).json({ message: "Forbidden" });
    }
    const { hidden_details } = details;
    const totalClicks = details.hidden_details.length;
    const uniqueClicks = new Set(details.hidden_details.map((item) => item.ip))
      .size;
    const uniqueCountries = new Set(
      details.hidden_details.map((item) => item.country)
    ).size;
    const uniqueISP = new Set(details.hidden_details.map((item) => item.isp))
      .size;
    const uniqueDevices = new Set(
      details.hidden_details.map((item) => item.device)
    ).size;
    const uniqueBrowsers = new Set(
      details.hidden_details.map((item) => item.browser)
    ).size;
    console.log({
      hidden_details,
      totalClicks,
      uniqueClicks,
      uniqueCountries,
      uniqueISP,
      uniqueDevices,
      uniqueBrowsers,
    });
    return res.json({
      hidden_details,
      totalClicks,
      uniqueClicks,
      uniqueCountries,
      uniqueISP,
      uniqueDevices,
      uniqueBrowsers,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
});

export default router;
