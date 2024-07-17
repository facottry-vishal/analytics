import { Router } from "express";
import { updateLogs } from "../controllers/b2b.js";
const router = Router();

router.post("/update-logs", updateLogs);

export default router;