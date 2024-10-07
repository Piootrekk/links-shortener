import { Router } from "express";
import getStatistics from "./getStatistics";

const router = Router();
router.use("/", getStatistics);

export default router;
