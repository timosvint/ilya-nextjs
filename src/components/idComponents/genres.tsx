import { genresPropType } from "@/types/getByIdQueryType"





const GenresList = ({movieResults}: genresPropType) => {
    return (
    <ul className="flex gap-1">
            {movieResults.genres.map((genre) => {
                return (
                    <li key={genre.id} >
                        <p >{genre.name}</p>
                    </li>
                )
            })}
    </ul>
    )
}



export default GenresList