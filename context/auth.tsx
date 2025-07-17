import * as SecureStore from "expo-secure-store";
import { loginUser } from "@/services/auth";
import { AuthLoginResponse } from "@/types/auth";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  currentUser: AuthLoginResponse | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: {
    usernameOrEmail: string;
    password: string;
  }) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<AuthLoginResponse | null>(
    null
  );
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      try {
        const token = await SecureStore.getItemAsync("userToken");
        if (token) {
          setIsAuthenticated(true);

          const userString = await SecureStore.getItemAsync("userData");
          if (userString) setCurrentUser(JSON.parse(userString));
        }
      } catch (e) {
        console.error("No se pudo cargar el token", e);
      } finally {
        setIsLoading(false);
      }
    };

    loadToken();
  }, []);

  const login = async (credentials: {
    usernameOrEmail: string;
    password: string;
  }) => {
    try {
      const response = await loginUser(credentials);

      await SecureStore.setItemAsync("userToken", response.token);
      await SecureStore.setItemAsync("userData", JSON.stringify(response.user));

      setIsAuthenticated(true);
      setCurrentUser(response);
    } catch (error) {
      setIsAuthenticated(false);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync("userToken");
      await SecureStore.deleteItemAsync("userData");
    } catch (error) {
      throw error;
    } finally {
      setCurrentUser(null);
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, currentUser, isLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
