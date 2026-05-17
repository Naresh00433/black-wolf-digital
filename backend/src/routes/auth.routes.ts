import { Router } from "express";
import { getMe, login } from "../controllers/auth.controller";
import { protect } from "../middlewares/auth.middleware";

const router = Router();

router.post("/auth/login", login);
router.get("/auth/me", protect, getMe);

export default router;
