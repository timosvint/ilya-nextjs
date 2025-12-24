"use client"

import { FavoritesMoveList } from "@/components/favoritesComponent/FavoritesMoveList"
import { useFavoritesStore } from "@/features/favorites/favoritesStore"
import { useFilterForFavoriteList } from "@/hooks/useFilterForFavoriteList"
import { useState } from "react"


   



const Favorite = () => {
    const [sort, setSort] = useState<"alphabet" | "rating" | "popularity" | "year">("alphabet")
    
    const movies = useFavoritesStore((state) => state.movies)
    const sortedMovies = useFilterForFavoriteList(movies, sort)


   console.log({...movies})

    
    
    return (
        <>
            <div>Hi</div>
            <div className="flex gap-2">
                <p>sorts</p>
                <button onClick={() => setSort("alphabet")}>A–Z</button>
                <button onClick={() => setSort("rating")}>Rating</button>
                <button onClick={() => setSort("popularity")}>Popularity</button>
                <button onClick={() => setSort("year")}>Year</button>
            </div>
            <ul className="flex">
                <FavoritesMoveList movies={sortedMovies } />
            </ul>
        </>
    )
}


export default Favorite