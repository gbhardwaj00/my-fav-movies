import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom'; // if using React Router
import { getMovieById } from '../../utils/api'; // adjust to match your API function
import type { Movie } from '../types/movie';
import { FaImdb } from 'react-icons/fa';


export function Preview() {
  const [searchParams] = useSearchParams();
  const movieIds = searchParams.get('movies')?.split(',') || [];
  const [movies, setMovies] = useState<Movie[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    async function fetchMovies() {
      const results = await Promise.all(movieIds.map(id => getMovieById(id)));
      setMovies(results.filter(Boolean));
    }
    fetchMovies();
  }, [movieIds]);

  const current = movies[index];

  const next = () => setIndex((prev) => (prev + 1) % movies.length);
  const prev = () => setIndex((prev) => (prev - 1 + movies.length) % movies.length);

  if (!current) return <div className="text-white p-8">Loading...</div>;

  return (
    <div className="relative w-screen h-screen overflow-hidden text-white">
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${current.backdrop_path})`,
        }}
      />
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-0" />

      <div 
        key={current.id}
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4
    opacity-0 animate-fadeIn">
        <div 
            className="flex flex-col items-center justify-center h-[500px]">
            <img
            src={`https://image.tmdb.org/t/p/w500${current.poster_path}`}
            className="w-[220px] rounded-xl shadow-2xl mb-6 object-contain"
            />
            <h1 className="text-3xl font-bold">{current.title}</h1>
        </div>
        <p className="max-w-xl text-white text-sm sm:text-base px-4">
            {current.overview}
        </p>

        {current.imdb_id && (
            <a
                href={`https://www.imdb.com/title/${current.imdb_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-yellow-300 hover:text-yellow-400 transition text-lg"
            >
                <FaImdb className="text-3xl" />
                Go to IMDb
            </a>
        )}

        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-4xl text-white opacity-70 hover:opacity-100"
        >
          ←
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-4xl text-white opacity-70 hover:opacity-100"
        >
          →
        </button>
      </div>
    </div>
  );
}
