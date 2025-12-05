"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight, ArrowLeft } from "lucide-react";
import { AuthButton } from "@/components/ui/auth-button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Logo } from "@/components/ui/logo";
import type { OTPVerification } from "@/types/auth";

interface OTPFormProps {
  email: string;
  type: "email-verification" | "password-reset";
  onSubmit: (data: OTPVerification) => Promise<void>;
  onResend: () => Promise<void>;
  onBack: () => void;
  isLoading?: boolean;
}

export function OTPForm({ email, type, onSubmit, onResend, onBack, isLoading = false }: OTPFormProps) {
  const [code, setCode] = React.useState<string[]>(["", "", "", "", "", ""]);
  const [error, setError] = React.useState<string>("");
  const [resendTimer, setResendTimer] = React.useState(60);
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  React.useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);
    setError("");

    // Auto focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newCode = [...code];
    pastedData.split("").forEach((char, index) => {
      if (index < 6) newCode[index] = char;
    });
    setCode(newCode);

    const nextEmptyIndex = newCode.findIndex((c) => !c);
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus();
    } else {
      inputRefs.current[5]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const codeString = code.join("");

    if (codeString.length !== 6) {
      setError("Por favor, insira o código completo");
      return;
    }

    try {
      await onSubmit({ email, code: codeString, type });
    } catch (error) {
      setError("Código inválido. Tente novamente.");
      console.error("OTP verification error:", error);
    }
  };

  const handleResend = async () => {
    if (resendTimer > 0) return;

    try {
      await onResend();
      setResendTimer(60);
      setCode(["", "", "", "", "", ""]);
      setError("");
      inputRefs.current[0]?.focus();
    } catch (error) {
      console.error("Resend error:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <Card className="border-border-color bg-bg-surface-light/50 backdrop-blur-sm">
        <CardHeader className="space-y-4 pb-6">
         

          {/* Header */}
          <div className="space-y-3 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-color-primary/20">
              <Mail className="h-8 w-8 text-color-primary" />
            </div>
            <CardTitle className="font-bold font-display text-3xl text-text-primary">Verificar código</CardTitle>
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
            <div className="flex justify-center gap-3">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  disabled={isLoading}
                  className={`h-14 w-12 rounded-xl border bg-bg-surface-light text-center font-bold text-2xl text-text-primary transition-all duration-200 ${
                    error
                      ? "border-color-danger focus:border-color-danger focus:ring-color-danger/20"
                      : "border-border-color focus:border-color-primary focus:ring-color-primary/20"
                  } focus:outline-none focus:ring-2 disabled:opacity-50`}
                />
              ))}
            </div>

            {error && <p className="text-center text-sm text-color-danger">{error}</p>}

            <AuthButton
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              isLoading={isLoading}
              icon={<ArrowRight className="h-5 w-5" />}
            >
              Verificar código
            </AuthButton>

            {/* Resend */}
            <div className="text-center">
              <p className="text-sm text-text-secondary">
                Não recebeu o código?{" "}
                {resendTimer > 0 ? (
                  <span className="font-semibold text-text-muted">Reenviar em {resendTimer}s</span>
                ) : (
                  <button
                    type="button"
                    onClick={handleResend}
                    className="font-semibold text-color-primary hover:text-color-primary-hover transition-colors"
                  >
                    Reenviar código
                  </button>
                )}
              </p>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex-col space-y-4 pt-6">
          <Separator />
          {/* Back button */}
          <AuthButton
            type="button"
            variant="ghost"
            size="md"
            fullWidth
            onClick={onBack}
            icon={<ArrowLeft className="h-5 w-5" />}
          >
            Voltar
          </AuthButton>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
