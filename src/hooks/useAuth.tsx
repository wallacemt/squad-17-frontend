"use client";

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";
import type { AuthSession, User } from "@/types/auth";

interface AuthContextType {
  session: AuthSession | null;
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (accessToken: string, refreshToken?: string, user?: User) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load session from localStorage on mount
  useEffect(() => {
    const loadSession = () => {
      try {
        const storedSession = localStorage.getItem("auth_session");
        if (storedSession) {
          const parsedSession: AuthSession = JSON.parse(storedSession);

          // Check if session is expired
          if (parsedSession.expiresAt > Date.now()) {
            setSession(parsedSession);
          } else {
            localStorage.removeItem("auth_session");
          }
        }
      } catch (error) {
        console.error("Failed to load session:", error);
        localStorage.removeItem("auth_session");
      } finally {
        setIsLoading(false);
      }
    };

    loadSession();
  }, []);

  const login = useCallback(
    (accessToken: string, refreshToken?: string, user?: User) => {
      const newSession: AuthSession = {
        user: user || session?.user!,
        accessToken,
        refreshToken,
        expiresAt: Date.now() + 3600000, // 1 hour
      };

      setSession(newSession);
      localStorage.setItem("auth_session", JSON.stringify(newSession));
    },
    [session]
  );

  const logout = useCallback(() => {
    setSession(null);
    localStorage.removeItem("auth_session");
  }, []);

  const updateUser = useCallback(
    (userData: Partial<User>) => {
      if (!session) return;

      const updatedSession: AuthSession = {
        ...session,
        user: { ...session.user, ...userData },
      };

      setSession(updatedSession);
      localStorage.setItem("auth_session", JSON.stringify(updatedSession));
    },
    [session]
  );

  const refreshSession = useCallback(async () => {
    if (!session?.refreshToken) {
      logout();
      return;
    }

    try {
      // TODO: Implement refresh token API call
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken: session.refreshToken }),
      });

      if (!response.ok) throw new Error("Failed to refresh session");

      const { accessToken, refreshToken } = await response.json();
      login(accessToken, refreshToken);
    } catch (error) {
      console.error("Failed to refresh session:", error);
      logout();
    }
  }, [session, login, logout]);

  // Auto refresh session when close to expiration
  useEffect(() => {
    if (!session) return;

    const timeUntilExpiry = session.expiresAt - Date.now();
    const refreshThreshold = 5 * 60 * 1000; // 5 minutes

    if (timeUntilExpiry <= refreshThreshold) {
      refreshSession();
      return;
    }

    const timeout = setTimeout(() => {
      refreshSession();
    }, timeUntilExpiry - refreshThreshold);

    return () => clearTimeout(timeout);
  }, [session, refreshSession]);

  return (
    <AuthContext.Provider
      value={{
        session,
        user: session?.user || null,
        isLoading,
        isAuthenticated: !!session,
        login,
        logout,
        updateUser,
        refreshSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
