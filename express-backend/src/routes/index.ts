import { Router } from "express";
import authRoutes from "./auth";
import getsRoutes from "./gets";
import updateRoutes from "./update";
import deleteRoutes from "./delete";
import createRoutes from "./inserts";
import statisticsRoutes from "./statistics";
const router = Router();

router.use("/", authRoutes);
router.use("/", getsRoutes);
router.use("/", updateRoutes);
router.use("/", deleteRoutes);
router.use("/", createRoutes);
router.use("/", statisticsRoutes);

router.get("/*", (_, res) => {
  res.status(404).json({ message: "Not Found" });
});

export default router;
