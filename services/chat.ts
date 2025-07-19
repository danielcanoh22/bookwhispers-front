import * as SecureStore from "expo-secure-store";

const BASE_URL = "http://192.168.20.31:3000";

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
