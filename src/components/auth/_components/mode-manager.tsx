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
import { useAuth } from "@/hooks/useAuth";
import { SocialLoginView } from "./social-login-view";
import { useAuthModeCache } from "@/hooks/useAuthCache";
import type { TMDBTrendingPostersResponse } from "@/types/tmdb";
import { ResetPasswordContent } from "./reset-password";

interface ModeManagerProps {
  mode: "login" | "register" | "otp" | "password" | "reset-password" | "forgot-password" | "social";
  posters: TMDBTrendingPostersResponse[];
  resetToken?: string;
}
export function ModeManager({ posters, mode }: ModeManagerProps) {
  const router = useRouter();
  const modeCache = useAuthModeCache();
  const {
    isLoading,
    isAuthenticated,
    handleCheckNickname,
    handleLogin,
    handleOTPVerification,
    handleRegister,
    setMode,
    handleResendOTP,
    handleSocialLogin,
    pendingEmail,
  } = useAuth();

  // Save visited mode to cache
  useEffect(() => {
    if (modeCache.isLoaded) {
      modeCache.saveToCache({
        mode,
      });
    }
  }, [mode, modeCache.isLoaded, modeCache.saveToCache]);

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
        <div className="w-full max-w-lg flex flex-col items-center max-h-full mt-4 md:p-3">
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

          {mode === "forgot-password" && <ForgotPasswordForm onBack={() => setMode("login")} isLoading={isLoading} />}
          {mode === "reset-password" && <ResetPasswordContent />}
        </div>
      </div>
    </div>
  );
}
