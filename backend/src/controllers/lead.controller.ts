import { Request, Response } from "express";
import prisma from "../config/prisma";

export const createLead = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, company, service, budget, message } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    if (!email && !phone) {
      return res.status(400).json({
        success: false,
        message: "Email or phone is required",
      });
    }

    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        phone,
        company,
        service,
        budget,
        message,
      },
    });

    res.status(201).json({
      success: true,
      message: "Lead submitted successfully",
      lead,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to submit lead",
      error,
    });
  }
};

export const getLeads = async (req: Request, res: Response) => {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      success: true,
      leads,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch leads",
      error,
    });
  }
};

export const getLeadById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const lead = await prisma.lead.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    res.status(200).json({
      success: true,
      lead,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch lead",
      error,
    });
  }
};

export const updateLeadStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = [
      "new",
      "contacted",
      "qualified",
      "converted",
      "rejected",
    ];

    if (!status || !allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message:
          "Valid status is required: new, contacted, qualified, converted, rejected",
      });
    }

    const existingLead = await prisma.lead.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!existingLead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    const updatedLead = await prisma.lead.update({
      where: {
        id: Number(id),
      },
      data: {
        status,
      },
    });

    res.status(200).json({
      success: true,
      message: "Lead status updated successfully",
      lead: updatedLead,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update lead status",
      error,
    });
  }
};

export const deleteLead = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const existingLead = await prisma.lead.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!existingLead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    await prisma.lead.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json({
      success: true,
      message: "Lead deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete lead",
      error,
    });
  }
};
