import { getMoviesList } from "@/service/getMoviesList"
import { CombinedMoviesResponse, MoviesResponse } from "@/types/getListQueryType"
import {  useQuery, useQueryClient } from "@tanstack/react-query"
import { QueryCache } from '@tanstack/react-query'


const useListQuery = () => {
    return useQuery<CombinedMoviesResponse>({
        queryKey: ["movieList"],
        queryFn: () => getMoviesList<CombinedMoviesResponse>(),
        retry: 1,
        staleTime: 0
     })
}


export default useListQuery