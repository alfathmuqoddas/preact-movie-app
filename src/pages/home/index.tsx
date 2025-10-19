import { useState, useEffect, useCallback } from 'react';
import { sampleText } from '../../store/useCountStore';
import debounce from 'lodash.debounce';
import useFetch from '../../hooks/useFetch';
import { HorizontalCard } from '../../components/card';

export const SearchIcon = () => {
  return (
    <svg
      className="w-4 h-4 text-gray-500 dark:text-gray-400"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
      />
    </svg>
  );
};

export const buildSearchUrl = (type: 'movie' | 'tv', query: string) => {
  const trimmed = query.trim();
  if (trimmed.length < 2) return null; // Don't search for short queries
  return `https://api.themoviedb.org/3/search/${type}?api_key=${
    import.meta.env.VITE_API_KEY
  }&query=${encodeURIComponent(trimmed)}`;
};

export default function Homepage() {
  const [debouncedQuery, setDebouncedQuery] = useState('');

  const debouncedSetQuery = useCallback(
    debounce((value: string) => {
      setDebouncedQuery(value);
    }, 400),
    []
  );

  useEffect(() => {
    debouncedSetQuery(sampleText.value);
    return () => debouncedSetQuery.cancel();
  }, [sampleText.value, debouncedSetQuery]);

  const handleChange = (e: any) => {
    sampleText.value = e.target.value;
  };

  const tvUrl = buildSearchUrl('tv', debouncedQuery);
  const movieUrl = buildSearchUrl('movie', debouncedQuery);

  const {
    data: tvData,
    isLoading: isLoadingTv,
    error: errorTv,
  } = useFetch(tvUrl);
  const {
    data: moviesData,
    isLoading: isLoadingMovies,
    error: errorMovies,
  } = useFetch(movieUrl);

  return (
    <article
      className={`${
        sampleText.value
          ? ''
          : 'flex items-center justify-center flex-col h-full'
      }`}
    >
      <form className="w-full">
        <label
          for="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <SearchIcon />
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Movies, Series, anything..."
            onInput={handleChange}
            value={sampleText.value}
            required
          />
        </div>
      </form>
      {debouncedQuery && (
        <div
          className="rounded-xl p-2 bg-blue-100 mt-1 max-h-[50vh] overflow-auto"
          id="result"
        >
          {isLoadingTv || isLoadingMovies ? (
            <p>Loading...</p>
          ) : errorTv || errorMovies ? (
            <p className="text-red-500">Error loading results</p>
          ) : (
            <div className="flex flex-col md:flex-row gap-2">
              {moviesData && (
                <div className="flex flex-col gap-2 flex-1">
                  {moviesData.results.map((movie) => (
                    <HorizontalCard
                      id={movie.id}
                      poster_path={movie.poster_path}
                      title={movie.title}
                      mediaType="movie"
                      id={movie.id}
                      release_date={movie.release_date}
                      rating={movie.vote_average}
                    />
                  ))}
                </div>
              )}
              {tvData && (
                <div className="flex flex-col gap-2 flex-1">
                  {tvData.results.map((tv) => (
                    <HorizontalCard
                      title={tv.name}
                      poster_path={tv.poster_path}
                      mediaType="tv"
                      id={tv.id}
                      release_date={tv.first_air_date}
                      rating={tv.vote_average}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </article>
  );
}
