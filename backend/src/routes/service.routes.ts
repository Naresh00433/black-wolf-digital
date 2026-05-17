import { Router } from "express";
import {
  createService,
  deleteService,
  getActiveServices,
  getAdminServices,
  getServiceBySlug,
  updateService,
} from "../controllers/service.controller";
import { protect } from "../middlewares/auth.middleware";

const router = Router();

router.get("/services", getActiveServices);
router.get("/services/admin", protect, getAdminServices);
router.get("/services/:slug", getServiceBySlug);

router.post("/services", protect, createService);
router.put("/services/:id", protect, updateService);
router.delete("/services/:id", protect, deleteService);

export default router;
