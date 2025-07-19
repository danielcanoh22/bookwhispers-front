import * as SecureStore from "expo-secure-store";
import { Book } from "@/types/global";

const BASE_URL = "http://192.168.20.31:3000";

export const getUserFavorites = async (): Promise<Book[]> => {
  const token = await SecureStore.getItemAsync("userToken");

  if (!token) throw new Error("Usuario no autenticado.");

  const response = await fetch(`${BASE_URL}/favorites`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("No se pudieron obtener los favoritos.");
  }
  return response.json();
};

export const addFavoriteBook = async (bookData: Book) => {
  const token = await SecureStore.getItemAsync("userToken");

  if (!token) throw new Error("Usuario no autenticado.");

  const response = await fetch(`${BASE_URL}/favorites`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bookData),
  });

  console.log("Data: ", bookData);
  console.log("Response: ", response);

  if (!response.ok) {
    throw new Error("No se pudo agregar el libro a favoritos.");
  }
  return response.json();
};

export const removeFavoriteBook = async (bookId: string) => {
  const token = await SecureStore.getItemAsync("userToken");

  if (!token) throw new Error("Usuario no autenticado.");

  const response = await fetch(`${BASE_URL}/favorites/${bookId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("No se pudo eliminar el libro de favoritos.");
  }

  return { success: true };
};
