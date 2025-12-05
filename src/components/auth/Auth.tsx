"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthCarousel } from "@/components/ui/auth-carousel";
import { LoginForm } from "@/components/auth/_components/login-form";
import { RegisterForm } from "@/components/auth/_components/register-form";
import { OTPForm } from "@/components/auth/_components/otp-form";
import { ForgotPasswordForm } from "@/components/auth/_components/forgot-password-form";
import { ResetPasswordForm } from "@/components/auth/_components/reset-password-form";
import { SocialLoginView } from "@/components/auth/_components/social-login-view";
import { useAuth } from "@/hooks/useAuth";
import { useApi } from "@/hooks/useApi";
import type {
  AuthMode,
  LoginCredentials,
  OAuthProvider,
  OTPVerification,
  RegisterStep1Data,
  RegisterStep2Data,
  ForgotPasswordData,
  ResetPasswordData,
} from "@/types/auth";
import { motion } from "framer-motion";
import Image from "next/image";
import { Logo } from "../ui/logo";

const carouselImages = [
  {
    src: "https://image.tmdb.org/t/p/original/3V4kLQg0kSqPLctI5ziYWabAZYF.jpg",
    alt: "Cinema",
    title: "Descubra",
    subtitle: "Explore milhares de filmes e séries",
  },
  {
    src: "https://image.tmdb.org/t/p/original/yDHYTfA3R0jFYba16jBB1ef8oIt.jpg",
    alt: "Reviews",
    title: "Avalie",
    subtitle: "Compartilhe suas opiniões e críticas",
  },
  {
    src: "https://image.tmdb.org/t/p/original/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    alt: "Community",
    title: "Conecte",
    subtitle: "Faça parte da comunidade",
  },
];

interface AuthPageProps {
  mode: "login" | "register" | "otp" | "password" | "reset-password" | "forgot-password" | "social";
  resetToken?: string;
}
export default function AuthPage({ mode, resetToken }: AuthPageProps) {
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();
  const api = useApi();
  const [isLoading, setIsLoading] = useState(false);
  const [pendingEmail, setPendingEmail] = useState<string>("");

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const setMode = (newMode: AuthMode, email?: string) => {
    if (email) setPendingEmail(email);
    router.push(`/auth?mode=${newMode}`);
  };

  const handleLogin = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual Better Auth implementation
      const response = await api.post<{ user: any; accessToken: string; refreshToken: string }>(
        "/auth/login",
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
      const response = await api.post<{ user: any; accessToken: string; refreshToken: string }>(
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

  return (
    <div className="relative flex bg-body-crx h-svh  ">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-body-crx via-surface-crx to-body-crx" />

      <div className="relative z-10 flex  w-full">
        {/* Right side - Carousel */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden h-full w-1/2  lg:block"
        >
          <AuthCarousel images={carouselImages} autoPlayInterval={6000} />
        </motion.div>

        {/*  Left side - Auth Forms */}
        <div className="flex w-full relative items-center justify-center lg:w-1/2 overflow-y-auto ">
          <Logo variant="compact" className="absolute left-1/2 top-1/2  -translate-x-1/2 -translate-y-1/2 opacity-60" />
          <div className="w-full max-w-lg flex flex-col items-center max-h-full p-0 md:p-3">
            {mode === "login" && (
              <LoginForm
                onSubmit={handleLogin}
                onSocialLogin={handleSocialLogin}
                onForgotPassword={() => setMode("forgot-password")}
                onRegister={() => setMode("register")}
                onViewAllSocialLogins={() => setMode("social")}
                isLoading={isLoading}
              />
            )}

            {mode === "social" && (
              <SocialLoginView onProviderClick={handleSocialLogin} onBack={() => setMode("login")} />
            )}

            {mode === "register" && (
              <RegisterForm
                onSubmit={handleRegister}
                onLogin={() => setMode("login")}
                onCheckNickname={handleCheckNickname}
                isLoading={isLoading}
              />
            )}

            {mode === "otp" && (
              <OTPForm
                email={pendingEmail}
                type="email-verification"
                onSubmit={handleOTPVerification}
                onResend={handleResendOTP}
                onBack={() => setMode("register")}
                isLoading={isLoading}
              />
            )}

            {mode === "forgot-password" && (
              <ForgotPasswordForm
                onSubmit={handleForgotPassword}
                onBack={() => setMode("login")}
                isLoading={isLoading}
              />
            )}

            {mode === "reset-password" && resetToken && (
              <ResetPasswordForm token={resetToken} onSubmit={handleResetPassword} isLoading={isLoading} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
