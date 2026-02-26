import { Link } from "react-router";
import MovieCard from "../components/MovieCard";

const MovieList = ({ movies }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
      {movies.map((movie) => (
        <Link to={`/movies/${movie.id}`} key={movie.id} className="group">
          <MovieCard movie={movie} />
        </Link>
      ))}
    </div>
  );
};

export default MovieList;
