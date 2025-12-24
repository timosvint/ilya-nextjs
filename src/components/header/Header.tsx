import Link from 'next/link'
import { CommandMenu } from './Command'


const Header = () => {
   

    return (
        <>
            <Link href="/">Home</Link>
            <Link href="favorites">Favorites</Link>
            <CommandMenu />
            
        </>
)

}


export default Header