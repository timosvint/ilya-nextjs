"use client"

import { useFavoritesStore } from "@/features/favorites/favoritesStore";
import { mapFavorite } from "@/helpers/mapFavorite";
import { MovieListProps } from "@/types/componentTypes/MovieListProp"
import { nanoid } from "nanoid"
import Image from "next/image"
import { useRouter } from 'next/navigation';
import { StarIcon } from "../icons/lucide-star";
import { Button } from "../ui/button";
import Link from "next/link";



export const MovieList = ({ data, imgUrl, title }: MovieListProps) => {
    const router = useRouter()
    const { addFavorite, deleteFavorite, isFavorite } = useFavoritesStore()
    

    return (
        <>
            <p>{title}</p>
            <ul className="flex flex-wrap gap-2">
                {data.map((movies) => {
                    return (
                        <li className="border rounded-2xl w-40 h-[420px] flex flex-col overflow-hidden" key={movies.id || nanoid()}  >
                            <div className="flex flex-col" >
                            <Image onClick={() => router.push(`${movies.id}`)} className="rounded-t-2xl cursor-pointer object-cover h-[260px] w-full hover:brightness-75 transition-all"src={`${imgUrl}${movies.poster_path}`} alt={movies.title} width={150} height={150} />
                                <div className="p-2  space-y-1 h-[30px]">
                            
                            <p className="flex text-sm"><StarIcon className="fill-yellow-300  text-yellow-300"/> {movies.vote_average.toFixed(1)}/10</p>
                            <Link className="text-sm font-medium line-clamp-2 hover:text-purple-500 hover:underline transition-all" href={`${movies.id}`}>{movies.title}</Link>
                                 
                            </div>
                            </div>
                            
                            <div className="mt-auto p-2 pt-0 flex flex-col gap-1">
                                <div className="flex items-center gap-10">
                                <p className="text-sm text-gray-400">{movies.release_date }</p>   
                                
                                {isFavorite(movies.id) ? (<button onClick={() => deleteFavorite(movies.id)}>
                                    <StarIcon className="h-6 w-6 text-purple-500 fill-current cursor-pointer hover:text-purple-600  transition-all " />
                                </button>) : 
                                    (<button onClick={() => addFavorite(mapFavorite(movies))}>
                                        <StarIcon className="h-6 w-6 hover:text-purple-500 cursor-pointer transition-all  " />
                                    </button>)
                                    }
                                    </div>
                            <Button variant="outline" className="w-full cursor-pointer"  onClick={() => router.push(`${movies.id}`)} >Watch</Button>

                            </div>
                        </li>
                    )
             })}
            </ul>
        </>
    )

}