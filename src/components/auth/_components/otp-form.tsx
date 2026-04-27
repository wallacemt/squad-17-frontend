"use client";

import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";
import { AuthButton } from "@/components/ui/auth-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import type { OTPVerification } from "@/types/auth";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface OTPFormProps {
  email: string;
  type: "email-verification" | "password-reset";
  onSubmit: (data: OTPVerification) => Promise<void>;
  onResend: (email: string) => Promise<void>;
  onBack: () => void;
  isLoading?: boolean;
}

export function OTPForm({
  email,
  type,
  onSubmit,
  onResend,
  isLoading = false,
}: OTPFormProps) {
  const [code, setCode] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [resendTimer, setResendTimer] = useState(60);
  const router = useRouter();

  useEffect(() => {
    if (!email) {
      router.push("/auth?mode=login");
    }
  }, [email, router.push]);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (code.length !== 6) {
      setError("Por favor, insira o código completo");
      return;
    }

    try {
      await onSubmit({ email, code, type });
      // Sucesso é tratado no useAuth com toast e redirect
    } catch (err) {
      setError("Código inválido. Tente novamente.");
      console.error("OTP verification error:", err);
      // Error já é tratado no useAuth com toast
    }
  };

  const handleResend = async () => {
    if (resendTimer > 0) {
      return;
    }

    try {
      await onResend(email);
      setResendTimer(60);
      setCode("");
      setError("");
      // Sucesso é tratado no useAuth com toast
    } catch (err) {
      console.error("Resend error:", err);
      // Error já é tratado no useAuth com toast
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <Card className="border-color bg-surface-light-crx/50 backdrop-blur-sm">
        <CardHeader className="space-y-4 pb-6">
          {/* Header */}
          <div className="space-y-3 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-crx/20">
              <Mail className="h-8 w-8 text-color-primary" />
            </div>
            <CardTitle className="font-bold font-display text-3xl text-text-primary">
              Verificar código
            </CardTitle>
            <CardDescription className="text-text-secondary">
              {type === "email-verification"
                ? "Enviamos um código de 6 dígitos para"
                : "Enviamos um código de recuperação para"}
            </CardDescription>
            <p className="font-semibold text-color-primary">{email}</p>
          </div>
        </CardHeader>

        <CardContent>
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={code}
                onChange={(value) => {
                  setCode(value);
                  setError("");
                }}
                disabled={isLoading}
                aria-invalid={!!error}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSeparator />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            {!!error && (
              <p className="text-center text-sm text-danger-crx">{error}</p>
            )}

            <AuthButton
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              disabled={isLoading}
              isLoading={isLoading}
              icon={<ArrowRight className="h-5 w-5" />}
            >
              Verificar código
            </AuthButton>

            {/* Resend */}
            <div className="text-center">
              <p className="text-sm text-text-secondary-crx">
                Não recebeu o código?{" "}
                {resendTimer > 0 ? (
                  <span className="font-semibold text-text-muted">
                    Reenviar em {resendTimer}s
                  </span>
                ) : (
                  <Button
                    type="button"
                    onClick={handleResend}
                    disabled={isLoading}
                    variant={"ghost"}
                    className="font-semibold cursor-pointer text-primary-crx hover:text-primary-hover-crx transition-colors"
                  >
                    Reenviar código
                  </Button>
                )}
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
