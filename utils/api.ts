import { TMDB_API_KEY, TMDB_BASE_URL } from '../src/config';
import type { Movie } from '../src/types/movie';

/**
 * Fetches movies matching the query and sorts by popularity descending.
 */
export async function searchMovies(query: string): Promise<Movie[]> {
    const url = `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`;
    const res = await fetch(url);
    const data = await res.json();
    return (data.results as Movie[]).sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0));
}