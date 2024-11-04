import { Router } from "express";
import adminDashboard from "./adminDashboard";

const router = Router();
router.use("/", adminDashboard);

export default router;
