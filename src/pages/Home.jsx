import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import MovieList from "../Components/MovieList";
import Header from "../Components/Header";

const API_KEY = "dd63c2974a9cc9b8fbe01efe1e9cfdc2";
const BASE_URL = "https://api.themoviedb.org/3";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

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
  const debouncedSearch = debounce((query) => {
    fetchMovies(query);
  }, 500);

  useEffect(() => {
    // 初始加载热门电影
    fetchMovies();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      debouncedSearch(query);
    } else {
      // 清空搜索时重新加载热门电影
      fetchMovies();
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    fetchMovies();
  };

  return (
    <>
      <Header
        onSearch={handleSearch}
        onClear={handleClearSearch}
        query={searchQuery}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">
            {searchQuery ? `🔍 搜索结果 "${searchQuery}"` : "🔥 正在热映"}
          </h2>
          <p className="text-gray-600">共找到 {movies.length} 部影片</p>
        </div>

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            <p className="mt-4 text-gray-600">加载中...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-4">
            {error}
          </div>
        )}

        {!loading && movies.length === 0 && !error && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">😕 没有找到相关电影</p>
            <p className="text-gray-500 mt-2">换个关键词试试？</p>
          </div>
        )}

        {!loading && movies.length > 0 && <MovieList movies={movies} />}
      </div>
    </>
  );
};
export default Home;
