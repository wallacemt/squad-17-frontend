"use client";

/**
 * Busca o accessToken do OAuth usando o cookie de sessão do Better Auth
 * @returns O accessToken e provider ou null se não encontrado
 */
export async function getOAuthAccessToken(): Promise<{
  accessToken: string;
  provider: string;
} | null> {
  try {
    const response = await fetch("/api/auth/oauth-token", {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return {
      accessToken: data.accessToken,
      provider: data.provider,
    };
  } catch (error) {
    console.error("Error fetching OAuth access token:", error);
    return null;
  }
}
