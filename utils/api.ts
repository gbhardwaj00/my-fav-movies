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

export async function getMovieById(id: string) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}&language=en-US`
    );
    const movie = await res.json();

     // Fetch IMDb ID
    const external = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/external_ids?api_key=${TMDB_API_KEY}`
    );
    const ids = await external.json();

    return {
      ...movie,
      imdb_id: ids.imdb_id,
    };
  } catch (err) {
    console.error('Error fetching movie or socials:', err);
    return null;
  }
}