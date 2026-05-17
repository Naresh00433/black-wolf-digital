import { Router } from "express";
import { getDashboardStats } from "../controllers/dashboard.controller";
import { protect } from "../middlewares/auth.middleware";

const router = Router();

router.get("/dashboard/stats", protect, getDashboardStats);

export default router;
