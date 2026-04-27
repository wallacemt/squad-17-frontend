"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, CheckCircle, AlertCircle, ArrowLeft } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PasswordInput } from "@/components/ui/auth-input";
import { AuthButton } from "@/components/ui/auth-button";
import { PasswordStrengthBar } from "@/components/ui/password-strength-bar";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { toast } from "sonner";
import { postResetPassword } from "@/services/authService";

interface ResetPasswordFormData {
  password: string;
  confirmPassword: string;
}

const jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/;

export function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [formData, setFormData] = useState<ResetPasswordFormData>({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Partial<ResetPasswordFormData>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null);

  // Validate token on mount
  useEffect(() => {
    if (jwtRegex.test(token || "")) {
      setIsValidToken(true);
    } else {
      setIsValidToken(false);
      toast.error("Token de recuperação não encontrado");
    }
  }, [token]);

  const validateForm = (): boolean => {
    const newErrors: Partial<ResetPasswordFormData> = {};

    if (!formData.password) {
      newErrors.password = "Nova senha é obrigatória";
    } else if (formData.password.length < 8) {
      newErrors.password = "Senha deve ter no mínimo 8 caracteres";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirme a nova senha";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!token) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const response = await postResetPassword({
        token,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });

      if (response.success) {
        setIsSuccess(true);
        toast.success("Senha redefinida com sucesso!");

        // Redirect to login after 2 seconds
        setTimeout(() => {
          router.push("/auth?mode=login");
        }, 2000);
      } else {
        toast.error(response.message || "Erro ao redefinir senha");
      }
    } catch (error: unknown) {
      console.error("Reset password error:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Erro ao redefinir senha. Tente novamente.";
      toast.error(
        errorMessage
          .replace("Error: ", "")
          .replace("Erro ao redefinir senha: ", "")
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Invalid token state
  if (isValidToken === false) {
    return (
      <div className="w-full h-2xl flex items-center justify-center bg-bg-body px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="border-color bg-surface-light-crx/50 backdrop-blur-sm">
            <CardHeader className="space-y-4 pb-6">
              <div className="space-y-3 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20">
                  <AlertCircle className="h-8 w-8 text-red-500" />
                </div>
                <CardTitle className="font-bold font-display text-3xl text-text-primary">
                  Link Inválido
                </CardTitle>
                <CardDescription className="text-text-secondary">
                  O link de recuperação de senha é inválido ou expirou. Solicite
                  um novo link de recuperação.
                </CardDescription>
              </div>
            </CardHeader>
            <CardFooter>
              <Link href="/auth?mode=forgot-password" className="w-full">
                <AuthButton type="button" variant="primary" size="lg" fullWidth>
                  Solicitar Novo Link
                </AuthButton>
              </Link>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    );
  }

  // Success state
  if (isSuccess) {
    return (
      <div className="h-full w-2xl flex items-center justify-center bg-bg-body px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <Card className="border-color bg-surface-light-crx/50 backdrop-blur-sm">
            <CardHeader className="space-y-4 pb-6">
              <div className="space-y-3 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
                <CardTitle className="font-bold font-display text-3xl text-text-primary">
                  Senha Redefinida!
                </CardTitle>
                <CardDescription className="text-text-secondary">
                  Sua senha foi redefinida com sucesso. Redirecionando para o
                  login...
                </CardDescription>
              </div>
            </CardHeader>
          </Card>
        </motion.div>
      </div>
    );
  }

  // Reset password form
  return (
    <div className="h-full w-2xl flex items-center justify-center bg-bg-body px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-color bg-surface-light-crx/50 backdrop-blur-sm">
          <CardHeader className="space-y-4 pb-6">
            <div className="space-y-3 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-crx/20">
                <Lock className="h-8 w-8 text-color-primary" />
              </div>
              <CardTitle className="font-bold font-display text-3xl text-text-primary">
                Redefinir Senha
              </CardTitle>
              <CardDescription className="text-text-secondary">
                Crie uma nova senha segura para sua conta
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* New Password */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-text-primary"
                >
                  Nova Senha
                </label>
                <PasswordInput
                  id="password"
                  icon={<Lock className="h-5 w-5" />}
                  placeholder="Digite sua nova senha"
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                    setErrors({ ...errors, password: undefined });
                  }}
                  error={errors.password}
                  disabled={isLoading}
                />
                {formData.password.length > 0 && (
                  <PasswordStrengthBar password={formData.password} />
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium text-text-primary"
                >
                  Confirmar Nova Senha
                </label>
                <PasswordInput
                  id="confirmPassword"
                  icon={<Lock className="h-5 w-5" />}
                  placeholder="Confirme sua nova senha"
                  value={formData.confirmPassword}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    });
                    setErrors({ ...errors, confirmPassword: undefined });
                  }}
                  error={errors.confirmPassword}
                  disabled={isLoading}
                />
              </div>

              {/* Submit Button */}
              <AuthButton
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                isLoading={isLoading}
              >
                Redefinir Senha
              </AuthButton>
            </form>
          </CardContent>

          <CardFooter className="flex-col space-y-4 pt-6">
            <Separator />
            <Link href="/auth?mode=login" className="w-full">
              <AuthButton
                type="button"
                variant="ghost"
                size="md"
                disabled={isLoading}
                fullWidth
                icon={<ArrowLeft className="h-5 w-5" />}
              >
                Voltar ao Login
              </AuthButton>
            </Link>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
