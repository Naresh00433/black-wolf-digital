import { Router } from "express";
import { dbCheck } from "../controllers/db.controller";

const router = Router();

router.get("/db-check", dbCheck);

export default router;
