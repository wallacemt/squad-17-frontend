"use client";
import { useState, useCallback } from "react";
import { useAuthContext } from "@/context/authContext";
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
import { getCheckInfo, postRegisterUser, postUserLogin, postVerifyCode, postResendCode } from "@/services/authService";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

export function useAuth() {
  const { login, isAuthenticated, isLoading: contextLoading, user, session, logout, updateUser } = useAuthContext();

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [pendingEmail, setPendingEmail] = useState<string>("");
  const [passForAfterRegister, setPassForAfterRegister] = useState<string>("");
  // Prevenir fechamento da aba durante loading
  const handleBeforeUnload = useCallback(
    (e: BeforeUnloadEvent) => {
      if (isLoading) {
        e.preventDefault();
        e.returnValue = "Existem operações em andamento. Tem certeza que deseja sair?";
        return e.returnValue;
      }
    },
    [isLoading]
  );

  // Adicionar listener de beforeunload
  if (typeof window !== "undefined") {
    if (isLoading) {
      window.addEventListener("beforeunload", handleBeforeUnload);
    } else {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    }
  }

  const setMode = (newMode: AuthMode, email?: string) => {
    if (email) {
      setPendingEmail(email);
    }
    router.push(`/auth?mode=${newMode}`);
  };

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
      login(response.token, response.refreshToken, userData);
      toast.success(response.message);
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
    if (provider === "google") {
      setIsLoading(true);
      const data = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
        fetchOptions: { onSuccess: () => setIsLoading(false), onError: () => setIsLoading(false) },
      });
      console.log(data);
    }
  };

  return {
    handleCheckNickname,
    handleLogin,
    handleOTPVerification,
    isLoading: isLoading || contextLoading,
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
  };
}
