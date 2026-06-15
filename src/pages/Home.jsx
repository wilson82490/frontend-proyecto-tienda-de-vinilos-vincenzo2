import MovieList from "../components/MovieList";
import { Link } from "react-router-dom";
import MovieCarousel from "../components/MovieCarousel";
import { useState, useEffect } from "react";
import { getMovies } from "../services/movieService";

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // const modaProducts = movies.filter((product) =>
  //   product?.category?.startsWith("Moda"),
  // );

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await getMovies();
        // console.log(data);
        setMovies(data);
      } catch {
        setError("No se pudieron cargar la peliculas");
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, []);

  const featuredMovies = movies.filter((movie) => movie.featured);
  const newMovies = movies.slice(0, 3); // 3 primeras

  if (loading) {
    return <p className="empty-message">Cargando peliculas...</p>;
  }

  if (error) {
    return <p className="empty-message">{error}</p>;
  }

  return (
    <main>
      <section className="hero">
        <div className="container">
          {/* <img src="https://picsum.photos/1100/200" alt="Lorem Picsum" /> */}
          <span className="hero-label">Proyecto final</span>
          <h1>Catálogo de Películas y Series</h1>
          <p>
            Explora películas y series, consulta sus detalles y administra el
            contenido desde un panel privado.
          </p>

          {/* <SearchBox movies={movies} /> */}

          <Link className="button" to="/movies">
            Ver catálogo
          </Link>
        </div>
      </section>

      <section className="featured-section">
        <div className="container">
          <h2>Contenido destacado</h2>

          <MovieList movies={featuredMovies} />
        </div>
      </section>

      <MovieCarousel movies={movies} />

      <section className="new-movies-section">
        <div className="container">
          <h2>Nuevas peliculas</h2>

          <MovieList movies={newMovies} />
        </div>
      </section>
    </main>
  );
}

export default Home;
