import type { Movie } from '../types/movie';
import { MovieGrid } from './MovieGrid';

interface FavoritesListProps {
  favorites: Movie[];
  onRemove: (id: number) => void;
}

export function FavoritesList({ favorites, onRemove }: FavoritesListProps) {
  return (
    <>
      <MovieGrid
        movies={favorites}
        favorites={favorites}
        onFavorite={() => {}}
        onRemove={onRemove}
        isFavList={true}
      />
    </>
  );
}