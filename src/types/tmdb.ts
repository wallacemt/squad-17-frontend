export interface TMDBMedia  {
  adult: boolean;
  backdrop_path: string;
  id: number;
  title?: string;
  original_title?: string;
  overview: string;
  poster_path: string;
  media_type: string;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  release_date?: string;
  video?: boolean;
  vote_average: number;
  vote_count: number;
  name?: string;
  original_name?: string;
  first_air_date?: string;
  origin_country?: string[];
};
export interface TMDBTrendingResponse  {
  page: number;
  results: TMDBMedia[];
  total_pages: number;
  total_results: number;
};

export interface TMDBTrendingPostersResponse  {
  src: string;
  alt: string;
  title: string;
  subtitle: string;
};
