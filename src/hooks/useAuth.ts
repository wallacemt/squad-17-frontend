"use client";
import { useState, useEffect } from "react";
import { useAuthContext } from "@/context/authContext";
import Cookies from "js-cookie";
import type {
  AuthMode,
  LoginCredentials,
  OAuthProvider,
  OTPVerification,
  RegisterStep1Data,
  RegisterStep2Data,
  User,
} from "@/types/auth";
import { useRouter } from "next/navigation";
import {
  getCheckInfo,
  postRegisterUser,
  postUserLogin,
  postVerifyCode,
  postResendCode,
  postOAuthLogin,
} from "@/services/authService";
import { getOAuthAccessToken } from "@/services/betterAuthService";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

export function useAuth() {
  const { login, isAuthenticated, isLoading: contextLoading, user, session, logout, updateUser } = useAuthContext();

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isOAuthProcessing, setIsOAuthProcessing] = useState(false);
  const [pendingEmail, setPendingEmail] = useState<string>("");
  const [passForAfterRegister, setPassForAfterRegister] = useState<string>("");
  const [currentMode, setCurrentMode] = useState<AuthMode>("login");
  const setMode = (newMode: AuthMode, email?: string) => {
    if (email) {
      setPendingEmail(email);
    }
    router.push(`/auth?mode=${newMode}`);
  };

  // biome-ignore lint/complexity: Esta função precisa lidar com múltiplos cenários de login (OAuth, tradicional, verificação de email)
  const handleLogin = async (credentials: LoginCredentials, clearCache?: () => void) => {
    setIsLoading(true);
    try {
      const { email, password } = {
        email: credentials.emailOrUsername,
        password: credentials.password,
      };

      const response = await postUserLogin({ email, password });

      if (!(response.token || response.user)) {
        throw new Error("Resposta inválida do servidor");
      }

      if (!response.user.emailVerified) {
        toast.success("Confirme seu email para poder acessar a plataforma!");
        setPendingEmail(email);
        setPassForAfterRegister(password);
        await handleResendOTP(email);
        return setMode("otp", email);
      }

      if (clearCache) {
        clearCache();
        localStorage.clear();
      }

      // Construir objeto User completo
      const userData: User = {
        id: response.user.id,
        name: response.user.name,
        email: response.user.email,
        emailVerified: response.user.emailVerified,
        profile: response.userProfile,
        createdAt: response.user.createdAt,
      };
      if (response.sessionToken) {
        const cookieName = process.env.NODE_ENV === "production" ? "__Secure-critix.session_token" : "";
        Cookies.set(cookieName, response.sessionToken, {
          expires: 7,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
        });
      }
      login(response.token, response.refreshToken, userData);
      router.push("/");
    } catch (error) {
      console.error("Login failed:", error);
      const errorMessage = error instanceof Error ? error.message : "Erro ao fazer login";
      toast.error(errorMessage.replace("Error: ", "").replace("Erro ao realizar login: ", ""));
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (data: RegisterStep1Data & RegisterStep2Data, clearCache?: () => void) => {
    setIsLoading(true);
    try {
      const res = await postRegisterUser(data);
      if (res) {
        toast.success(res.message);
        setPendingEmail(data.email);
        setPassForAfterRegister(data.password);
        if (clearCache) {
          localStorage.clear();
          clearCache();
        }
        setMode("otp", data.email);
      }
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Erro ao realizar cadastro");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPVerification = async (data: OTPVerification) => {
    setIsLoading(true);
    try {
      const response = await postVerifyCode(data.code, data.email);

      if (response.success) {
        // Redirecionar para login após verificação
        toast.success("Email verificado com sucesso!");
        await handleLogin({ emailOrUsername: data.email, password: passForAfterRegister });
      } else {
        throw new Error(response.message || "Falha na verificação");
      }
    } catch (error) {
      console.error("OTP verification failed:", error);
      const errorMessage = error instanceof Error ? error.message : "Código inválido";
      toast.error(errorMessage.replace("Error: ", "").replace("Erro ao verificar codigo usuario: ", ""));
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async (email: string) => {
    if (!email) {
      toast.error("Email não encontrado");
      return;
    }

    setIsLoading(true);
    try {
      const response = await postResendCode(email);

      if (response.success) {
        toast.success("Código reenviado com sucesso!");
      } else {
        throw new Error(response.message || "Falha ao reenviar código");
      }
    } catch (error) {
      console.error("Resend OTP failed:", error);
      const errorMessage = error instanceof Error ? error.message : "Erro ao reenviar código";
      toast.error(errorMessage.replace("Error: ", "").replace("Erro ao verificar codigo usuario: ", ""));
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckNickname = async (nickName: string): Promise<boolean> => {
    try {
      const response = await getCheckInfo({ nickName });
      return response.userNameExists;
    } catch (error) {
      console.error("Nickname check failed:", error);
      return false;
    }
  };

  const handleSocialLogin = async (provider: OAuthProvider) => {
    setIsLoading(true);
    Cookies.set("critix.current.provider", provider);
    await authClient.signIn.social({
      provider,
      callbackURL: "/",
      fetchOptions: {
        onSuccess: () => {
          setIsLoading(false);
          toast.info("Redirecionando...");
        },
        onError: () => setIsLoading(false),
      },
    });
  };

  // Verificar sessão do Better Auth e sincronizar com sua API
  useEffect(() => {
    const processOAuthLogin = async (provider: string, accessToken: string) => {
      setIsOAuthProcessing(true);

      try {
        const response = await postOAuthLogin(provider, accessToken);

        const hasValidResponse = Boolean(response.token && response.user);
        if (!hasValidResponse) {
          throw new Error("Resposta inválida do servidor");
        }

        const userData: User = {
          id: response.user.id,
          name: response.user.name,
          email: response.user.email,
          emailVerified: response.user.emailVerified,
          profile: response.userProfile,
          createdAt: response.user.createdAt,
        };

        login(response.token, response.refreshToken, userData);
        toast.success("Login realizado com sucesso!");
        router.push("/");
      } catch (error) {
        console.error("OAuth sync failed:", error);
        const errorMessage = error instanceof Error ? error.message : "Erro ao sincronizar login";
        toast.error(errorMessage.replace("Error: ", "").replace("Erro ao realizar login OAuth: ", ""));
        await authClient.signOut();
        router.push("/auth?mode=login");
      } finally {
        setIsOAuthProcessing(false);
      }
    };

    const syncOAuthSession = async () => {
      const hasSession = Boolean(session);
      if (hasSession || contextLoading) {
        return;
      }

      try {
        // Buscar accessToken do Better Auth usando o cookie de sessão
        const oauthData = await getOAuthAccessToken();

        if (oauthData) {
          await processOAuthLogin(oauthData.provider, oauthData.accessToken);
        }
      } catch (error) {
        console.error("Failed to sync OAuth session:", error);
        setIsOAuthProcessing(false);
      }
    };
    syncOAuthSession();
  }, [session, contextLoading, login, router]);

  return {
    handleCheckNickname,
    handleLogin,
    handleOTPVerification,
    isLoading: isLoading || contextLoading,
    isOAuthProcessing,
    setIsLoading,
    handleSocialLogin,
    handleResendOTP,
    handleRegister,
    setMode,
    pendingEmail,
    isAuthenticated,
    user,
    session,
    logout,
    updateUser,
    currentMode,
    setCurrentMode,
  };
}
