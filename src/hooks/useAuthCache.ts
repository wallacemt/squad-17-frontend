import { useFormCache } from "./useFormCache";
import type {
  LoginCredentials,
  RegisterStep1Data,
  RegisterStep2Data,
} from "@/types/auth";

// Simple Base64 encoding for passwords (not for production security, just cache obfuscation)
const encode = (value: string): string => {
  if (typeof window === "undefined") {
    return value;
  }
  try {
    return btoa(value);
  } catch {
    return value;
  }
};

const decode = (value: string): string => {
  if (typeof window === "undefined") {
    return value;
  }
  try {
    return atob(value);
  } catch {
    return value;
  }
};

interface CachedLoginData {
  emailOrUsername: string;
  password: string; // base64 encoded
  rememberMe?: boolean;
}

interface CachedRegisterStep1 {
  name: string;
  email: string;
  password: string; // base64 encoded
  confirmPassword: string; // base64 encoded
}

interface CachedRegisterData {
  currentStep: 1 | 2;
  step1: CachedRegisterStep1;
  step2: RegisterStep2Data;
}

const CACHE_KEYS = {
  REGISTER: "critix_register_form",
  LOGIN: "critix_login_form",
  AUTH_MODE: "critix_auth_mode",
} as const;

/**
 * Hook para cache do formulário de registro (2 steps)
 * Codifica as senhas em base64 antes de salvar no localStorage
 */
export function useRegisterFormCache() {
  const baseCache = useFormCache<CachedRegisterData>({
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
        birthDate: new Date().toISOString().split("T")[0],
        gender: "prefer-not-to-say",
        country: "BR",
      },
    },
    ttl: 24 * 60 * 60 * 1000, // 24 hours
  });

  const updateStep1 = (data: Partial<RegisterStep1Data>) => {
    const updates: Partial<CachedRegisterStep1> = { ...data };

    // Encode passwords if provided
    if (data.password !== undefined) {
      updates.password = data.password ? encode(data.password) : "";
    }
    if (data.confirmPassword !== undefined) {
      updates.confirmPassword = data.confirmPassword
        ? encode(data.confirmPassword)
        : "";
    }

    baseCache.updateFields({
      step1: { ...baseCache.data.step1, ...updates },
    });
  };

  const updateStep2 = (data: Partial<RegisterStep2Data>) => {
    baseCache.updateFields({
      step2: { ...baseCache.data.step2, ...data },
    });
  };

  const setCurrentStep = (step: 1 | 2) => {
    baseCache.updateFields({ currentStep: step });
  };

  // Decode passwords when reading
  const getStep1Data = (): RegisterStep1Data => {
    const step1 = baseCache.data.step1;
    return {
      ...step1,
      password: step1.password ? decode(step1.password) : "",
      confirmPassword: step1.confirmPassword
        ? decode(step1.confirmPassword)
        : "",
    };
  };

  return {
    currentStep: baseCache.data.currentStep,
    step1Data: getStep1Data(),
    step2Data: baseCache.data.step2,
    updateStep1,
    updateStep2,
    setCurrentStep,
    clearCache: baseCache.clearCache,
    isLoaded: baseCache.isLoaded,
  };
}

/**
 * Hook para cache do formulário de login
 * Codifica a senha em base64 antes de salvar no localStorage
 */
export function useLoginFormCache() {
  const baseCache = useFormCache<CachedLoginData>({
    key: CACHE_KEYS.LOGIN,
    initialData: {
      emailOrUsername: "",
      password: "",
      rememberMe: false,
    },
    ttl: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  const updateLoginData = (data: Partial<LoginCredentials>) => {
    const updates: Partial<CachedLoginData> = { ...data };

    // Encode password if provided
    if (data.password !== undefined) {
      updates.password = data.password ? encode(data.password) : "";
    }

    baseCache.updateFields(updates);
  };

  // Decode password when reading
  const getLoginData = (): LoginCredentials => ({
    ...baseCache.data,
    password: baseCache.data.password ? decode(baseCache.data.password) : "",
  });

  return {
    loginData: getLoginData(),
    updateLoginData,
    clearCache: baseCache.clearCache,
    isLoaded: baseCache.isLoaded,
    hasCachedData: baseCache.hasCachedData,
  };
}

/**
 * Hook para cache do modo de autenticação atual
 */
export function useAuthModeCache() {
  return useFormCache<{ mode: string }>({
    key: CACHE_KEYS.AUTH_MODE,
    initialData: { mode: "login" },
    ttl: 30 * 60 * 1000, // 30 minutes
  });
}
