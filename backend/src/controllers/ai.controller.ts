import { Request, Response } from "express";
import genAI from "../config/gemini";
import wolfSystemPrompt from "../prompts/wolf.system";

export const chat = async (req: Request, res: Response) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({
        success: false,
        message: "Messages are required",
      });
    }

    const conversation = messages
      .map((msg: any) => `${msg.role}: ${msg.content}`)
      .join("\n");

    const prompt = `
${wolfSystemPrompt}

Conversation:

${conversation}

Assistant:
`;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const result = await model.generateContent(prompt);

    const reply = result.response.text();

    return res.status(200).json({
      success: true,
      reply,
    });
  } catch (error) {
    console.error("Gemini Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate AI response",
    });
  }
};
