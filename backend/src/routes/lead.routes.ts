import { Router } from "express";
import {
  createLead,
  deleteLead,
  getLeadById,
  getLeads,
  updateLeadStatus,
} from "../controllers/lead.controller";
import { protect } from "../middlewares/auth.middleware";

const router = Router();

router.post("/leads", createLead);

router.get("/leads", protect, getLeads);
router.get("/leads/:id", protect, getLeadById);
router.put("/leads/:id/status", protect, updateLeadStatus);
router.delete("/leads/:id", protect, deleteLead);

export default router;
