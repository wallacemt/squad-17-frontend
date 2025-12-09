"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { AuthCarousel } from "@/components/ui/auth-carousel";
import { Logo } from "@/components/ui/logo";
import { LoginForm } from "./login-form";
import { RegisterForm } from "./register-form";
import { OTPForm } from "./otp-form";
import { ForgotPasswordForm } from "./forgot-password-form";
import { ResetPasswordForm } from "./reset-password-form";
import { useAuth } from "@/hooks/useAuth";
import { SocialLoginView } from "./social-login-view";
import type { TMDBTrendingPostersResponse } from "@/types/tmdb";

interface ModeManagerProps {
  mode: "login" | "register" | "otp" | "password" | "reset-password" | "forgot-password" | "social";
  posters: TMDBTrendingPostersResponse[];
  resetToken?: string;
}
export function ModeManager({ posters, resetToken, mode }: ModeManagerProps) {
  const router = useRouter();
  const {
    isLoading,
    isAuthenticated,
    handleCheckNickname,
    handleForgotPassword,
    handleLogin,
    handleOTPVerification,
    handleRegister,
    setMode,
    handleResendOTP,
    handleResetPassword,
    handleSocialLogin,
    pendingEmail,
  } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);
  return (
    <div className="relative z-10 flex  w-full">
      {/* Right side - Carousel */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden h-full w-1/2  lg:block"
      >
        <AuthCarousel images={posters} autoPlayInterval={8000} />
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

          {mode === "social" && <SocialLoginView onProviderClick={handleSocialLogin} onBack={() => setMode("login")} />}

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
            <ForgotPasswordForm onSubmit={handleForgotPassword} onBack={() => setMode("login")} isLoading={isLoading} />
          )}

          {mode === "reset-password" && resetToken && (
            <ResetPasswordForm token={resetToken} onSubmit={handleResetPassword} isLoading={isLoading} />
          )}
        </div>
      </div>
    </div>
  );
}
