import { Request, Response } from "express";
import prisma from "../config/prisma";

const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

export const createBlog = async (req: Request, res: Response) => {
  try {
    const {
      title,
      shortDescription,
      content,
      featuredImage,
      category,
      tags,
      metaTitle,
      metaDescription,
      status,
    } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required",
      });
    }

    let slug = generateSlug(title);

    const existingBlog = await prisma.blog.findUnique({
      where: {
        slug,
      },
    });

    if (existingBlog) {
      slug = `${slug}-${Date.now()}`;
    }

    const blog = await prisma.blog.create({
      data: {
        title,
        slug,
        shortDescription,
        content,
        featuredImage,
        category,
        tags,
        metaTitle,
        metaDescription,
        status: status || "draft",
      },
    });

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create blog",
      error,
    });
  }
};

export const getPublishedBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await prisma.blog.findMany({
      where: {
        status: "published",
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      success: true,
      blogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch blogs",
      error,
    });
  }
};

export const getAdminBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      success: true,
      blogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch admin blogs",
      error,
    });
  }
};

export const getBlogBySlug = async (req: Request, res: Response) => {
  try {
    const slug = String(req.params.slug);

    const blog = await prisma.blog.findUnique({
      where: {
        slug,
      },
    });

    if (!blog || blog.status !== "published") {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.status(200).json({
      success: true,
      blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch blog",
      error,
    });
  }
};

export const updateBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const {
      title,
      shortDescription,
      content,
      featuredImage,
      category,
      tags,
      metaTitle,
      metaDescription,
      status,
    } = req.body;

    const existingBlog = await prisma.blog.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!existingBlog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    let slug = existingBlog.slug;

    if (title && title !== existingBlog.title) {
      slug = generateSlug(title);

      const slugExists = await prisma.blog.findUnique({
        where: {
          slug,
        },
      });

      if (slugExists && slugExists.id !== Number(id)) {
        slug = `${slug}-${Date.now()}`;
      }
    }

    const updatedBlog = await prisma.blog.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        slug,
        shortDescription,
        content,
        featuredImage,
        category,
        tags,
        metaTitle,
        metaDescription,
        status,
      },
    });

    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      blog: updatedBlog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update blog",
      error,
    });
  }
};

export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const existingBlog = await prisma.blog.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!existingBlog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    await prisma.blog.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete blog",
      error,
    });
  }
};
