"use client"

import {

  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { useFilter } from "@/hooks/useFilterUtility"
import { useRouter } from "next/navigation"
import { useState } from "react"

export const CommandMenu = () =>  {
    const [open, setOpen] = useState(false)

    const router = useRouter()

    const {
        filter,
        setFilter,
        filteredMovies,
        isLoading,
        isError,
        error
    } = useFilter()
       
    const handleClick = () => {
        setOpen(!open)
    }
    
    if (isLoading) return <p>loading...</p>;
    if (isError) return <p>Error: {error?.message}</p>

    

    
    const onSelect = (id: string | number) => {
        
        setOpen(false)
        router.push(`${id}`)
        setFilter("")
    }

    return (
        <>
            <button onClick={handleClick}>click me</button>

    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput  value={filter}  placeholder="Type for search..."  onValueChange={(value) => setFilter(value)} />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Search for films">
                        {filteredMovies?.map((movies, index) => {
                            const label = movies?.title || movies?.original_title || ""
                            const value = `${label} ${typeof movies?.vote_average === 'number' ? movies.vote_average.toFixed(1) : ''}`
                            return (
                                <CommandItem
                                    value={value}
                                    className="cursor-pointer"
                                    key={`${movies.id}-${index}`}
                                    onSelect={() => onSelect(movies?.id)}
                                >
                                    {label} <span className="ml-auto">{`${movies?.vote_average.toFixed(1)}/10`}</span>
                                </CommandItem>
                            )
                        })}
        </CommandGroup>
      </CommandList>
            </CommandDialog>
            </>
  )
}