import setDetails from "./setDetails";
import getDetails from "./getDetails";

import { Router } from "express";

const router = Router();

router.use("/", setDetails);
router.use("/", getDetails);

export default router;
