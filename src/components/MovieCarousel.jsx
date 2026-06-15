import MovieCard from "./MovieCard";

function MovieCarousel({ movies }) {
  return (
    <section className="movie-carousel-section">
      <div className="container">
        <div className="movie-carousel-header">
          <h2>Contenido destacado</h2>
          <span>Desleza para ver mas</span>
        </div>

        <div className="movie-carousel">
          {movies.map((movie) => (
            <div className="movie-carousel-item" key={movie._id}>
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default MovieCarousel;
