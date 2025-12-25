import type { TMDBMedia, TMDBTrendingPostersResponse } from "@/types/tmdb";
import { baseUrl } from "./api";

const getTrendingMedia = async (): Promise<TMDBMedia[]> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15_000); // 15 segundos de timeout

    const res = await fetch(`${baseUrl}/media/v1/trending`, {
      cache: "default",
      signal: controller.signal,
      next: { revalidate: 3600 }, // Revalidar a cada hora
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      const { error } = (await res.json()) as { error: string };
      throw new Error(error || "Erro ao consultar medias!");
    }
    const data = (await res.json()) as TMDBMedia[];
    return data;
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      console.error("Timeout ao buscar trending media");
    } else {
      console.error(`Erro ao consultar trending: ${error}`);
    }
    // Retornar array vazio em caso de erro
    return [];
  }
};
const getTrendingRandomPosters = async (): Promise<TMDBTrendingPostersResponse[]> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15_000); // 15 segundos de timeout

    const res = await fetch(`${baseUrl}/media/v1/trending/posters/random`, {
      cache: "default",
      signal: controller.signal,
      next: { revalidate: 3600 }, // Revalidar a cada hora
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      const { error } = (await res.json()) as { error: string };
      throw new Error(error || "Error ao consultar posters!");
    }

    const data = (await res.json()) as TMDBTrendingPostersResponse[];
    return data;
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      console.error("Timeout ao buscar trending posters");
    } else {
      console.error(`Erro ao consultar trending posters: ${error}`);
    }
    // Retornar array vazio em caso de erro
    return [];
  }
};

export { getTrendingMedia, getTrendingRandomPosters };
