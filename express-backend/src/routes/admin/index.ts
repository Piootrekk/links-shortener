import { Router } from "express";
import adminDashboard from "./admindashboard";

const router = Router();
router.use("/", adminDashboard);

export default router;
