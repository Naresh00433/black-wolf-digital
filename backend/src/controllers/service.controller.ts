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

export const createService = async (req: Request, res: Response) => {
  try {
    const {
      title,
      shortDescription,
      content,
      icon,
      image,
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

    const existingService = await prisma.service.findUnique({
      where: {
        slug,
      },
    });

    if (existingService) {
      slug = `${slug}-${Date.now()}`;
    }

    const service = await prisma.service.create({
      data: {
        title,
        slug,
        shortDescription,
        content,
        icon,
        image,
        metaTitle,
        metaDescription,
        status: status || "active",
      },
    });

    res.status(201).json({
      success: true,
      message: "Service created successfully",
      service,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create service",
      error,
    });
  }
};

export const getActiveServices = async (req: Request, res: Response) => {
  try {
    const services = await prisma.service.findMany({
      where: {
        status: "active",
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      success: true,
      services,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch services",
      error,
    });
  }
};

export const getAdminServices = async (req: Request, res: Response) => {
  try {
    const services = await prisma.service.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      success: true,
      services,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch admin services",
      error,
    });
  }
};

export const getServiceBySlug = async (req: Request, res: Response) => {
  try {
    const slug = String(req.params.slug);

    const service = await prisma.service.findUnique({
      where: {
        slug,
      },
    });

    if (!service || service.status !== "active") {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.status(200).json({
      success: true,
      service,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch service",
      error,
    });
  }
};

export const updateService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const {
      title,
      shortDescription,
      content,
      icon,
      image,
      metaTitle,
      metaDescription,
      status,
    } = req.body;

    const existingService = await prisma.service.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!existingService) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    let slug = existingService.slug;

    if (title && title !== existingService.title) {
      slug = generateSlug(title);

      const slugExists = await prisma.service.findUnique({
        where: {
          slug,
        },
      });

      if (slugExists && slugExists.id !== Number(id)) {
        slug = `${slug}-${Date.now()}`;
      }
    }

    const updatedService = await prisma.service.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        slug,
        shortDescription,
        content,
        icon,
        image,
        metaTitle,
        metaDescription,
        status,
      },
    });

    res.status(200).json({
      success: true,
      message: "Service updated successfully",
      service: updatedService,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update service",
      error,
    });
  }
};

export const deleteService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const existingService = await prisma.service.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!existingService) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    await prisma.service.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete service",
      error,
    });
  }
};
