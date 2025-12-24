import { useFavoritesStore } from "@/features/favorites/favoritesStore"
import { FavoriteMovieListType } from "@/types/componentTypes/FavoriteMovieListType"
import Image from "next/image"
import {useRouter} from "next/navigation"




export const FavoritesMoveList = ({movies} : FavoriteMovieListType) => {
        
    const imgUrl = "https://image.tmdb.org/t/p/w500";
    const {deleteFavorite} = useFavoritesStore()
    const router = useRouter()



    return (
        <>
            {movies.map((movies) => {
                return (
                    <li key={movies.id}>
                        <Image src={`${imgUrl}${movies.poster_path}`} alt={movies.title} width={200} height={100} onClick={() => router.push(`${movies.id}`)} />
                            <p>{movies.title}</p>
                            <p>{movies.release_date}</p>
                            <p>{movies.vote_average?.toFixed(1)}</p>
                        <button onClick={() => deleteFavorite(movies.id)} >delete </button>
                    </li>   
                )
            })}
    </>
 )

}
