"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, PasswordInput } from "@/components/ui/auth-input";
import { AuthButton } from "@/components/ui/auth-button";
import { Separator } from "@/components/ui/separator";
import { Logo } from "@/components/ui/logo";
import type { LoginCredentials, OAuthProvider } from "@/types/auth";

interface LoginFormProps {
  onSubmit: (data: LoginCredentials) => Promise<void>;
  onSocialLogin: (provider: OAuthProvider) => void;
  onViewAllSocialLogins: () => void;
  onForgotPassword: () => void;
  onRegister: () => void;
  isLoading?: boolean;
}

export function LoginForm({
  onSubmit,
  onSocialLogin,
  onViewAllSocialLogins,
  onForgotPassword,
  onRegister,
  isLoading = false,
}: LoginFormProps) {
  const [formData, setFormData] = React.useState<LoginCredentials>({
    emailOrUsername: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = React.useState<Partial<LoginCredentials>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<LoginCredentials> = {};

    if (!formData.emailOrUsername.trim()) {
      newErrors.emailOrUsername = "Email ou usuário é obrigatório";
    }

    if (!formData.password) {
      newErrors.password = "Senha é obrigatória";
    } else if (formData.password.length < 6) {
      newErrors.password = "Senha deve ter no mínimo 6 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full space-y-6"
    >
      {/* Logo */}

      {/* Main Card */}
      <Card className="border-border-color itnc bg-surface-crx/50 backdrop-blur">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-display text-center text-primary">Bem-vindo de volta</CardTitle>
          <CardDescription className="text-center text-primary-crx">Entre com suas credenciais para continuar</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Google Login Button */}
          <AuthButton
            variant="secondary"
            size="lg"
            fullWidth
            onClick={() => onSocialLogin("google")}
            disabled={isLoading}
            className="hover:bg-[#4285F4]/10 hover:border-[#4285F4]"
            icon={
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            }
          >
            Continuar com Google
          </AuthButton>

          {/* Ver mais métodos */}
          <button
            onClick={onViewAllSocialLogins}
            className="w-full flex items-center cursor-pointer hover:underline hover:scale-105  justify-center gap-2 text-sm hover:text-primary-hover-crx transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            Ver todos os métodos de login
          </button>

          {/* Divider */}

          <div className="flex items-center my-2 xl:text-lg text-gray-400">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="mx-2 text-sm text-primary-hover-crx">ou continue com email</span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-primary-crx">
                Email ou usuário
              </label>
              <Input
                id="email"
                type="text"
                placeholder="seu@email.com ou @usuario"
                value={formData.emailOrUsername}
                onChange={(e) => setFormData({ ...formData, emailOrUsername: e.target.value })}
                error={errors.emailOrUsername}
                icon={<Mail className="h-5 w-5" />}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium text-primary-crx">
                  Senha
                </label>
                <button
                  type="button"
                  onClick={onForgotPassword}
                  className="text-sm text-primary-crx hover:underline cursor-pointer hover:text-primary-hover-crx transition-colors"
                >
                  Esqueceu?
                </button>
              </div>
              <PasswordInput
                id="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                error={errors.password}
                icon={<Lock className="h-5 w-5" />}
                disabled={isLoading}
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                id="remember"
                type="checkbox"
                checked={formData.rememberMe}
                onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                className="h-4 w-4 rounded border-border-color bg-surface-light-crx text-primary-crx focus:ring-2 focus:ring-color-primary/20 focus:ring-offset-0"
              />
              <label htmlFor="remember" className="text-sm text-text-secondary cursor-pointer">
                Manter-me conectado
              </label>
            </div>

            <AuthButton
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              isLoading={isLoading}
              icon={<ArrowRight className="h-5 w-5" />}
            >
              Entrar
            </AuthButton>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <Separator className="bg-border-color" />
          <div className="text-center text-sm text-text-secondary">
            Não tem uma conta?{" "}
            <button
              onClick={onRegister}
              className="font-semibold text-color-primary hover:text-color-primary-hover transition-colors"
            >
              Criar conta gratuitamente
            </button>
          </div>
        </CardFooter>
        {/* Security Badge */}
        <div className="flex items-center justify-center gap-2 text-xs text-text-muted">
          <Lock className="h-3 w-3" />
          <span>Conexão segura e criptografada</span>
        </div>
      </Card>
    </motion.div>
  );
}
