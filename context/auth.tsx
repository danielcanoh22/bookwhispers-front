import { loginUser } from "@/services/auth/api";
import { AuthLoginResponse } from "@/types/auth";
import { createContext, useContext, useState } from "react";

type AuthContextType = {
  currentUser: AuthLoginResponse | null;
  isAuthenticated: boolean;
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

  const login = async (credentials: {
    usernameOrEmail: string;
    password: string;
  }) => {
    try {
      const user = await loginUser(credentials);
      setIsAuthenticated(true);
      setCurrentUser(user);
    } catch (error) {
      setIsAuthenticated(false);
      throw error;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, currentUser, login, logout }}
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
