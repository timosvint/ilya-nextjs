import { MovieResult } from "@/types/getByIdQueryType"
import { Movie } from "@/types/getListQueryType"
import { FavoriteMovie } from "@/types/zustand/FavoriteStoreType"

export const mapFavorite = (movie: Movie | MovieResult): FavoriteMovie => ({
  id: movie.id,
  title: movie.title,
  popularity: movie.popularity,
  
  poster_path: movie.poster_path ?? undefined,
  vote_average: movie.vote_average,
  release_date: movie.release_date,
})