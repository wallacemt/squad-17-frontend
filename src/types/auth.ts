import type { UserAccount, UserData } from "./user";

export type AuthMode = "login" | "register" | "otp" | "password" | "reset-password" | "forgot-password" | "social";

export type OAuthProvider = "google" | "discord" | "twitch" | "twitter";

export interface LoginCredentials {
  emailOrUsername: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterStep1Data {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterStep2Data {
  nickname: string;
  birthDate: string;
  gender: "male" | "female" | "other" | "prefer-not-to-say";
  country: string;
}

export interface RegisterData extends RegisterStep1Data, RegisterStep2Data {}
export interface LoginData {
  email: string;
  password: string;
}

export interface UserProfile {
  id: string;
  nickname: string;
  birthDate: string;
  gender: string;
  followed: number;
  following: number;
  country: string;
  avatarUrl?: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  profile?: UserProfile;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthSession {
  user: User;
  accessToken: string;
  refreshToken?: string;
  expiresAt: number;
}

export interface OTPVerification {
  email: string;
  code: string;
  type: "email-verification" | "password-reset";
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface AuthError {
  message: string;
  field?: string;
  code?: string;
}

export interface NicknameValidation {
  available: boolean;
  message?: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  refreshToken: string;
  sessionToken?: string;
  user: UserData;
  account: UserAccount;
  userProfile: UserProfile;
}
