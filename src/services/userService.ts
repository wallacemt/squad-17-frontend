import { User } from "@/types/auth";
import { UserAccount, UserProfile } from "@/types/user";
import { baseUrl, jwtToken } from "./api";

const getUserInfo = async (): Promise<{
  user: User;
  account: UserAccount;
  profile: UserProfile;
}> => {
  try {
    const response = await fetch(`${baseUrl}/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${jwtToken()}`,
      },
      cache: "no-cache",
    });

    if (!response.ok) {
      const { error } = (await response.json()) as { error: string };
      throw new Error(error || "Erro ao consultar user");
    }

    const data = (await response.json()) as {
      user: User;
      account: UserAccount;
      profile: UserProfile;
    };
    return data;
  } catch (error) {
    throw new Error(`Erro ao consultar informação do usuário: ${error}`);
  }
};
export { getUserInfo };
