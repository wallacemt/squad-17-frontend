import { env } from "node:process";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: env.BETTER_AUTH_URL || "",
  
});

export const { signIn, signUp, signOut, useSession } = authClient;
