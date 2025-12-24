import { PersonResult } from "@/types/getByIdQueryType"
import Image from "next/image";





const ActorComponent = ({ name, profile_path, character }: PersonResult) => {
    
             const imgUrl = "https://image.tmdb.org/t/p/w500";

    return (
        <li>
             <Image src={`${imgUrl}${profile_path}`} alt={name} width={200} height={100}/>
            <p>{name}</p>
            <p>play: {character }</p>
            
        </li>)
}


export default ActorComponent