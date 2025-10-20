import { useState, useEffect, useRef } from "react";
import useFetch from "../../hooks/useFetch";
import { HorizontalCard } from "../../components/card";
import SearchIcon from "../../assets/icon/SearchIcon";
import { sampleText } from "../../store/useCountStore";

export const buildSearchUrl = (type: "movie" | "tv", query: string) => {
  const trimmed = query.trim();
  if (trimmed.length < 2) return null; // Don't search for short queries
  return `https://api.themoviedb.org/3/search/${type}?api_key=${
    import.meta.env.VITE_API_KEY
  }&query=${encodeURIComponent(trimmed)}`;
};

const SearchBar = () => {
  const [inputQuery, setInputQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(inputQuery);
    }, 400);

    return () => {
      clearTimeout(handler);
    };
  }, [inputQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    sampleText.value = debouncedQuery;
  }, [debouncedQuery]);

  const handleChange = (e: any) => {
    const value = e.target.value;
    setInputQuery(value);
    if (value.trim().length >= 2) {
      setShowResults(true); // 👈 show dropdown when query is long enough
    } else {
      setShowResults(false);
    }
  };

  const handleInputFocus = () => {
    if (debouncedQuery.trim().length >= 2) {
      setShowResults(true);
    }
  };

  const tvUrl = buildSearchUrl("tv", debouncedQuery);
  const movieUrl = buildSearchUrl("movie", debouncedQuery);

  const {
    data: tvData,
    isLoading: isLoadingTv,
    error: errorTv,
  } = useFetch<any>(tvUrl);
  const {
    data: moviesData,
    isLoading: isLoadingMovies,
    error: errorMovies,
  } = useFetch<any>(movieUrl);

  const shouldShowDropdown = showResults && debouncedQuery.trim().length >= 2;

  return (
    <div ref={searchContainerRef} className="w-full relative">
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
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Movies, Series, anything..."
            onInput={handleChange}
            onFocus={handleInputFocus}
            value={inputQuery}
            required
          />
        </div>
      </form>
      {shouldShowDropdown && (
        <div
          className="absolute z-10 w-full rounded-xl p-2 bg-blue-100 mt-1 max-h-[50vh] overflow-auto shadow-lg"
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
                  {moviesData?.results?.map((movie: any) => (
                    <HorizontalCard
                      id={movie.id}
                      poster_path={movie.poster_path}
                      title={movie.title}
                      mediaType="movie"
                      release_date={movie.release_date}
                      rating={movie.vote_average}
                    />
                  ))}
                </div>
              )}
              {tvData && (
                <div className="flex flex-col gap-2 flex-1">
                  {tvData.results.map((tv: any) => (
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
              {!moviesData?.results?.length && !tvData?.results?.length && (
                <p className="p-2 text-gray-500">No results found</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
