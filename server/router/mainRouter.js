import { Router } from "express";
import { getAdmin, getCount, getLogs, isAuth, loginUser, logoutUser, updateCount, updateLogs } from "../controllers/main.js";
const router = Router();

// UNPROTECTED ROUTES **************************************************
router.post("/login", loginUser);



// PROTECTED ROUTES ****************************************************
router.use(isAuth);

// GENERAL
router.get("/get-admin", getAdmin);
router.get("/logout", logoutUser);

// COUNT
router.get('/count/get', getCount);
router.post('/count/update', updateCount);

// LOGS
router.get('/logs/get', getLogs);
router.post('/logs/update', updateLogs);

// DEFAULT
router.get("/", (req, res) => {
  return res
    .status(200)
    .json({ message: 'AUTHORIZED'});
});

export default router;
