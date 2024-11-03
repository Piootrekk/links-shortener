import { Router } from "express";
import { authAsMasterMiddleware } from "../../middlewares/authMiddleware";
const router = Router();

router.get("/admin-dashboard", authAsMasterMiddleware, async (req, res) => {
  res.json({ message: "Welcome to the admin dashboard" });
});

export default router;
