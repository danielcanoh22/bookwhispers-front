import { Review } from "@/types/global";
import * as SecureStore from "expo-secure-store";

const BASE_URL = "http://192.168.20.31:3000";

type CreateReviewPayload = {
  text: string;
  bookId: string;
};

export const createReview = async (payload: CreateReviewPayload) => {
  const token = await SecureStore.getItemAsync("userToken");

  if (!token) throw new Error("Usuario no autenticado.");

  const response = await fetch(`${BASE_URL}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("No se pudo publicar la reseña.");
  }
  return response.json();
};

export const getReviewsForBook = async (bookId: string): Promise<Review[]> => {
  const token = await SecureStore.getItemAsync("userToken");

  if (!token) throw new Error("Usuario no autenticado.");

  const response = await fetch(`${BASE_URL}/reviews/book/${bookId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("No se pudieron obtener las reseñas.");
  }
  return response.json();
};

export const deleteReview = async (reviewId: string) => {
  const token = await SecureStore.getItemAsync("userToken");

  if (!token) throw new Error("Usuario no autenticado.");

  const response = await fetch(`${BASE_URL}/reviews/${reviewId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("No se pudo eliminar la reseña.");
  }

  return { success: true };
};
