import { Router } from "express";
import authRoutes from "./auth";
import getsRoutes from "./crud_auth/gets";
import updateRoutes from "./crud_auth/update";
import deleteRoutes from "./crud_auth/delete";
import createRoutes from "./crud_auth/inserts";

import authenticateUser from "../middlewares/loggedIn";
const router = Router();
router.use("/", authRoutes);
router.use("/", authenticateUser, getsRoutes);
router.use("/", authenticateUser, updateRoutes);
router.use("/", authenticateUser, deleteRoutes);
router.use("/", authenticateUser, createRoutes);

export default router;
