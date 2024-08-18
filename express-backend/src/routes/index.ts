import { Router } from "express";
import authRoute from "./auth";

const router = Router();
router.use("/", authRoute);

export default router;
