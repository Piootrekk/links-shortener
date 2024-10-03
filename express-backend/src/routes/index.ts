import { Router } from "express";
import authRoutes from "./auth";
import linksRoutes from "./links";
import detailsRoutes from "./details";
import statisticsRoutes from "./statistics";
const router = Router();

router.use("/", authRoutes);
router.use("/", linksRoutes);
router.use("/", detailsRoutes);
router.use("/", statisticsRoutes);

router.get("/*", (_, res) => {
  res.status(404).json({ message: "Not Found" });
});

export default router;
