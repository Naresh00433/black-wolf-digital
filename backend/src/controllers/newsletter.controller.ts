import { Request, Response } from "express";
import prisma from "../config/prisma";

export const subscribeNewsletter = async (
  req: Request,
  res: Response
) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const existing = await prisma.newsletter.findUnique({
      where: {
        email,
      },
    });

    if (existing) {
      return res.status(200).json({
        success: true,
        message: "You're already subscribed.",
      });
    }

    await prisma.newsletter.create({
      data: {
        email,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Subscribed successfully!",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Subscription failed.",
    });
  }
};