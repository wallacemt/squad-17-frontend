"use client";

import * as React from "react";
import { Github, Chrome, MessageCircle, Figma, ExternalLink, Apple } from "lucide-react";
import { AuthButton } from "./auth-button";
import type { OAuthProvider } from "@/types/auth";

const providerConfig: Record<OAuthProvider, { name: string; icon: React.ReactNode; color: string }> = {
  google: {
    name: "Google",
    icon: <Chrome className="h-5 w-5" />,
    color: "hover:bg-[#4285F4]/10 hover:border-[#4285F4]",
  },
  github: {
    name: "GitHub",
    icon: <Github className="h-5 w-5" />,
    color: "hover:bg-white/10 hover:border-white",
  },
  discord: {
    name: "Discord",
    icon: <MessageCircle className="h-5 w-5" />,
    color: "hover:bg-[#5865F2]/10 hover:border-[#5865F2]",
  },
  figma: {
    name: "Figma",
    icon: <Figma className="h-5 w-5" />,
    color: "hover:bg-[#F24E1E]/10 hover:border-[#F24E1E]",
  },
  reddit: {
    name: "Reddit",
    icon: <ExternalLink className="h-5 w-5" />,
    color: "hover:bg-[#FF4500]/10 hover:border-[#FF4500]",
  },
  apple: {
    name: "Apple",
    icon: <Apple className="h-5 w-5" />,
    color: "hover:bg-white/10 hover:border-white",
  },
};

interface SocialLoginButtonsProps {
  onProviderClick: (provider: OAuthProvider) => void;
  isLoading?: boolean;
  providers?: OAuthProvider[];
}

export function SocialLoginButtons({
  onProviderClick,
  isLoading = false,
  providers = ["google", "github"],
}: SocialLoginButtonsProps) {
  return (
    <div className="space-y-3">
      {providers.map((provider) => {
        const config = providerConfig[provider];
        return (
          <AuthButton
            key={provider}
            variant="secondary"
            size="md"
            fullWidth
            onClick={() => onProviderClick(provider)}
            disabled={isLoading}
            className={config.color}
            icon={config.icon}
          >
            Continuar com {config.name}
          </AuthButton>
        );
      })}
    </div>
  );
}
