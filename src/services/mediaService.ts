import type { TMDBMedia, TMDBTrendingPostersResponse } from "@/types/tmdb";
import { baseUrl } from "./api";

const getTrendingMedia = async (): Promise<TMDBMedia[]> => {
  try {
    const res = await fetch(`${baseUrl}/media/v1/trending`, {
      cache: "default",
    });
    if (!res.ok) {
      const { error } = (await res.json()) as { error: string };
      throw new Error(error || "Erro ao consultar medias!");
    }
    const data = (await res.json()) as TMDBMedia[];
    return data;
  } catch (error) {
    throw new Error(`Error ao consultar trending: ${error}`);
  }
};
const getTrendingRandomPosters = async (): Promise<TMDBTrendingPostersResponse[]> => {
  try {
    const res = await fetch(`${baseUrl}/media/v1/trending/posters/random`, {
      cache: "default",
    });
    if (!res.ok) {
      const { error } = (await res.json()) as { error: string };
      throw new Error(error || "Error ao consultar posters!");
    }

    const data = (await res.json()) as TMDBTrendingPostersResponse[];
    return data;
  } catch (error) {
    throw new Error(`Error ao consultar trending: ${error}`);
  }
};

export { getTrendingMedia, getTrendingRandomPosters };
