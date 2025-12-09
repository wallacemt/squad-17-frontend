import { useCallback } from "react";
// import { useAuth } from "./useAuth";
import { baseUrl } from "@/services/api";

interface ApiOptions extends RequestInit {
  skipAuth?: boolean;
  erroMessage?: string;
}

export function useApi() {
  // const { session, refreshSession, logout } = { session: "", refreshSession: "", logout: "" };

  const fetcher = useCallback(
    async <T>(url: string, options: ApiOptions = {}): Promise<T> => {
      // biome-ignore lint/correctness/noUnusedVariables: used after
      const { skipAuth = false, headers = {}, erroMessage, ...restOptions } = options;

      const config: RequestInit = {
        ...restOptions,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
      };

      // Add auth token if available and not skipped
      //   if (!skipAuth && session?.accessToken) {
      //     config.headers = {
      //       ...config.headers,
      //       Authorization: `Bearer ${session.accessToken}`,
      //     };
      //   }

      const apiUrl = `${baseUrl}${url}`;

      try {
        const response = await fetch(apiUrl, config);

        // // Handle token expiration
        // if (response.status === 401 && !skipAuth) {
        //   await refreshSession();

        //   // Retry request with new token
        //   if (session?.accessToken) {
        //     config.headers = {
        //       ...config.headers,
        //       Authorization: `Bearer ${session.accessToken}`,
        //     };
        //     response = await fetch(apiUrl, config);
        //   }
        // }

        if (!response.ok) {
          const error = await response.json().catch((e) => ({ message: e.error ?? erroMessage ?? "Request failed" }));
          throw new Error(error.message || `HTTP ${response.status}`);
        }

        return await response.json();
      } catch (error) {
        console.error("API request failed:", error);

        // if (error instanceof Error && error.message.includes("401")) {
        //   logout();
        // }

        throw error;
      }
    },
    []
    // [session, refreshSession, logout]
  );

  const get = useCallback(
    <T>(url: string, options?: ApiOptions) => fetcher<T>(url, { ...options, method: "GET" }),
    [fetcher]
  );

  const post = useCallback(
    <T>(url: string, data?: unknown, options?: ApiOptions) =>
      fetcher<T>(url, {
        ...options,
        method: "POST",
        body: data ? JSON.stringify(data) : undefined,
      }),
    [fetcher]
  );

  const put = useCallback(
    <T>(url: string, data?: unknown, options?: ApiOptions) =>
      fetcher<T>(url, {
        ...options,
        method: "PUT",
        body: data ? JSON.stringify(data) : undefined,
      }),
    [fetcher]
  );

  const patch = useCallback(
    <T>(url: string, data?: unknown, options?: ApiOptions) =>
      fetcher<T>(url, {
        ...options,
        method: "PATCH",
        body: data ? JSON.stringify(data) : undefined,
      }),
    [fetcher]
  );

  const del = useCallback(
    <T>(url: string, options?: ApiOptions) => fetcher<T>(url, { ...options, method: "DELETE" }),
    [fetcher]
  );

  return {
    get,
    post,
    put,
    patch,
    delete: del,
    fetcher,
  };
}
