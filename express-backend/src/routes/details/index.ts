import getDetails from "./getDetails";

import { Router } from "express";

const router = Router();

router.use("/", getDetails);

export default router;
