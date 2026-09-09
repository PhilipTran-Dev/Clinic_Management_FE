import { createContext } from "react";
import type { LoginCredentials, RegisterPayload, User, UserRole } from "../types/auth";

export interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials, role: UserRole) => Promise<User>;
  register: (payload: RegisterPayload) => Promise<User>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);