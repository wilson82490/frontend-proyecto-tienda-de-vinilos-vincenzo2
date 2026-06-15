import { useNavigate } from "react-router-dom";

function MovieCard({ movie }) {
  const navigate = useNavigate();

  return (
    <article
      className="movie-card"
      onClick={() => navigate(`/movies/${movie._id}`)}
    >
      <img src={movie.image} alt={movie.title} />
      <div className="movie-card-content">
        <h3>{movie.title}</h3>
        <p>{movie.genre}</p>
        <span>{movie.year}</span>
      </div>
    </article>
  );
}

export default MovieCard;
