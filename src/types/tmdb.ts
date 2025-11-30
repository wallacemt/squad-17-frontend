export type TMDBMedia = {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  media_type: "movie" | "tv";
  genre_ids: number[];
};
export type TMDBTrendingResponse = {
  page: number;
  results: TMDBMedia[];
  total_pages: number;
  total_results: number;
};
