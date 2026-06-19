import { Router } from "express";
import { getMe, login, changePassword } from "../controllers/auth.controller";
import { protect } from "../middlewares/auth.middleware";


const router = Router();

router.post("/auth/change-password", protect, changePassword);
router.post("/auth/login", login);
router.get("/auth/me", protect, getMe);

export default router;
