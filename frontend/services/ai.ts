const API_URL = process.env.NEXT_PUBLIC_API_URL;

import { AIMessage } from "@/types/ai";

export async function sendToAI(messages: AIMessage[]) {
  const res = await fetch(`${API_URL}/ai/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ messages }),
  });

  const data = await res.json();

  if (!data.success) {
    throw new Error(data.message);
  }

  return data.reply;
}