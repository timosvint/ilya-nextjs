"use client";
import useListQuery from "@/quires/getListQuery";
import Image from "next/image";
import { MovieList } from "@/components/homeComponents/MovieList";
import { useRouter } from 'next/navigation';
import { useFavoritesStore } from "@/features/favorites/favoritesStore";
import { mapFavorite } from "@/helpers/mapFavorite"

export default function Home() {
  const { data, isLoading, isError ,error, } = useListQuery()
  const router = useRouter()
  const imgUrl = "https://image.tmdb.org/t/p/w500";
  const MostPopularMovie = data?.popular?.results[0]
  const { addFavorite, isFavorite, deleteFavorite } = useFavoritesStore()
 


  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  
  
   
  return (
    <>
     
      {MostPopularMovie?.poster_path &&
        <div onClick={() => router.push(`${MostPopularMovie.id}`)}>
        <p>Most Popular Movie</p>
        <Image src={`${imgUrl}${MostPopularMovie?.poster_path}`} alt={MostPopularMovie?.title} width={300} height={200} />
        <p>{MostPopularMovie?.title}</p>
        </div>
      }
     
      <MovieList data={data?.popular.results || []} imgUrl={imgUrl} title={'Trending'} />
      <MovieList data={data?.topRated.results || []} imgUrl={imgUrl} title={'Top rated'} />
      <MovieList data={data?.upComing.results || []} imgUrl={imgUrl} title={'Upcoming'} />

      <ul className="flex">
        {data?.nowPlaying.results.map((movies) => {
          return (
            <li key={movies.id }  >
              <div onClick={() => router.push(`${movies.id}`)}>
              <Image src={`${imgUrl}${movies.poster_path}`} alt={movies.title} width={200} height={100}/>
              <p>{movies.title}</p>
              </div>
              {isFavorite(movies.id) ? (<button onClick={() => deleteFavorite(movies.id) }>Favorite</button>)
                : (<button onClick={() => addFavorite(mapFavorite(movies))}>add to favorite</button>)}
            </li>
          )
        })}
      </ul>
    </>
  );
}
