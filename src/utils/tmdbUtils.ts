import type { TMDBMedia } from "@/types/tmdb";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";
export const getImageUrl = (
  path: string | null,
  size: "w200" | "w300" | "w500" | "w780" | "original" = "w500"
): string => {
  if (!path) {
    return "https://res.cloudinary.com/dg9hqvlas/image/upload/q_auto:low/c_scale,w_1200/f_webp/v1764631407/placeholder_v3gsdr.png";
  }
  return `${TMDB_IMAGE_BASE}/${size}${path}`;
};

export function formatRating(rating: number): number {
  return Math.round(rating * 10) / 10;
}

export function getTitle(media?: TMDBMedia): string {
  return media?.title || media?.name || "Sem título";
}

export const getYear = (media: TMDBMedia): string => {
  const date = media.release_date || media.first_air_date;
  return date ? new Date(date).getFullYear().toString() : "N/A";
};

export const getGenreNames = (genreIds?: number[]): string => {
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

  const genres = genreIds?.slice(0, 2).map((id) => genreMap[id] || "Outro");
  return genres?.join(", ") || "Outro";
};
