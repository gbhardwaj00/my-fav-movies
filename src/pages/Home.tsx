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
  // const isFirstLoad = useRef(true);

  const handleSearch = async () => {
    if (!query.trim()) return;
    const movies = await searchMovies(query);
    setResults(movies);
  };

  const addFavorite = (movie: Movie) => {
    if (!favorites.some(f => f.id === movie.id)) {
      const updated = [...favorites, movie];
      setFavorites(updated);
    }
  };

  const removeFavorite = (id: number) => {
    const updated = favorites.filter(f => f.id !== id);
    setFavorites(updated);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">My Favorite Movies</h1>

      <SearchBar query={query} onChange={setQuery} onSearch={handleSearch} />

      <MovieGrid
        movies={results}
        favorites={favorites}
        onFavorite={addFavorite}
        onRemove={removeFavorite}
        isFavList={false}
      />

      <FavoritesList favorites={favorites} onRemove={removeFavorite} />
    </div>
  );
}