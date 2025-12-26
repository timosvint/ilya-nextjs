"use client";
import useListQuery from "@/quires/getListQuery";
import Image from "next/image";
import { MovieList } from "@/components/homeComponents/MovieList";
import { useRouter } from 'next/navigation';
import { useFavoritesStore } from "@/features/favorites/favoritesStore";
import { mapFavorite } from "@/helpers/mapFavorite"
import { StarIcon } from "@/components/icons/lucide-star";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
        <div className="flex-col flex items-center" >
          <p className="mr-25 text-xl">Most Popular Movie</p>
          <div  className="cursor-pointer " onClick={() => router.push(`${MostPopularMovie.id}`)}>
        <Image className="rounded-2xl shadow-md"  src={`${imgUrl}${MostPopularMovie?.poster_path}`} alt={MostPopularMovie?.title} width={300} height={200} />
            <p className="flex justify-center text-2xl font-bold">{MostPopularMovie?.title}</p>
            </div>
        </div>
      }
     
      <MovieList data={data?.popular.results || []} imgUrl={imgUrl} title={'Trending'} />
      <MovieList data={data?.topRated.results || []} imgUrl={imgUrl} title={'Top rated'} />
      <MovieList data={data?.upComing.results || []} imgUrl={imgUrl} title={'Upcoming'} />

      <ul className="flex flex-wrap gap-2 mt-2">
        {data?.nowPlaying.results.map((movies) => {
          return (
                       <li className="border rounded-2xl w-50 h-[420px] flex flex-col overflow-hidden" key={movies.id }  >
                            <div className="flex flex-col" >
                            <Image onClick={() => router.push(`${movies.id}`)} className="rounded-t-2xl cursor-pointer object-cover h-[260px] w-full hover:brightness-75 transition-all"src={`${imgUrl}${movies.poster_path}`} alt={movies.title} width={150} height={150} />
                                <div className="p-2  space-y-1 h-[30px]">
                            
                            <p className="flex text-sm"><StarIcon className="fill-yellow-300  text-yellow-300"/> {movies.vote_average.toFixed(1)}/10</p>
                            <Link className="text-sm font-medium line-clamp-2 hover:text-purple-500 hover:underline transition-all" href={`${movies.id}`}>{movies.title}</Link>
                                 
                            </div>
                            </div>
                            
                            <div className="mt-auto p-2 pt-0 flex flex-col gap-1">
                                <div className="flex items-center gap-20">
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
  );
}
