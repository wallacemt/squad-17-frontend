"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";

/**
 * Hook para detectar quando o Better Auth concluiu o processo OAuth
 * Aguarda o cookie critix.session_token ser setado antes de permitir redirects
 */
export function useOAuthRedirectGuard() {
  const [isReady, setIsReady] = useState(false);
  const [hasBetterAuthSession, setHasBetterAuthSession] = useState(false);

  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 10; // 10 tentativas = 5 segundos máximo

    const checkBetterAuthCookie = () => {
      const betterAuthCookie = Cookies.get(`${process.env.NODE_ENV === "production" ? "__Secure-" : ""}critix.session_token`);

      if (betterAuthCookie) {
        // Encontrou cookie do Better Auth
        setHasBetterAuthSession(true);
        setIsReady(true);
        return true;
      }

      attempts += 1;

      if (attempts >= maxAttempts) {
        // Timeout: não encontrou cookie após várias tentativas
        setHasBetterAuthSession(false);
        setIsReady(true);
        return true;
      }

      return false;
    };

    // Primeira checagem imediata
    if (checkBetterAuthCookie()) {
      return;
    }

    // Se não encontrou, continuar checando a cada 500ms
    const interval = setInterval(() => {
      if (checkBetterAuthCookie()) {
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return {
    isReady,
    hasBetterAuthSession,
    shouldProcessOAuth: hasBetterAuthSession,
    shouldRedirectToLending: isReady && !hasBetterAuthSession,
  };
}
