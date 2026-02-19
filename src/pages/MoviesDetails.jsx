import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Box, Button, IconButton } from "@radix-ui/themes";
import axios from "axios";
import { useEffect, useState } from "react";
import { LuArrowLeft } from "react-icons/lu";
import { useNavigate, useParams } from "react-router";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_API_URL;

const MoviesDetails = () => {
  const { movieId } = useParams(); // 获取URL中的电影ID
  const navigate = useNavigate();
  const [movie, setMovie] = useState();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        // 获取电影详情
        const movieUrl = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en`;
        const movieResponse = await axios.get(movieUrl);

        // 获取推荐电影
        const recommendationsUrl = `${BASE_URL}/movie/${movieId}/recommendations?api_key=${API_KEY}&language=en`;
        const recommendationsResponse = await axios.get(recommendationsUrl);

        setMovie(movieResponse.data);
        setRecommendations(recommendationsResponse.data.results || []);
      } catch (err) {
        console.error("Failed to retrieve movie details:", err);
        setError("Failed to retrieve movie details");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  // 日期格式化工具函数
  const formatDate = (dateString) => {
    if (!dateString) return "Undefined date";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en", options);
  };

  // 时长格式化工具函数
  const formatRuntime = (time) => {
    if (!time) return "Undefined runtime";
    const hours = Math.floor(time / 60);
    const mins = time % 60;
    return `${hours}h ${mins}m`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-700 mb-4">
            {error || "The movie does not exist or has been deleted."}
          </p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Return to previous page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div
        className="h-96 bg-cover bg-center relative"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-linear-to-t from-gray-900 to-transparent">
          <Box position="fixed" left="6" top="6" onClick={() => navigate(-1)}>
            <IconButton size="4" radius="full" color="gray" highContrast>
              <ArrowLeftIcon height="24" width="24" />
            </IconButton>
          </Box>
          {/* <button
            className="absolute top-6 left-6 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
            onClick={() => navigate(-1)}
          >
            <LuArrowLeft className="size-8" />
          </button> */}
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-24 relative z-10">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:shrink-0">
              <img
                className="h-96 w-full object-cover md:w-64"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://via.placeholder.com/500x750?text=No+Image";
                }}
              />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                {movie.release_date
                  ? formatDate(movie.release_date)
                  : "Undefined date"}
              </div>
              <h1 className="mt-2 text-3xl font-bold text-gray-900">
                {movie.title}
              </h1>

              <div className="mt-4 flex items-center text-gray-600">
                <span className="text-yellow-400 mr-1">★</span>
                <span>{movie.vote_average.toFixed(1)}</span>
                <span className="mx-2">•</span>
                <span>{formatRuntime(movie.runtime)}</span>
                <span className="mx-2">•</span>
                <span>{movie.genres.map((g) => g.name).join(", ")}</span>
              </div>

              <p className="mt-4 text-gray-600">
                {movie.overview || "No profile yet"}
              </p>

              <div className="mt-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  Main information
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <h3 className="font-semibold">Genres</h3>
                    <p>{movie.genres.map((g) => g.name).join(", ")}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Languages</h3>
                    <p>{movie.spoken_languages[0]?.name || "Undefined"}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Budget</h3>
                    <p>
                      {movie.budget > 0
                        ? `$${movie.budget.toLocaleString()}`
                        : "Undefined"}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Box office</h3>
                    <p>
                      {movie.revenue > 0
                        ? `$${movie.revenue.toLocaleString()}`
                        : "Undefined"}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Status</h3>
                    <p>{movie.status}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Vote</h3>
                    <p>
                      {movie.vote_average.toFixed(1)}/10 (
                      {movie.vote_count.toLocaleString()} ratings)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MoviesDetails;
