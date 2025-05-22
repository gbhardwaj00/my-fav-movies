export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  popularity?: number;
  backdrop_path?: string;
  overview?: string;
  imdb_id?: string;
}
