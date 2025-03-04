import { Router } from "express";
import authRoutes from "./auth";
import linksRoutes from "./links";
import detailsRoutes from "./details";
import statisticsRoutes from "./stats";
import fileRoutes from "./files";
import adminDashboard from "./admin";

const router = Router();

router.use("/", authRoutes);
router.use("/", fileRoutes);
router.use("/", linksRoutes);
router.use("/", detailsRoutes);
router.use("/", statisticsRoutes);
router.use("/", fileRoutes);
router.use("/", adminDashboard);

export default router;
