import type { TMDBMedia } from "@/types/tmdb";
import { baseUrl } from "./api";

export const useMediaService = () => {
  const getTrendingMedia = async (): Promise<TMDBMedia[]> => {
    try {
      const res = await fetch(`${baseUrl}/media/v1/trending`, { method: "GET", cache: "force-cache" });

      if (!res.ok) {
        throw new Error("Error ao consultar trending!");
      }
      const data = (await res.json()) as TMDBMedia[];
      return data;
    } catch (error) {
      throw new Error(`Error ao consultar trending: ${error}`);
    }
  };

  return { getTrendingMedia };
};
