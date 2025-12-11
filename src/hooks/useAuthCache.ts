import { useFormCache } from "./useFormCache";
import type { RegisterStep1Data, RegisterStep2Data } from "@/types/auth";
import { encryptPassword, decryptPassword } from "@/utils/clientHash";
import { useEffect, useState, useCallback } from "react";

interface AuthFormState {
  currentStep: 1 | 2;
  step1: RegisterStep1Data;
  step2: RegisterStep2Data;
  [key: string]: unknown;
}

const CACHE_KEYS = {
  REGISTER: "critix_register_form",
  LOGIN: "critix_login_form",
  AUTH_MODE: "critix_auth_mode",
} as const;

export function useRegisterFormCache() {
  const baseCache = useFormCache<AuthFormState>({
    key: CACHE_KEYS.REGISTER,
    initialData: {
      currentStep: 1,
      step1: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      step2: {
        nickname: "",
        birthDate: new Date().toString(),
        gender: "prefer-not-to-say",
        country: "BR",
      },
    },
    ttl: 24 * 60 * 60 * 1000, // 24 hours
  });

  const [decryptedData, setDecryptedData] = useState<AuthFormState>(baseCache.data);
  const [isDecrypting, setIsDecrypting] = useState(true);

  // Decrypt passwords on load ONCE
  useEffect(() => {
    let isMounted = true;

    const decryptData = async () => {
      if (!baseCache.isLoaded) return;

      const decrypted = { ...baseCache.data };

      if (decrypted.step1.password) {
        decrypted.step1.password = await decryptPassword(decrypted.step1.password);
      }
      if (decrypted.step1.confirmPassword) {
        decrypted.step1.confirmPassword = await decryptPassword(decrypted.step1.confirmPassword);
      }

      if (isMounted) {
        setDecryptedData(decrypted);
        setIsDecrypting(false);
      }
    };

    decryptData();

    return () => {
      isMounted = false;
    };
  }, [baseCache.isLoaded]);

  // Encrypt passwords before saving
  const saveToCache = useCallback(
    async (data: AuthFormState) => {
      const encrypted = { ...data };

      if (encrypted.step1.password) {
        encrypted.step1.password = await encryptPassword(encrypted.step1.password);
      }
      if (encrypted.step1.confirmPassword) {
        encrypted.step1.confirmPassword = await encryptPassword(encrypted.step1.confirmPassword);
      }

      baseCache.saveToCache(encrypted);
    },
    [baseCache.saveToCache]
  );

  return {
    ...baseCache,
    data: decryptedData,
    isLoaded: baseCache.isLoaded && !isDecrypting,
    saveToCache,
  };
}

export function useLoginFormCache() {
  const baseCache = useFormCache<{ email: string; password: string; rememberMe: boolean }>({
    key: CACHE_KEYS.LOGIN,
    initialData: {
      email: "",
      password: "",
      rememberMe: false,
    },
    ttl: 7 * 24 * 60 * 60 * 1000, // 7 days for login
  });

  const [decryptedData, setDecryptedData] = useState(baseCache.data);
  const [isDecrypting, setIsDecrypting] = useState(true);

  // Decrypt password on load ONCE
  useEffect(() => {
    let isMounted = true;

    const decryptData = async () => {
      if (!baseCache.isLoaded) return;

      const decrypted = { ...baseCache.data };

      if (decrypted.password) {
        decrypted.password = await decryptPassword(decrypted.password);
      }

      if (isMounted) {
        setDecryptedData(decrypted);
        setIsDecrypting(false);
      }
    };

    decryptData();

    return () => {
      isMounted = false;
    };
  }, [baseCache.isLoaded]);

  // Encrypt password before saving
  const saveToCache = useCallback(
    async (data: { email: string; password: string; rememberMe: boolean }) => {
      const encrypted = { ...data };

      if (encrypted.password) {
        encrypted.password = await encryptPassword(encrypted.password);
      }

      baseCache.saveToCache(encrypted);
    },
    [baseCache.saveToCache]
  );

  return {
    ...baseCache,
    data: decryptedData,
    isLoaded: baseCache.isLoaded && !isDecrypting,
    saveToCache,
  };
}

export function useAuthModeCache() {
  return useFormCache<{ mode: string; lastVisited: string }>({
    key: CACHE_KEYS.AUTH_MODE,
    initialData: {
      mode: "login",
      lastVisited: new Date().toISOString(),
    },
    ttl: 30 * 60 * 1000, // 30 minutes
  });
}
