import { BASE_URL } from "@/utils/constants";
import * as SecureStore from "expo-secure-store";

type ChatHistory = {
  role: "model" | "user";
  text: string;
};

export const sendMessageToAI = async (history: ChatHistory[]) => {
  const token = await SecureStore.getItemAsync("userToken");

  if (!token) throw new Error("Usuario no autenticado.");

  const response = await fetch(`${BASE_URL}/gpt-recommendations/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ history }),
  });

  if (!response.ok) {
    throw new Error("La IA no pudo responder. Intenta de nuevo.");
  }
  return response.json();
};
