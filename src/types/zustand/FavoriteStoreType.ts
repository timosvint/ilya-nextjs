import { MovieResult } from "../getByIdQueryType";
import { Movie } from "../getListQueryType";

export interface FavoritesState {
  movies: FavoriteMovie[];
  addFavorite: (movie: FavoriteMovie) => void;
  deleteFavorite: (id: number | string) => void;
  isFavorite: (id: number | string) => boolean;
}



export type FavoriteMovie = {
  id: number | string;
  title: string;
  popularity: number;
  poster_path?: string | number;
  vote_average?: number;
  release_date?: string;
};