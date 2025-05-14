const apiKey = import.meta.env.VITE_TMDB_API_KEY;

import { useState } from "react";

export default function MovieSearch() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const searchMovies = async () => {
        const res = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`
        )
    }
    
    return (
        <>
        </>
    );
}