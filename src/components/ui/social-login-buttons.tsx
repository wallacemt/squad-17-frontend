"use client";
import { AuthButton } from "./auth-button";
import type { OAuthProvider } from "@/types/auth";
import { FcGoogle } from "react-icons/fc";
import { FaDiscord, FaTwitch, FaTwitter } from "react-icons/fa";
const providerConfig: Record<
  OAuthProvider,
  { name: string; icon: React.ReactNode; color: string }
> = {
  google: {
    name: "Google",
    icon: <FcGoogle className="h-5 w-5" />,
    color: "hover:bg-[#4285F4]/10 hover:border-[#4285F4]",
  },
  twitch: {
    name: "Twitch",
    icon: <FaTwitch className="h-5 w-5" />,
    color: "hover:bg-[#5865F2]/10 hover:border-[#5865F2]",
  },
  discord: {
    name: "Discord",
    icon: <FaDiscord className="h-5 w-5" />,
    color: "hover:bg-[#5865F2]/10 hover:border-[#5865F2]",
  },

  twitter: {
    name: "Twitter",
    icon: <FaTwitter className="h-5 w-5" />,
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
  providers = ["google", "discord", "twitch", "twitter"],
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
