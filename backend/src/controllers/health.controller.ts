import { Request, Response } from "express";

export const healthCheck = (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Black Wolf Digital backend is running with clean architecture",
  });
};
