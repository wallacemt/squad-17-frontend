import AuthPage from "@/components/auth/Auth";
import type { AuthMode } from "@/types/auth";
import { redirect } from "next/navigation";

interface AuthUserProps {
  searchParams: Promise<{
    mode: AuthMode;
    token?: string;
  }>;
}
export default async function AuthUser({ searchParams }: AuthUserProps) {
  const { mode, token } = await searchParams;
  const validModes = ["login", "register", "otp", "password", "reset-password", "forgot-password", "social"];
  if (!validModes.includes(mode)) {
    redirect("/auth?mode=login");
  }
  return <AuthPage mode={mode || "login"} resetToken={token} />;
}
