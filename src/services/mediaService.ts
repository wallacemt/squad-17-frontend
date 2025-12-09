import type { TMDBMedia, TMDBTrendingPostersResponse } from "@/types/tmdb";
import { useApi } from "@/hooks/useApi";

const getTrendingMedia = async (): Promise<TMDBMedia[]> => {
  const res = await useApi().get("/media/v1/trending", {
    cache: "default",
    erroMessage: "Error ao consultar trending!",
  });
  try {
    const data = res as TMDBMedia[];
    return data;
  } catch (error) {
    throw new Error(`Error ao consultar trending: ${error}`);
  }
};
const getTrendingRandomPosters = async (): Promise<TMDBTrendingPostersResponse[]> => {
  const res = await useApi().get("/media/v1/trending/posters/random", {
    cache: "default",
    erroMessage: "Error ao consultar posters!",
  });
  try {
    const data = res as TMDBTrendingPostersResponse[];
    return data;
  } catch (error) {
    throw new Error(`Error ao consultar trending: ${error}`);
  }
};

export { getTrendingMedia, getTrendingRandomPosters };
