import deleteLinks from "./deleteLinks";
import getLinks from "./getLinks";
import insertLinks from "./insertsLinks";
import updateLinks from "./updateLinks";
import { Router } from "express";

const router = Router();

router.use("/", deleteLinks);
router.use("/", getLinks);
router.use("/", insertLinks);
router.use("/", updateLinks);

export default router;
