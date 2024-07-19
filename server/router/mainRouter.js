import { Router } from "express";
import {
  getAdmin,
  getCount,
  getLogs,
  getUser,
  isAuth,
  loginUser,
  logoutUser,
} from "../controllers/main.js";
const router = Router();

// UNPROTECTED ROUTES **************************************************
router.post("/login", loginUser);

// PROTECTED ROUTES ****************************************************
router.use(isAuth);

// GENERAL
router.get("/get-admin", getAdmin);
router.get("/get-user", getUser);
router.get("/logout", logoutUser);

// COUNT & LOGS
router.post("/get-logs", getLogs);
router.post("/get-count", getCount);

// DEFAULT
router.get("/", (req, res) => {
  return res.status(200).json({ message: "AUTHORIZED" });
});

export default router;
