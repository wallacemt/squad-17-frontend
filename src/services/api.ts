import Cookies from "js-cookie";
export const baseUrl = process.env.CRITIX_EXTERNAL_API_URL ?? "https://api-critix.wallacedev.com.br";
export const jwtToken = (): string => {
  if (Cookies.get("critix.jwt_token")) {
    return Cookies.get("critix.jwt_token") || "";
  }
  return Cookies.get("critix.jwt_token") || "";
};
