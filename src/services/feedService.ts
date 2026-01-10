import type { Feed } from "@/types/feed";
import { baseUrl, jwtToken } from "./api";

async function getUserFeed() {
  try {
    const response = await fetch(`${baseUrl}/feed`, {
      method: "GET",
      cache: "default",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${jwtToken()}`,
      },
      next: { revalidate: 3600 },
    });
    if (!response.ok) {
      const { error } = (await response.json()) as { error: string };
      throw new Error(error || "Erro ao consultar feed");
    }
    const data = (await response.json()) as Feed[];
    return data;
  } catch (error) {
    throw new Error(`Erro ao consultar feed: ${error}`);
  }
}

export { getUserFeed };
