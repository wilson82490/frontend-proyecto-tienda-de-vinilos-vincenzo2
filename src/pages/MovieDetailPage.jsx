import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieById } from "../services/movieService";

function MovieDetailPage() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // const movie = movies.find((m) => m.id == id); // 1 == '1'
  //   const movie = movies.find((m) => m.id === Number(id)); // 1 === 1

  useEffect(() => {
    const loadMovie = async () => {
      try {
        const data = await getMovieById(id);
        setMovie(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadMovie();
  }, [id]);

  if (loading) {
    return <p className="empty-message">Cargando pelicula</p>;
  }

  if (error || !movie) {
    return (
      <main>
        <section className="catalog-section">
          <div className="container">
            <h1>{error || "Contenido no encontrado"}</h1>

            <Link className="button" to="/movies">
              Volver al catalogo
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="catalog-section">
        <div className="container">
          <article className="movie-detail">
            {/* <img src={`/images/${movie.image}`} alt="" /> */}
            <img src={movie.image} alt={movie.title} />

            <div className="movie-detail-content">
              <h1>{movie.title}</h1>

              <p className="movie-detail-description">{movie?.description}</p>
              <p>Genero: {movie.genre}</p>
              <span>Año: {movie.year}</span>
            </div>
          </article>

          <Link className="button" to="/movies">
            Volver al catalogo
          </Link>
        </div>
      </section>
    </main>
  );
}

export default MovieDetailPage;
