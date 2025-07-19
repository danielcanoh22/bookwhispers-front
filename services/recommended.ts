import { BASE_URL } from "@/utils/constants";
import * as SecureStore from "expo-secure-store";

export const getRecommendedBooks = async () => {
  try {
    const token = await SecureStore.getItemAsync("userToken");

    if (!token) {
      throw new Error("No se encontró el token de autenticación.");
    }

    const response = await fetch(`${BASE_URL}/recommend/for-you`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Error al obtener las recomendaciones"
      );
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};
