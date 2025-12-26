import axios from "axios";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get("page") || "1"
  const query = searchParams.get("query") || "";



    const options = {
          headers: {
          Authorization: `Bearer ${process.env.NEXT_API_KEY_MOVIE_DB}`,
          },
          params: { language: "en-US", page, query },
    }

  try {
    const [popular, topRated, upComing, nowPlaying] = await Promise.all([
       axios.get("https://api.themoviedb.org/3/movie/popular", options),
        axios.get("https://api.themoviedb.org/3/movie/top_rated", options),
      axios.get("https://api.themoviedb.org/3/movie/upcoming", options),
      axios.get("https://api.themoviedb.org/3/movie/now_playing", options)
    ]);

    return Response.json({
      popular: popular.data,
      topRated: topRated.data,
      upComing: upComing.data,
      nowPlaying: nowPlaying.data
    }, { status: 200 });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Failed to fetch movies" }, { status: 500 });
  }
}   