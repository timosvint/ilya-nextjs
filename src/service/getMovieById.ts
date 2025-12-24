
import axios from "axios";

export const getMovieById =  async <T>(id: string): Promise<T> => {
    const { data } = await axios.get<T>(`/api/movie/find?id=${id}`);
    return data;
}
 

