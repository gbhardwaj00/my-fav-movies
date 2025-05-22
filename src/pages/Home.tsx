import { useState, useEffect } from 'react';
import { SearchBar } from '../components/SearchBar';
import { MovieGrid } from '../components/MovieGrid';
import { FavoritesList } from '../components/FavoritesList';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { searchMovies } from '../../utils/api';
import type { Movie } from '../types/movie';

export function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Movie[]>([]);
  const [favorites, setFavorites] = useLocalStorage<Movie[]>('favoriteMovies', []);


  const addFavorite = (movie: Movie) => {
    if (!favorites.some(f => f.id === movie.id)) {
      setFavorites([...favorites, movie]);
    }
  };

  const removeFavorite = (id: number) => {
    setFavorites(favorites.filter(f => f.id !== id));
  };

  const handleCopyLink = () => {
    const ids = favorites.map((movie) => movie.id).join(',');
    const url = `${window.location.origin}/preview?movies=${ids}`;

    try {
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    } catch (err) {
      console.error('Clipboard copy failed:', err);
      alert('Failed to copy link. Please try manually.');
    }
  }

  useEffect(() => {
    const delay = setTimeout(() => {
      if (query.trim()) {
        searchMovies(query).then(setResults);
      } else {
        setResults([]);
      }
    }, 400);

    return () => clearTimeout(delay); 
  }, [query]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <header className="bg-gradient-to-r from-purple-700 to-indigo-600 p-6 rounded-lg mb-8 shadow-lg">
        <h1 className="text-4xl font-extrabold text-white text-center">
          🎬 My Favorite Movies
        </h1>
      </header>

      <SearchBar query={query} onChange={setQuery} />

      <section className="mb-12">
        <h2 className="text-2xl text-white font-bold mb-4 border-b border-gray-700 pb-2">
          Search Results
        </h2>
        {results.length > 0 ? (
          <MovieGrid
            movies={results.slice(0, 8)}
            favorites={favorites}
            onFavorite={addFavorite}
            onRemove={removeFavorite}
            isFavList={false}
          />
        ) : (
          <p className="text-center text-gray-400">
            No results yet—try searching for a movie above!
          </p>
        )}
      </section>
      
      <section>
        <h2 className="text-2xl text-white font-bold mb-4 border-b border-gray-700 pb-2">
          Your Favorites
        </h2>

        {favorites.length > 0 ? (
          <div className="flex flex-col items-center">
            <FavoritesList favorites={favorites} onRemove={removeFavorite} />

            <div className="flex justify-end">
              <button
                onClick={handleCopyLink}
                className="mt-8 px-5 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:brightness-120 transition">
                Share My Movie List
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-400">
            No favorites yet—click 💖 on a movie to add!
          </p>
        )}
      </section>
    </div>
  );
}
