//biome-ignore-all lint: "necessary"
"use client";
import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";
import Cookies from "js-cookie";
import type { AuthSession, User } from "@/types/auth";
import { clearEncryptionSalt } from "@/utils/clientHash";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import AppLayout from "@/components/app/AppLayout";

type AuthContextType = {
  session: AuthSession | null;
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (accessToken: string, refreshToken?: string, user?: User) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  refreshSession: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const route = useRouter();
  const pathName = usePathname();
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

            // Set cookies if they don't exist
            if (!Cookies.get("critix.auth-token")) {
              const expiresInDays = (parsedSession.expiresAt - Date.now()) / (1000 * 60 * 60 * 24);

              Cookies.set("critix.auth-token", parsedSession.accessToken, {
                expires: expiresInDays,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
              });

              if (parsedSession.refreshToken) {
                Cookies.set("critix.refresh-token", parsedSession.refreshToken, {
                  expires: expiresInDays,
                  secure: process.env.NODE_ENV === "production",
                  sameSite: "lax",
                });
              }
            }
          } else {
            // Session expired - clean up
            localStorage.removeItem("auth_session");
            Cookies.remove("critix.auth-token");
            Cookies.remove("critix.refresh-token");
          }
        }
      } catch (error) {
        console.error("Failed to load session:", error);
        localStorage.removeItem("auth_session");
        Cookies.remove("critix.auth-token");
        Cookies.remove("critix.refresh-token");
      } finally {
        setIsLoading(false);
      }
    };

    loadSession();
  }, []);

  const login = useCallback(
    (accessToken: string, refreshToken?: string, user?: User) => {
      const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

      const newSession: AuthSession = {
        user: user || session?.user!,
        accessToken,
        refreshToken,
        expiresAt,
      };

      // Save to state and localStorage
      setSession(newSession);
      localStorage.setItem("auth_session", JSON.stringify(newSession));

      // Save to cookies (for middleware access)
      Cookies.set("critix.auth-token", accessToken, {
        expires: 7, // 7 days
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });

      if (refreshToken) {
        Cookies.set("critix.refresh-token", refreshToken, {
          expires: 7, // 7 days
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
        });
      }
    },
    [session]
  );

  const logout = useCallback(() => {
    localStorage.clear();
    authClient.signOut();
    // Remove cookies
    Cookies.remove(`${process.env.NODE_ENV === "production" ? "__Secure-" : ""}critix.session_token`);
    Cookies.remove("critix.auth-token");
    Cookies.remove("critix.refresh-token");
    Cookies.remove("critix.state");

    // Clear encryption salt to ensure new key on next login
    clearEncryptionSalt();
    setSession(null);
    route.push("/lending");
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
      {!!session && !pathName.endsWith("/lending") ? <AppLayout>{children}</AppLayout> : <>{children}</>}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
