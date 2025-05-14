import { useState } from "react";

export default function MovieSearch() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const apiKey = import.meta.env.VITE_TMDB_API_KEY;

    const searchMovies = async () => {
        if (!query.trim()) return;

        const res = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`
        );
        const data = await res.json();
        setResults(data.results);
    }
    
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
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {results.map((movie: any) => (
                <div key={movie.id} className="text-center">
                    {movie.poster_path ? (
                    <img
                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                        alt={movie.title}
                        className="rounded shadow-md mx-auto"
                    />
                    ) : (
                    <div className="h-[300px] bg-gray-700 rounded" />
                    )}
                    <p className="mt-2 text-sm">{movie.title}</p>
                </div>
                ))}
            </div>

        </div>
        </>
    );
}