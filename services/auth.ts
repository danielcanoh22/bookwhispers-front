import { AuthLoginResponse } from "@/types/auth";
import { User } from "@/types/global";
import { BASE_URL } from "@/utils/constants";

export async function registerUser(data: User) {
  try {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("Ha ocurrido un error");

    return response.json();
  } catch (error) {
    throw error;
  }
}

export async function loginUser(credentials: {
  usernameOrEmail: string;
  password: string;
}) {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error("Credenciales inválidas");
    }

    const user: AuthLoginResponse = await response.json();

    return user;
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    throw error;
  }
}
