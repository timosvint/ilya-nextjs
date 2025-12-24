"use server"

import axios from "axios"

const baseURL = "https://api.themoviedb.org/3"


export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.NEXT_API_KEY_MOVIE_DB}`
  },
})