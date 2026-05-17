import { Router } from "express";
import {
  createBlog,
  deleteBlog,
  getAdminBlogs,
  getBlogBySlug,
  getPublishedBlogs,
  updateBlog,
} from "../controllers/blog.controller";
import { protect } from "../middlewares/auth.middleware";

const router = Router();

router.get("/blogs", getPublishedBlogs);
router.get("/blogs/admin", protect, getAdminBlogs);
router.get("/blogs/:slug", getBlogBySlug);

router.post("/blogs", protect, createBlog);
router.put("/blogs/:id", protect, updateBlog);
router.delete("/blogs/:id", protect, deleteBlog);

export default router;
