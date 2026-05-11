import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Role = "student" | "admin";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  setSession: (user: AuthUser, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setSession: (user, token) => {
        if (typeof window !== "undefined") {
          localStorage.setItem("sdt_token", token);
        }
        set({ user, token, isAuthenticated: true });
      },
      logout: () => {
        if (typeof window !== "undefined") {
          localStorage.removeItem("sdt_token");
        }
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    { name: "sdt-auth" },
  ),
);
