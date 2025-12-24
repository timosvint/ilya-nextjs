import { SortProp } from "@/types/hooksType/FavortieFilter";
import { FavoriteMovie } from "@/types/zustand/FavoriteStoreType";
import { useMemo } from "react";




export const useFilterForFavoriteList = (movie: FavoriteMovie[], sort: SortProp) => {
    return useMemo(() => {
        switch (sort) {
      case "alphabet":
        return movie.toSorted((a, b) =>
          a.title.localeCompare(b.title)
                )
      case "rating":
        return movie.toSorted(
          (a, b) => (b.vote_average ?? 0) - (a.vote_average ?? 0)
                )
      case "popularity":
        return movie.toSorted(
          (a, b) => (b.popularity ?? 0) - (a.popularity ?? 0)
                )
      case "year":
        return movie.toSorted((a, b) => {
          const yearA = Number(a.release_date?.slice(0, 4)) || 0
          const yearB = Number(b.release_date?.slice(0, 4)) || 0
          return yearB - yearA
        })
            
            default:
                return movie
        }
    }, [movie, sort])

}


