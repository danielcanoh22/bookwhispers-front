import { BASE_URL } from "@/utils/constants";
import * as SecureStore from "expo-secure-store";

type SearchParams = {
  title?: string;
  subject?: string;
};

export const searchBooks = async (params: SearchParams) => {
  const token = await SecureStore.getItemAsync("userToken");

  if (!token) throw new Error("Usuario no autenticado.");

  const queryParams = new URLSearchParams();

  if (params.title) {
    queryParams.append("title", params.title);
  } else if (params.subject) {
    queryParams.append("subject", params.subject);
  }

  if (!params.title && !params.subject) {
    return [];
  }

  const response = await fetch(`${BASE_URL}/search?${queryParams.toString()}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error("Error al realizar la búsqueda.");
  }

  return response.json();
};
