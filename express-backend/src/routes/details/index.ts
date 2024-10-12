import setDetails from "./setDetails";

import { Router } from "express";

const router = Router();

router.use("/", setDetails);

export default router;
