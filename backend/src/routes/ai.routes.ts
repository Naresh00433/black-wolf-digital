import { Router } from "express";
import { chat } from "../controllers/ai.controller";

const router = Router();

router.post("/ai/chat", chat);

export default router;