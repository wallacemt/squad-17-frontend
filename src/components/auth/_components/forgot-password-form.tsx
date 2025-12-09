"use client";

import { motion } from "framer-motion";
import { Mail, ArrowRight, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/auth-input";
import { AuthButton } from "@/components/ui/auth-button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { ForgotPasswordData } from "@/types/auth";
import { useState } from "react";

const validateFormRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
interface ForgotPasswordFormProps {
  onSubmit: (data: ForgotPasswordData) => Promise<void>;
  onBack: () => void;
  isLoading?: boolean;
}

export function ForgotPasswordForm({ onSubmit, onBack, isLoading = false }: ForgotPasswordFormProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const validateForm = (): boolean => {
    if (!email.trim()) {
      setError("Email é obrigatório");
      return false;
    }

    if (!validateFormRegex.test(email)) {
      setError("Email inválido");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      await onSubmit({ email });
      setSubmitted(true);
    } catch (err) {
      setError("Erro ao enviar email. Tente novamente.");
      console.error("Forgot password error:", err);
    }
  };

  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full">
        <Card className="border-border-color bg-bg-surface-light/50 backdrop-blur-sm">
          <CardHeader className="space-y-4 pb-6">
            <div className="space-y-3 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-color-success/20">
                <Mail className="h-8 w-8 text-color-success" />
              </div>
              <CardTitle className="font-bold font-display text-3xl text-text-primary">Email enviado!</CardTitle>
              <CardDescription className="text-text-secondary">Enviamos instruções de recuperação para</CardDescription>
              <p className="font-semibold text-color-primary">{email}</p>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-center text-sm text-text-muted">
              Verifique sua caixa de entrada e spam. O link expira em 1 hora.
            </p>
          </CardContent>
          <CardFooter className="flex-col space-y-4 pt-6">
            <Separator />
            <AuthButton
              type="button"
              variant="ghost"
              size="md"
              fullWidth
              onClick={onBack}
              icon={<ArrowLeft className="h-5 w-5" />}
            >
              Voltar ao login
            </AuthButton>
          </CardFooter>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <Card className="border-border-color bg-bg-surface-light/50 backdrop-blur-sm">
        <CardHeader className="space-y-4 pb-6">
          <div className="space-y-2 text-center">
            <CardTitle className="font-bold font-display text-3xl text-text-primary">Esqueceu a senha?</CardTitle>
            <CardDescription className="text-text-secondary">
              Sem problemas! Digite seu email e enviaremos instruções para redefinir sua senha.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={error}
              icon={<Mail className="h-5 w-5" />}
              disabled={isLoading}
              autoFocus
            />

            <AuthButton
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              isLoading={isLoading}
              icon={<ArrowRight className="h-5 w-5" />}
            >
              Enviar instruções
            </AuthButton>
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
            Voltar ao login
          </AuthButton>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
