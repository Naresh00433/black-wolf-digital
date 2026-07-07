import { Router } from "express";
import { subscribeNewsletter } from "../controllers/newsletter.controller";

const router = Router();

router.post("/newsletter", subscribeNewsletter);

export default router;