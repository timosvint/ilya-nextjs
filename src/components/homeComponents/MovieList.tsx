"use client"

import { useFavoritesStore } from "@/features/favorites/favoritesStore";
import { mapFavorite } from "@/helpers/mapFavorite";
import { MovieListProps } from "@/types/componentTypes/MovieListProp"
import { nanoid } from "nanoid"
import Image from "next/image"
import { useRouter } from 'next/navigation';



export const MovieList = ({ data, imgUrl, title }: MovieListProps) => {
    const router = useRouter()
    const { addFavorite, deleteFavorite, isFavorite } = useFavoritesStore()
    

    return (
        <>
            <p>{title}</p>
            <ul className="flex">
                {data.map((movies) => {
                    return (
                        <li key={movies.id || nanoid()}  >
                            <div onClick={() => router.push(`${movies.id}`)}>
                            <Image src={`${imgUrl}${movies.poster_path}`} alt={movies.title} width={100} height={100} />
                            <p>{movies.title}</p>
                            <p>{movies.release_date}</p>
                            <p>{movies.vote_average.toFixed(1)}</p>
                            </div>
                            {isFavorite(movies.id) ? (<button onClick={() => deleteFavorite(movies.id)}>Favorite</button>) : 
                                (<button onClick={() => addFavorite(mapFavorite(movies))}>Add to favorites</button>)
                            }
                        </li>
                    )
             })}
            </ul>
        </>
    )

}