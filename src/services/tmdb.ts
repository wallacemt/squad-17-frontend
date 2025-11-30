import { env } from "node:process";


const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";




const tmdbFetch = async (endpoint: string) => {
  const response = await fetch(`${TMDB_BASE_URL}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${env.TMDB_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 3600, // Cache por 1 hora
    },
  });

  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.statusText}`);
  }

  return response.json();
};

export const getTrending = async (
  mediaType: "all" | "movie" | "tv" = "all",
  timeWindow: "day" | "week" = "week"
): Promise<TMDBTrendingResponse> => {
  return tmdbFetch(`/trending/${mediaType}/${timeWindow}?language=pt-BR`);
};

export const getImageUrl = (
  path: string | null,
  size: "w200" | "w300" | "w500" | "w780" | "original" = "w500"
): string => {
  if (!path) return "/placeholder-movie.jpg";
  return `${TMDB_IMAGE_BASE}/${size}${path}`;
};

export const formatRating = (rating: number): number => {
  return Math.round(rating * 10) / 10;
};

export const getTitle = (media: TMDBMedia): string => {
  return media.title || media.name || "Sem título";
};

export const getYear = (media: TMDBMedia): string => {
  const date = media.release_date || media.first_air_date;
  return date ? new Date(date).getFullYear().toString() : "N/A";
};

export const getGenreNames = (genreIds: number[]): string => {
  const genreMap: Record<number, string> = {
    28: "Ação",
    12: "Aventura",
    16: "Animação",
    35: "Comédia",
    80: "Crime",
    99: "Documentário",
    18: "Drama",
    10751: "Família",
    14: "Fantasia",
    36: "História",
    27: "Terror",
    10402: "Música",
    9648: "Mistério",
    10749: "Romance",
    878: "Ficção Científica",
    10770: "Filme de TV",
    53: "Thriller",
    10752: "Guerra",
    37: "Faroeste",
    // TV Genres
    10759: "Ação & Aventura",
    10762: "Infantil",
    10763: "Notícias",
    10764: "Reality",
    10765: "Sci-Fi & Fantasia",
    10766: "Novela",
    10767: "Talk Show",
    10768: "Guerra & Política",
  };

  const genres = genreIds.slice(0, 2).map((id) => genreMap[id] || "Outro");
  return genres.join(", ");
};
