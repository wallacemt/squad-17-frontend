"use client";
import { motion } from "framer-motion";
import { Lock, CheckCircle } from "lucide-react";
import { PasswordInput } from "@/components/ui/auth-input";
import { AuthButton } from "@/components/ui/auth-button";
import { PasswordStrengthBar } from "@/components/ui/password-strength-bar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/ui/logo";
import type { ResetPasswordData } from "@/types/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface ResetPasswordFormProps  {
  token: string;
  onSubmit: (data: ResetPasswordData) => Promise<void>;
  isLoading?: boolean;
};

export function ResetPasswordForm({ token, onSubmit, isLoading = false }: ResetPasswordFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string }>({});
  const [success, setSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    if (!formData.password) {
      newErrors.password = "Senha é obrigatória";
    } else if (formData.password.length < 8) {
      newErrors.password = "Senha deve ter no mínimo 8 caracteres";
    }

    if (formData.password !== formData.confirmPassword) {
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

    try {
      await onSubmit({ token, ...formData });
      setSuccess(true);
    } catch (error) {
      setErrors({ password: "Erro ao redefinir senha. Token pode ter expirado." });
      console.error("Reset password error:", error);
    }
  };

  if (success) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full">
        <Card className="border-border-color bg-bg-surface-light/50 backdrop-blur-sm">
          <CardHeader className="space-y-4 pb-6">
            <div className="flex justify-center">
              <Logo variant="default" />
            </div>
            <div className="space-y-3 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-color-success/20">
                <CheckCircle className="h-8 w-8 text-color-success" />
              </div>
              <CardTitle className="font-bold font-display text-3xl text-text-primary">Senha redefinida!</CardTitle>
              <CardDescription className="text-text-secondary">
                Sua senha foi alterada com sucesso. Agora você pode fazer login com a nova senha.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <AuthButton
              type="button"
              variant="primary"
              size="lg"
              fullWidth
              onClick={() => router.push("/auth?mode=login")}
            >
              Ir para login
            </AuthButton>
          </CardContent>
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
          <div className="flex justify-center">
            <Logo variant="default" />
          </div>
          <div className="space-y-2 text-center">
            <CardTitle className="font-bold font-display text-3xl text-text-primary">Nova senha</CardTitle>
            <CardDescription className="text-text-secondary">Digite sua nova senha abaixo</CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <PasswordInput
                placeholder="Nova senha"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                error={errors.password}
                icon={<Lock className="h-5 w-5" />}
                disabled={isLoading}
                autoFocus
              />
              <PasswordStrengthBar password={formData.password} />
            </div>

            <PasswordInput
              placeholder="Confirmar nova senha"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              error={errors.confirmPassword}
              icon={<Lock className="h-5 w-5" />}
              disabled={isLoading}
            />

            <AuthButton type="submit" variant="primary" size="lg" fullWidth isLoading={isLoading}>
              Redefinir senha
            </AuthButton>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
