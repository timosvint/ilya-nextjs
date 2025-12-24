"use client"

import useListQuery from "@/quires/getListQuery"
import { useMemo, useState } from "react"


export const useFilter = () => {
    const [filter, setFilter] = useState("")
    const { data, isLoading, isError, error, } = useListQuery() 

    const filteredMovies = useMemo(() => {
      const allMovies = [
      ...(data?.popular?.results || []),
      ...(data?.upComing?.results || []),
      ...(data?.topRated?.results || []),
      ...(data?.nowPlaying?.results || []),
      ]

      const uniqueMovies = Array.from(new Map(allMovies.map(m => [m.id, m])).values());

      if (!filter.trim()) return uniqueMovies

       const rating = Number(filter)
       const isRating = !isNaN(rating)

      const normalize = (str = "") =>
        str
          .toString()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^a-z0-9\s]/gi, " ")
          .toLowerCase()
          .replace(/\s+/g, " ")
          .trim()

      if (isRating) {
        return uniqueMovies.filter(movie => movie?.vote_average >= rating)
      }

      const query = normalize(filter)
      const tokens = query.split(" ").filter(Boolean)

      const results = uniqueMovies.filter(movie => {
        const searchable = normalize(
          `${movie?.title || ""} ${movie?.original_title || ""} ${movie?.overview || ""}`
        )
        return tokens.every(t => searchable.includes(t))
      })

      return results
    }, [data, filter])

    return {
    filter,
    setFilter,
    filteredMovies,
    isLoading,
    isError,
    error,
  };
}