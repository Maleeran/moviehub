import axios from "axios";
import { useEffect, useState } from "react";
import MovieList from "../Components/MovieList";
import Header from "../Components/Header";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_API_URL;

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPopularMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}`;
      const { data } = await axios.get(url);
      setMovies(data.results || []);
      console.log(data.results[0]);
    } catch (err) {
      console.error("获取热门电影失败:", err);
      setError("获取热门电影失败，请稍后重试");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Showing Now</h2>
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
            <p className="text-gray-600 text-lg">😕 No popular movies yet</p>
          </div>
        )}

        {!loading && movies.length > 0 && <MovieList movies={movies} />}
      </div>
    </>
  );
};
export default Home;
