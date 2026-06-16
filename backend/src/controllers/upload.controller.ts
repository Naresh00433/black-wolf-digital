import { Request, Response } from "express";

export const uploadImage = (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No image uploaded",
    });
  }

  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

  return res.status(201).json({
    success: true,
    message: "Image uploaded successfully",
    imageUrl,
  });
};
