import { Router } from "express";
import authRoutes from "./auth";
import getsRoutes from "./gets";

const router = Router();
router.use("/", authRoutes);
router.use("/", getsRoutes);

export default router;
