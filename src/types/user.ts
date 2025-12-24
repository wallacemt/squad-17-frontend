export interface UserData {
  id: string;
  createdAt: string;
  email: string;
  emailVerified: boolean;
  image: string;
  name: string;
}

export interface UserAccount {
  id: string;
  idToken: string;
  userId: string;
  accessToken: string;
  createdAt: string;
  providerId: string;
  refreshToken: string;
  scope: string;
}

export interface UserProfile {
  id: string;
  avatarUrl: string;
  bio: string;
  userId: string;
  birthDate: string;
  country: string;
  createdAt: string;
  followed: number;
  following: number;
  gender: string;
  nickname: string;
  updatedAt: string;
}
