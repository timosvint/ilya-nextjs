import { VideoResult } from "@/types/getByIdQueryType";
import { RouteVideoType } from "@/types/routeType";
import axios from "axios";
import { NextRequest } from "next/server";


export async function GET(request: NextRequest) {
      const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id") || "";
    

    if (!id) return Response.json({ error: "ID is required" }, { status: 400 })
    
    const options = {
          headers: {
          Authorization: `Bearer ${process.env.NEXT_API_KEY_MOVIE_DB}`,
        },
        params:{language: "en-US"}
    }

    try {
        const [movieResults, PersonResult, videoResults] = await Promise.all([
            axios.get(`https://api.themoviedb.org/3/movie/${id}`, options),
            axios.get(`https://api.themoviedb.org/3/movie/${id}/credits`, options), 
            axios.get(`https://api.themoviedb.org/3/movie/${id}/videos`, options)
        ]);
        
        const videos: VideoResult[] = videoResults.data.results;
        const officialTrailers: VideoResult[] = videos.filter(
            video => video.site === "YouTube" && video.official && video.type === "Trailer"
        );

            return Response.json({ movie_results: [movieResults.data], person_results: PersonResult.data.cast, video_results: officialTrailers }, { status: 200 });
    } catch (error) {
        console.error(error);
        return Response.json({ error: "Failed to fetch movie by id" }, { status: 500 });
    }
}
