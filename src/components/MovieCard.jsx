const MovieCard = ({ movie }) => {
  return (
    <div className="bg-white rounded-md shadow-md overflow-hidden hover:shadow-xl transition-all">
      <div className="relative overflow-hidden">
        {/* 图片容器 */}
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          // Tailwind: object-cover (保持比例填满), w-full (宽度100%), group-hover:scale-110 (放大动画)
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded-md text-sm backdrop-blur-sm">
          ⭐ {movie.vote_average.toFixed(1)}
        </div>
        {/* 内容区域 */}
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-800 truncate">
            {movie.title}
          </h3>
          <p className="text-gray-500 text-sm mt-1">{movie.release_date}</p>
        </div>
      </div>
    </div>
  );
};
export default MovieCard;
