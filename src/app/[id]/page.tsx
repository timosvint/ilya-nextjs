    "use client"

    import useFindListByIdQuery from '@/quires/findListByIdQuery';
    import { useParams } from 'next/navigation';
    import Image from "next/image";
    import { useState } from 'react';
    import ActorComponent from '../../components/idComponents/actor';
    import GenresList from '@/components/idComponents/genres';
import { YouTubeEmbed } from '@/components/idComponents/YouTubeEmbed';
import { ActorsTable } from '@/components/idComponents/actorTable';
import { useFavoritesStore } from '@/features/favorites/favoritesStore';

    const MovieById = () => {
        const [open, setOpen] = useState(false)
        const { id } = useParams<{ id: string }>();

        const { data, isLoading, isError, error } = useFindListByIdQuery(id);
        const {addFavorite, deleteFavorite, isFavorite} = useFavoritesStore()

        const imgUrl = "https://image.tmdb.org/t/p/w500";
        const movie = data?.movie_results[0]
        const video = data?.video_results[0]


        if (isLoading) return <p>loading...</p>;
        if (isError) return <p>Error: {error.message}</p>
        if (!movie) return null;
        
        return (
            <>
                <Image src={`${imgUrl}${movie?.poster_path}`} alt={movie?.title} width={200} height={300}/>
                <p>{movie?.title}</p>
                <p>{movie?.overview}</p>
                <p>{movie?.vote_average?.toFixed(1)}</p>
                <p>{movie?.release_date}</p>
                    {isFavorite(movie.id) ? (<button onClick={() => deleteFavorite(movie.id)}>Favorite</button>) : (<button onClick={() => addFavorite(movie)}>Add to favorite</button>)}
                <GenresList movieResults={movie} />
                <YouTubeEmbed id={video?.key } title={movie.title} />
                <button type='button' onClick={() => setOpen(!open)}>actors</button>
                <ul className='flex'>
                {open && data?.person_results?.map((person) => {
               return(
                    <ActorComponent key={person.id} {...person} />
                )
               })
                    }
                </ul>
                <ActorsTable actors={data.person_results}/>
                
            </>
        )
    }


    export default MovieById