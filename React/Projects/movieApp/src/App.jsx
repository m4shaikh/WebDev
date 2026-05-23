
import { useState } from 'react'
import './App.css'
import Search from './components/Search'
import { useEffect } from 'react'
import MovieCard from './components/MovieCard'
import { useDebounce } from 'react-use'

function App() {

  const [searchTerm, setSearchTerm] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [allMovies, setAllMovies] = useState([])
  const [topRated, setTopRated] = useState([])

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

  const API_BASE_URL = 'https://api.themoviedb.org/3'
  const API_KEY = import.meta.env.VITE_API_KEY;

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 800, [searchTerm])

  const API_METHODS = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`
    }
  }



  useEffect(() => {
    async function fetchMovies(query = '') {
      try {
        const endpoint = searchTerm ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}` : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`
        const response = await fetch(endpoint, API_METHODS)
        if (!response.ok) {
          throw new Error('Failed to fetch movies')
        }
        const data = await response.json();
        console.log(data)
        setAllMovies(data.results)
      } catch (error) {
        console.error(`error fetching movies ${error}`);
        setErrorMessage('Error fetching movies. please try again later.')

        console.log(errorMessage)
      }

    }
    fetchMovies(debouncedSearchTerm)
  }, [debouncedSearchTerm])

  useEffect(() => {
    async function fetchTopRatedMovies() {
      try {
        const endpoint = `${API_BASE_URL}/movie/top_rated`
        const response = await fetch(endpoint, API_METHODS)
        if (!response.ok) {
          throw new Error('Failed to fetch movies')
        }
        const data = await response.json();
        console.log(data)
        setTopRated(data.results.slice(0, 5))
      } catch (error) {
        console.error(`error fetching movies ${error}`);
        setErrorMessage('Error fetching movies. please try again later.')

        console.log(errorMessage)
      }

    }
    fetchTopRatedMovies()
  }, [])

  decodeURI.bind

  return (
    <main className="bg-[url('../assets/bg-finale.png')] bg-top bg-contain bg-no-repeat flex flex-col items-center">

      <div className="w-full">
        <div className="flex flex-col items-center ">
          <img className='pt-8' src="../assets/logo.png" alt="" />
          <img src="../assets/Image1.png" alt="" className='w-[30%]' />
          <h1 className='text-5xl font-bold w-[48%] mx-auto -mt-14 leading-none'>Find <span className='text-gradient'>Movies</span> You'll Love Without the Hassle</h1>
          <Search
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />

        </div>

      </div>

      <div className='flex gap-8 w-full items-center justify-center mt-10'>
        {topRated.map((movie, index) => {
          return (
            <div className='flex items-center'>
              <span className='fancy-text -mr-4 text-dark-100 '>{index+1}</span>
              <img className="rounded-xl w-30 h-45  " src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="image" />
            </div>
          )
        })}
      </div>

      <div className='p-8 '>
        <h2 className='text-3xl mb-4 '>All Movies</h2>
        <div className='grid grid-cols-4 gap-6'>

          {allMovies.map((movie) => {
            return (
              <MovieCard
                key={movie.id}
                movie={movie}
              />
            )
          })}
        </div>
      </div>

    </main>
  )
}

export default App
