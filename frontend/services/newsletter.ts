import { API_URL } from "@/lib/api";

export async function subscribeNewsletter(email: string) {
  const res = await fetch(`${API_URL}/newsletter`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
  });

  return res.json();
}