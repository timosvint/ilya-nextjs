import { useQuery } from "@tanstack/react-query"
import {getMovieById} from "@/service/getMovieById"
import { ApiResponse } from "@/types/getByIdQueryType"


const useFindListByIdQuery = (id: string) => {
   return useQuery<ApiResponse>({
        queryKey: ['movieById', id],
       queryFn: () => getMovieById<ApiResponse>(id),
        enabled: !!id,
        retry: 1,
        staleTime: 0
    })
    
}

export default useFindListByIdQuery