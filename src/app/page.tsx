"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/authContext";
import { useAuth } from "@/hooks/useAuth";
import { useOAuthRedirectGuard } from "@/hooks/useOAuthRedirectGuard";
import { OAuthLoadingScreen } from "@/components/auth/_components/oauth-loading";
import { PageRedirectLoading } from "@/components/lending/_components/page-redirect-loading";

export default function Home() {
  const router = useRouter();
  const { isAuthenticated } = useAuthContext();
  const { isOAuthProcessing } = useAuth();
  const { isReady, shouldRedirectToLending, shouldProcessOAuth } = useOAuthRedirectGuard();

  useEffect(() => {
    // Redirect authenticated users to feed
    if (isAuthenticated) {
      router.push("/feed");
      return;
    }

    // Se não está processando OAuth e deve redirecionar para lending
    if (isReady && shouldRedirectToLending && !isOAuthProcessing) {
      router.push("/lending");
    }
  }, [isAuthenticated, isReady, shouldRedirectToLending, isOAuthProcessing, router]);

  // Show OAuth loading screen if processing or waiting for OAuth check
  if (isOAuthProcessing || !isReady || shouldProcessOAuth) {
    return <OAuthLoadingScreen />;
  }

  // Show loading state while checking authentication
  return <PageRedirectLoading />;
}
