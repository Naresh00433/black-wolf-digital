import { Request, Response } from "express";
import prisma from "../config/prisma";

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const [
      totalBlogs,
      publishedBlogs,
      draftBlogs,
      totalServices,
      activeServices,
      totalLeads,
      newLeads,
      contactedLeads,
      convertedLeads,
    ] = await Promise.all([
      prisma.blog.count(),
      prisma.blog.count({
        where: {
          status: "published",
        },
      }),
      prisma.blog.count({
        where: {
          status: "draft",
        },
      }),
      prisma.service.count(),
      prisma.service.count({
        where: {
          status: "active",
        },
      }),
      prisma.lead.count(),
      prisma.lead.count({
        where: {
          status: "new",
        },
      }),
      prisma.lead.count({
        where: {
          status: "contacted",
        },
      }),
      prisma.lead.count({
        where: {
          status: "converted",
        },
      }),
    ]);

    res.status(200).json({
      success: true,
      stats: {
        blogs: {
          total: totalBlogs,
          published: publishedBlogs,
          draft: draftBlogs,
        },
        services: {
          total: totalServices,
          active: activeServices,
        },
        leads: {
          total: totalLeads,
          new: newLeads,
          contacted: contactedLeads,
          converted: convertedLeads,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard stats",
      error,
    });
  }
};
