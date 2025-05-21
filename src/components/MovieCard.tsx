import type { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
  isFavorite: boolean;
  onFavorite: (movie: Movie) => void;
  onRemove: (id: number) => void;
  isFavList: boolean;
}

export function MovieCard({ movie, isFavorite, onFavorite, onRemove, isFavList } : MovieCardProps) {
  return (
    <div className="text-center">
        {movie.poster_path ? (
            <img
            src={`${import.meta.env.VITE_TMDB_IMAGE_URL}${movie.poster_path}`}
            alt={movie.title}
            className="rounded shadow-md mx-auto"
            />
        ) : (
            <div className="h-[300px] bg-gray-700 rounded flex items-center justify-center">
                <span className="text-xs text-gray-300">No Poster Available</span>
            </div>
        )}
        <p className="mt-2 text-sm font-medium">{movie.title}</p>
        <div className="mt-1 flex flex-col items-center space-y-1">
            {!isFavList &&
                (<button
                    disabled={isFavorite}
                    onClick={() => onFavorite(movie)}
                    className={`mt-1 text-xs ${
                    isFavorite ? 'text-gray-400' : 'text-pink-500 hover:underline'
                    }`}
                >
                    {isFavorite ? '✅ In Favorites' : '💖 Add to Favorites'}
                </button>)
            }
            {isFavorite && (
                <button
                    onClick={() => onRemove(movie.id)}
                    className="mt-1 text-xs text-red-500 hover:underline"
                >
                    ❌ Remove
                </button>
            )}
        </div>
    </div>
  );
}