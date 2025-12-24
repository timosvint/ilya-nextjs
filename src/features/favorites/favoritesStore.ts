
import { FavoritesState } from '@/types/zustand/FavoriteStoreType'
import { create } from 'zustand'
import {persist} from "zustand/middleware"

export const useFavoritesStore = create<FavoritesState>()(
    persist(
        (set, get) => ({
    movies: [],
    addFavorite: (movie) => set((state) => {
        if (state.movies.some((m) => m.id === movie.id)) return state;
        return { movies: [...state.movies, movie] }
    }),
    deleteFavorite: (id) => set((state) => ({
        movies: state.movies.filter((m) => m.id !== id)
    })),
        isFavorite: (id) => {
        return get().movies.some(m => m.id === id )
    },
      }),
        {
            name: 'favorites-storage',
        }
      )
  )