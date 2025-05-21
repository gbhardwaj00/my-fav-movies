import { useEffect, useRef, useState } from "react";
import { TMDB_API_KEY, TMDB_BASE_URL, TMDB_IMAGE_URL, FAVORITES_KEY } from '../config';
import type { Movie } from '../types/movie';


export default function MovieSearch() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Movie[]>([]); // for search results
    const [favorites, setFavorites] = useState<Movie[]>([]); // gets populated with favorited movies
    const isFirstLoad = useRef(true);

    // Load saved favorites from localStorage
    useEffect(() => {
        console.log('💾 Loading favorites from localStorage...');
        const saved = localStorage.getItem(FAVORITES_KEY);
        if (saved) {
            console.log('✅ Loaded:', JSON.parse(saved));
            setFavorites(JSON.parse(saved));
        } else {
            console.log('⚠️ No favorites found in localStorage');
        }
    }, []);

    useEffect(() => {
        if (isFirstLoad.current) {
            isFirstLoad.current = false;
            return; // skip first run
        }
        console.log('📦 Saving to localStorage:', favorites);
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }, [favorites]);


    const searchMovies = async () => {
        if (!query.trim()) return;
        const res = await fetch(
            `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`
        );
        const data = await res.json();
        const sorted = data.results.sort(
            (a: Movie, b: Movie) => (b.popularity ?? 0) - (a.popularity ?? 0)
        );
        setResults(sorted);
    };

    const addToFavorites = (movie: Movie) => {
        const minimalMovie = {
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            popularity: movie.popularity,
        };

        const alreadyExists = favorites.find((fav) => fav.id === movie.id);
        if (!alreadyExists) {
            const updated = [...favorites, minimalMovie];
            setFavorites(updated);
            console.log('🌟 Added to favorites:', movie.title);
        }
    };

    const removeFromFavorites = (id: number) => {
        const updated = favorites.filter((f) => f.id !== id);
        setFavorites(updated);
    };

    
    return (
        <>
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-4 text-center">
                My Favorite Movies
            </h1>
            <div className="flex gap-2 mb-6">
                <input 
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for a movie..."
                    className="w-full p-3 rounded border border-gray-400 text-black"
                />
                <button 
                    onClick={searchMovies}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Search
                </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mb-12">
                {results.map((movie: Movie) => {
                    const isFavorite = favorites.some((fav) => fav.id === movie.id);
                    return (
                            <div key={movie.id} className="text-center">
                                {movie.poster_path ? (
                                <img
                                    src={`${TMDB_IMAGE_URL}${movie.poster_path}`}
                                    alt={movie.title}
                                    className="rounded shadow-md mx-auto"
                                />
                                ) : (
                                <div className="h-[300px] bg-gray-700 rounded" />
                                )}
                                <p className="mt-2 text-sm">{movie.title}</p>
                                <button
                                    disabled={isFavorite}
                                    onClick={() => addToFavorites(movie)}
                                    className={`mt-1 text-xs ${
                                        isFavorite
                                        ? 'text-gray-400'
                                        : 'text-pink-500 hover:underline'
                                    }`}
                                >
                                    {isFavorite ? '✅ Added' : '💖 Add to Favorites'}
                                </button>
                            </div>
                    )
                })}
            </div>

            <h2 className="text-2xl font-bold mb-4"> Favorites </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {favorites.map((movie:Movie) => (
                    <div key={movie.id} className="text-center">
                        {movie.poster_path ? (
                            <img
                                src={`${TMDB_IMAGE_URL}${movie.poster_path}`}
                                alt={movie.title}
                                className="rounded shadow-md mx-auto"
                            />
                        ) : (
                            <div className="h-[300px] bg-gray-700 rounded" />
                        )}
                        <p className="mt-2 text-sm">{movie.title}</p>
                        <button
                            onClick={() => removeFromFavorites(movie.id)}
                            className="mt-1 text-xs text-red-500 hover:underline"
                        >
                            ❌ Remove
                        </button>
                    </div>
                ))}
            </div>
        </div>
        </>
    );
}