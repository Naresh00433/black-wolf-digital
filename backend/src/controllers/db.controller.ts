import { Request, Response } from "express";
import prisma from "../config/prisma";

export const dbCheck = async (req: Request, res: Response) => {
  try {
    const userCount = await prisma.user.count();

    res.status(200).json({
      success: true,
      message: "Database connected successfully",
      userCount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Database connection failed",
      error,
    });
  }
};
