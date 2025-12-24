
import axios from "axios"




export const getMoviesList = async <T>(): Promise<T> => {
  const { data } = await axios.get<T>("/api/movies");
  return data;
}

