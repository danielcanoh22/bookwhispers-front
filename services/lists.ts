import * as SecureStore from "expo-secure-store";

const BASE_URL = "https://bookwhispers-back.onrender.com";

type CreateReadingListPayload = {
  name: string;
};

export const createReadingList = async (listData: CreateReadingListPayload) => {
  try {
    const token = await SecureStore.getItemAsync("userToken");

    if (!token) {
      throw new Error("Usuario no autenticado.");
    }

    const response = await fetch(`${BASE_URL}/reading-lists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(listData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "No se pudo crear la lista de lectura"
      );
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};
