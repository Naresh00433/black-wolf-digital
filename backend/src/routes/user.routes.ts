import { Router } from "express";

import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  toggleUserStatus,
} from "../controllers/user.controller";

import { protect } from "../middlewares/auth.middleware";
import { allowRoles } from "../middlewares/role.middleware";

const router = Router();

router.get("/users", protect, allowRoles("SUPER_ADMIN"), getUsers);

router.post("/users", protect, allowRoles("SUPER_ADMIN"), createUser);

router.put("/users/:id", protect, allowRoles("SUPER_ADMIN"), updateUser);

router.delete("/users/:id", protect, allowRoles("SUPER_ADMIN"), deleteUser);

router.patch(
  "/users/:id/status",
  protect,
  allowRoles("SUPER_ADMIN"),
  toggleUserStatus,
);

export default router;
