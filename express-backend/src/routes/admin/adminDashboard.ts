import { Router } from "express";
import { authAsMasterMiddleware } from "../../middlewares/authMiddleware";
import { getAllUsers } from "../../supabase/db/admin/users";
import { getAllLinks } from "../../supabase/db/admin/links";
const router = Router();

router.get("/admin-dashboard", authAsMasterMiddleware, async (req, res) => {
  res.json({ message: "Welcome to the admin dashboard" });
});

router.get(
  "/admin-dashboard/users",
  authAsMasterMiddleware,
  async (req, res) => {
    try {
      console.log;
      const users = await getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }
);

router.get(
  "/admin-dashboard/links",
  authAsMasterMiddleware,
  async (req, res) => {
    try {
      const links = await getAllLinks();
      res.json(links);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }
);

export default router;
