import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router";
import Header from "../Components/Header";
import MovieList from "../Components/MovieList";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_API_URL;

const SearchPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const query = searchParams.get("q") || "";

  // 防抖函数
  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const fetchMovies = async (query = "") => {
    try {
      setLoading(true);
      setError(null);

      const url = query
        ? `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}&api_key=${API_KEY}`
        : `${BASE_URL}/movie/popular?api_key=${API_KEY}`;

      const { data } = await axios.get(url);
      setMovies(data.results || []);
    } catch (err) {
      console.error("获取电影数据失败:", err);
      setError("获取电影数据失败，请稍后重试");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  // 搜索防抖
  const debouncedSearch = debounce((searchQuery) => {
    if (searchQuery) {
      setSearchParams({ q: searchQuery });
    } else {
      setSearchParams({});
    }
  }, 500);

  const handleSearch = (searchQuery) => {
    if (searchQuery.trim()) {
      debouncedSearch(searchQuery);
    } else {
      // 清空搜索时重新加载热门电影
      setSearchParams();
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  useEffect(() => {
    // 初始加载热门电影
    if (query) {
      fetchMovies(query);
    } else {
      setMovies([]);
    }
  }, [query, location]);

  return (
    <>
      <Header
        onSearch={handleSearch}
        onClear={handleClearSearch}
        query={query}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">
            {query ? ` Search "${query}"` : " Search movies "}
          </h2>
          <p className="text-gray-600">
            A total of {movies.length} movies were found.
          </p>
        </div>

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-4">
            {error}
          </div>
        )}

        {!loading && movies.length === 0 && !error && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg"> No related movies found</p>
            <p className="text-gray-500 mt-2">Try changing your keywords?</p>
          </div>
        )}

        {!loading && movies.length > 0 && <MovieList movies={movies} />}
      </div>
    </>
  );
};
export default SearchPage;
