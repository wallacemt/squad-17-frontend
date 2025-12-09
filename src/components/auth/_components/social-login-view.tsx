"use client";
import { motion } from "framer-motion";
import { ArrowLeft, Shield } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthButton } from "@/components/ui/auth-button";
import { SocialLoginButtons } from "@/components/ui/social-login-buttons";

import type { OAuthProvider } from "@/types/auth";

interface SocialLoginViewProps {
  onProviderClick: (provider: OAuthProvider) => void;
  onBack: () => void;
  isLoading?: boolean;
}

export function SocialLoginView({ onProviderClick, onBack, isLoading = false }: SocialLoginViewProps) {
  const allProviders: OAuthProvider[] = ["google", "github", "discord", "figma", "reddit", "apple"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full space-y-6  p-2 overflow-x-hidden"
    >
      {/* Header com Logo */}
      <div className="space-y-4">
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold text-text-primary mb-2">Escolha sua conta</h1>
          <p className="text-text-secondary">Acesse rapidamente com sua conta favorita</p>
        </div>
      </div>

      {/* Social Login Options */}
      <Card className="border-border-color bg-bg-surface/50 backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-text-primary">
            <Shield className="h-5 w-5 text-color-primary" />
            Métodos de Login Social
          </CardTitle>
          <CardDescription>Rápido, seguro e sem necessidade de criar nova senha</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <SocialLoginButtons onProviderClick={onProviderClick} isLoading={isLoading} providers={allProviders} />
        </CardContent>
      </Card>

      {/* Security Info */}
      <Card className="border-border-color/50 bg-bg-surface/30 p-2">
        <CardContent>
          <div className="flex items-center gap-3 text-sm text-text-secondary">
            <Shield className="h-5 w-5 text-color-success flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-text-primary mb-1">Sua privacidade está protegida</p>
              <p className="text-xs">
                Usamos OAuth 2.0 para garantir que suas credenciais nunca sejam compartilhadas. Apenas seu nome e email
                serão utilizados.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Back Button */}
      <AuthButton variant="ghost" size="md" fullWidth onClick={onBack} icon={<ArrowLeft className="h-5 w-5" />}>
        Voltar ao login
      </AuthButton>
    </motion.div>
  );
}
