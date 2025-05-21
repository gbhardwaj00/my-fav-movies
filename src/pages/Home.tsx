import { useState } from 'react';
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

  const handleSearch = async () => {
    if (!query.trim()) return;
    const movies = await searchMovies(query);
    setResults(movies);
  };

  const addFavorite = (movie: Movie) => {
    if (!favorites.some(f => f.id === movie.id)) {
      setFavorites([...favorites, movie]);
    }
  };

  const removeFavorite = (id: number) => {
    setFavorites(favorites.filter(f => f.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Hero */}
      <header className="bg-gradient-to-r from-purple-700 to-indigo-600 p-6 rounded-lg mb-8 shadow-lg">
        <h1 className="text-4xl font-extrabold text-white text-center">
          🎬 My Favorite Movies
        </h1>
      </header>

      {/* Search */}
      <SearchBar query={query} onChange={setQuery} onSearch={handleSearch} />

      {/* Search Results Section */}
      <section className="mb-12">
        <h2 className="text-2xl text-white font-bold mb-4 border-b border-gray-700 pb-2">
          Search Results
        </h2>
        {results.length > 0 ? (
          <MovieGrid
            movies={results}
            favorites={favorites}
            onFavorite={addFavorite}
            onRemove={() => {}}
            isFavList={false}
          />
        ) : (
          <p className="text-center text-gray-400">
            No results yet—try searching for a movie above!
          </p>
        )}
      </section>

      {/* Favorites Section */}
      <section>
        <h2 className="text-2xl text-white font-bold mb-4 border-b border-gray-700 pb-2">
          Your Favorites
        </h2>
        {favorites.length > 0 ? (
          <FavoritesList favorites={favorites} onRemove={removeFavorite} />
        ) : (
          <p className="text-center text-gray-400">
            No favorites yet—click 💖 on a movie to add!
          </p>
        )}
      </section>
    </div>
  );
}
