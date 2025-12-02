import Cookies from "js-cookie";
export const baseUrl = process.env.BACKEND_URL || "http://localhost:8081";
export const jwtToken = (): string => {
  if (Cookies.get("critix.jwt_token")) {
    return Cookies.get("critix.jwt_token") || "";
  }
  return Cookies.get("critix.jwt_token") || "";
};
