export type genresPropType = {
  movieResults: MovieResult
}

type genresType = {
  id: number
  name: string
}


export type MovieResult  = {
  adult: boolean;
  backdrop_path?: string;
  id: number | string;
  title: string;
  original_language: string;
  original_title: string;
  overview?: string;
  poster_path?: string;
  media_type: string;
  genres: genresType[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type PersonResult = {
  id: number | string;
  name: string;
  character: string;
  known_for_department: string;
  profile_path: string | null;
  popularity: number;
};

type TvResult = {
  id: number | string;
  name: string;
  original_name: string;
  overview?: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  vote_average: number;
  vote_count: number;
  popularity: number;
  first_air_date: string;
  genre_ids: number[];
};

type TvEpisodeResult = {
  id: number | string;
  name: string;
  overview?: string;
  episode_number: number;
  season_number: number;
  air_date: string;
  vote_average: number;
  vote_count: number;
  still_path: string | null;
};

type TvSeasonResult = {
  id: number | string;
  name: string;
  overview?: string;
  season_number: number;
  air_date: string;
  poster_path?: string | null;
};
export type VideoResult = {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string | number;
};



export type ApiResponse = {
  movie_results: MovieResult[];
  person_results: PersonResult[];
  tv_results: TvResult[];
  tv_episode_results: TvEpisodeResult[];
  tv_season_results: TvSeasonResult[];
  video_results: VideoResult[];
};