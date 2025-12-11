import type { LoginData, LoginResponse, RegisterData } from "@/types/auth";
import { baseUrl } from "./api";

const getCheckInfo = async ({
  email,
  nickName,
}: {
  email?: string;
  nickName?: string;
}): Promise<{ emailExists: boolean; userNameExists: boolean }> => {
  const url = new URL(`${baseUrl}/auth/info-check`);

  if (email) {
    url.searchParams.append("email", email);
  }
  if (nickName) {
    url.searchParams.append("nickName", nickName);
  }

  try {
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });

    if (!response.ok) {
      const { error } = (await response.json()) as { error: string };
      throw new Error(error || "Erro ao consultar user");
    }

    const data = (await response.json()) as { emailExists: boolean; userNameExists: boolean };
    return data;
  } catch (error) {
    throw new Error(`Erro ao consultar informação do usuário: ${error}`);
  }
};

const postRegisterUser = async (data: RegisterData) => {
  try {
    const response = await fetch(`${baseUrl}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data }),
      cache: "no-cache",
    });
    if (!response.ok) {
      const { error } = (await response.json()) as { error: string };
      throw new Error(error || "Erro ao registrar usuario");
    }
    const dataRes = (await response.json()) as { message: string };
    return dataRes;
  } catch (error) {
    throw new Error(`Erro ao registrar usuario: ${error}`);
  }
};

const postUserLogin = async (data: LoginData): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data }),
      cache: "no-cache",
    });
    if (!response.ok) {
      const { error } = (await response.json()) as { error: string };
      throw new Error(error || "Erro ao fazer login");
    }
    const dataRes = (await response.json()) as LoginResponse;

    return dataRes;
  } catch (error) {
    throw new Error(`Erro ao realizar login: ${error}`);
  }
};

const postVerifyCode = async (code: string, email: string) => {
  try {
    const response = await fetch(`${baseUrl}/auth/verify/code`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code, email }),
      cache: "no-cache",
    });
    if (!response.ok) {
      const { error } = (await response.json()) as { error: string };
      throw new Error(error || "Erro ao verificar codigo");
    }
    const dataRes = (await response.json()) as { message: string; success: boolean };

    return dataRes;
  } catch (error) {
    throw new Error(`Erro ao verificar codigo usuario: ${error}`);
  }
};

const postResendCode = async (email: string) => {
  try {
    const response = await fetch(`${baseUrl}/auth/verify/resend`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
      cache: "no-cache",
    });
    if (!response.ok) {
      const { error } = (await response.json()) as { error: string };
      throw new Error(error || "Erro ao verificar codigo");
    }
    const dataRes = (await response.json()) as { message: string; success: boolean };

    return dataRes;
  } catch (error) {
    console.error("Error checking user info:", error);
    throw new Error(`Erro ao verificar codigo usuario: ${error}`);
  }
};

export { getCheckInfo, postRegisterUser, postUserLogin, postResendCode, postVerifyCode };
