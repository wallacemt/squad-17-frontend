"use client";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, PasswordInput } from "@/components/ui/auth-input";
import { AuthButton } from "@/components/ui/auth-button";
import { Separator } from "@/components/ui/separator";
import type { LoginCredentials, OAuthProvider } from "@/types/auth";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { useLoginFormCache } from "@/hooks/useAuthCache";
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
  const formCache = useLoginFormCache();
  const [formData, setFormData] = useState<LoginCredentials>({
    emailOrUsername: formCache.data.email,
    password: formCache.data.password,
    rememberMe: formCache.data.rememberMe,
  });

  const [errors, setErrors] = useState<Partial<LoginCredentials>>({});
  const saveTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Sync form data to cache (debounced to avoid excessive saves)
  useEffect(() => {
    if (!formCache.isLoaded) return;

    // Clear previous timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Debounce save to 1 second after last change
    saveTimeoutRef.current = setTimeout(() => {
      formCache.saveToCache({
        email: formData.emailOrUsername,
        password: formData.password,
        rememberMe: formData.rememberMe ?? false,
      });
    }, 1000);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [formData, formCache.isLoaded, formCache.saveToCache]);

  // Show notification if cached data was loaded
  useEffect(() => {
    if (formCache.isLoaded && formCache.hasCachedData()) {
      console.log("Dados de login restaurados");
    }
  }, [formCache.isLoaded, formCache.hasCachedData]);

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
    if (!validateForm()) {
      return;
    }

    try {
      await onSubmit(formData);
      // Clear cache after successful login
      formCache.clearCache();
    } catch (error) {
      console.error("Login error:", error);
      // Error já é tratado no useAuth com toast
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full space-y-6 "
    >
      {/* Logo */}

      {/* Main Card */}
      <Card className="border-border-color itnc bg-surface-crx/50 backdrop-blur py-2">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-display text-center text-primary">Bem-vindo de volta</CardTitle>
          <CardDescription className="text-center text-primary-crx">
            Entre com suas credenciais para continuar
          </CardDescription>
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
            icon={<FcGoogle />}
          >
            Continuar com Google
          </AuthButton>

          {/* Ver mais métodos */}
          <Button
            variant={"ghost"}
            onClick={onViewAllSocialLogins}
            className="w-full flex items-center cursor-pointer hover:underline hover:scale-105  justify-center gap-2 text-sm hover:text-primary-hover-crx transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            Ver todos os métodos de login
          </Button>

          {/* Divider */}

          <div className="flex items-center my-2 xl:text-lg text-gray-400">
            <div className="flex-grow border-t border-gray-400" />
            <span className="mx-2 text-sm text-primary-hover-crx">ou continue com email</span>
            <div className="flex-grow border-t border-gray-400" />
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
            <Button
              onClick={onRegister}
              variant={"ghost"}
              className="font-semibold text-color-primary hover:text-color-primary-hover transition-colors"
            >
              Criar conta gratuitamente
            </Button>
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
