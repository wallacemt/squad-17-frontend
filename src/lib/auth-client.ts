import { createAuthClient } from "better-auth/react";
import { env } from "process";

export const authClient = createAuthClient({
  baseURL: env.BETTER_AUTH_URL || "",
});

export const { signIn, signUp, signOut, useSession } = authClient;
