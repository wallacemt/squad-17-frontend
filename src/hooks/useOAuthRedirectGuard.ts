"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";

/**
 * Hook para detectar quando o Better Auth concluiu o processo OAuth
 * Aguarda o cookie critix.session_token ser setado antes de permitir redirects
 * Também verifica autenticação tradicional via critix.auth-token
 */
export function useOAuthRedirectGuard() {
  const [isReady, setIsReady] = useState(false);
  const [hasAuth, setHasAuth] = useState(false);

  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 10; // 10 tentativas = 5 segundos máximo

    const checkAuthCookies = () => {
      // Verificar cookie do Better Auth (OAuth)
      const betterAuthCookie = Cookies.get(
        `${process.env.NODE_ENV === "production" ? "__Secure-" : ""}critix.session_token`
      );

      // Verificar cookie de autenticação tradicional
      const traditionalAuthCookie = Cookies.get("critix.auth-token");

      // Verificar localStorage
      const hasLocalStorage =
        typeof window !== "undefined" && localStorage.getItem("auth_session");

      if (betterAuthCookie || traditionalAuthCookie || hasLocalStorage) {
        // Encontrou algum tipo de autenticação
        setHasAuth(true);
        setIsReady(true);
        return true;
      }

      attempts += 1;

      if (attempts >= maxAttempts) {
        // Timeout: não encontrou autenticação após várias tentativas
        setHasAuth(false);
        setIsReady(true);
        return true;
      }

      return false;
    };

    // Primeira checagem imediata
    if (checkAuthCookies()) {
      return;
    }

    // Se não encontrou, continuar checando a cada 500ms
    const interval = setInterval(() => {
      if (checkAuthCookies()) {
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return {
    isReady,
    hasBetterAuthSession: hasAuth,
    shouldProcessOAuth: hasAuth,
    shouldRedirectToLending: isReady && !hasAuth,
  };
}
