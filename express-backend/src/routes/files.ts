import { Router } from "express";
import { downloadFile } from "../supabase/files";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/download-png", authMiddleware, async (req, res) => {
  try {
    const { qrPath } = req.body;
    if (!qrPath) {
      return res.status(400).json({ error: "Missing data" });
    }
    const fileStream = await downloadFile(qrPath);
    res.setHeader("Content-Disposition", `attachment; filename=${qrPath}`);
    res.setHeader("Content-Type", "image/png");
    fileStream.pipe(res);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

export default router;
