import type { Movie } from '../types/movie';
import { MovieCard } from './MovieCard';

interface MovieGridProps {
  movies: Movie[];
  favorites: Movie[];
  onFavorite: (movie: Movie) => void;
  onRemove: (id: number) => void;
  isFavList: boolean;
}

export function MovieGrid({ movies, favorites, onFavorite, onRemove, isFavList }: MovieGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      {movies.map(movie => (
        <MovieCard
          key={movie.id}
          movie={movie}
          isFavorite={favorites.some(f => f.id === movie.id)}
          onFavorite={onFavorite}
          onRemove={onRemove}
          isFavList={isFavList}
        />
      ))}
    </div>
  );
}