"use client";
import { useAuthContext } from "@/context/authContext";
import { useState } from "react";
import { useApi } from "./useApi";
import type {
  AuthMode,
  ForgotPasswordData,
  LoginCredentials,
  OAuthProvider,
  OTPVerification,
  RegisterStep1Data,
  RegisterStep2Data,
  ResetPasswordData,
  User,
} from "@/types/auth";
import { useRouter } from "next/navigation";

export function useAuth() {
  const { login, isAuthenticated, isLoading: contextLoading, user, session, logout, updateUser } = useAuthContext();
  const api = useApi();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [pendingEmail, setPendingEmail] = useState<string>("");

  const setMode = (newMode: AuthMode, email?: string) => {
    if (email) {
      setPendingEmail(email);
    }
    router.push(`/auth?mode=${newMode}`);
  };

  const handleLogin = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual Better Auth implementation
      const response = await api.post<{ user: User; accessToken: string; refreshToken: string }>(
        "/auth?mode=login",
        credentials,
        { skipAuth: true }
      );

      login(response.accessToken, response.refreshToken, response.user);
      router.push("/");
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (data: RegisterStep1Data & RegisterStep2Data) => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual Better Auth implementation
      await api.post("/auth/register", data, { skipAuth: true });

      setPendingEmail(data.email);
      setMode("otp", data.email);
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPVerification = async (data: OTPVerification) => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual Better Auth implementation
      const response = await api.post<{ user: User; accessToken: string; refreshToken: string }>(
        "/auth/verify-otp",
        data,
        { skipAuth: true }
      );

      if (data.type === "email-verification") {
        // Auto login after email verification
        login(response.accessToken, response.refreshToken, response.user);
        router.push("/");
      } else {
        // Redirect to reset password
        setMode("reset-password");
      }
    } catch (error) {
      console.error("OTP verification failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      await api.post("/auth/resend-otp", { email: pendingEmail }, { skipAuth: true });
    } catch (error) {
      console.error("Resend OTP failed:", error);
      throw error;
    }
  };

  const handleCheckNickname = async (nickname: string): Promise<boolean> => {
    try {
      const response = await api.get<{ available: boolean }>(`/auth/check-nickname?nickname=${nickname}`, {
        skipAuth: true,
      });
      return response.available;
    } catch (error) {
      console.error("Nickname check failed:", error);
      return false;
    }
  };

  const handleSocialLogin = (provider: OAuthProvider) => {
    // TODO: Implement Better Auth OAuth flow
    const oauthUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/oauth/${provider}`;
    window.location.href = oauthUrl;
  };

  const handleForgotPassword = async (data: ForgotPasswordData) => {
    try {
      await api.post("/auth/forgot-password", data, { skipAuth: true });
    } catch (error) {
      console.error("Forgot password failed:", error);
      throw error;
    }
  };

  const handleResetPassword = async (data: ResetPasswordData) => {
    setIsLoading(true);
    try {
      await api.post("/auth/reset-password", data, { skipAuth: true });
    } catch (error) {
      console.error("Reset password failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleCheckNickname,
    handleForgotPassword,
    handleLogin,
    handleOTPVerification,
    handleResetPassword,
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
