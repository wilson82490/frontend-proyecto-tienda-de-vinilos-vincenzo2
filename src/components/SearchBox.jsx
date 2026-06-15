import { Link } from "react-router-dom";
import { useState } from "react";

function SearchBox({ movies }) {
  const [search, setSearch] = useState("");

  const normalizedSearch = search.toLowerCase().trim();

  const results = movies
    .filter((movie) => {
      const title = movie.title.toLowerCase();
      // const description = movie?.description?.toLowerCase();
      const genre = movie.genre.toLowerCase();

      return (
        title.includes(normalizedSearch) || genre.includes(normalizedSearch)
      );
    })
    .slice(0, 3);

  return (
    <div className="search-box">
      <input
        className="search-box-input"
        type="search"
        placeholder="Buscar..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      {search.trim() != "" && (
        <div className="search-box-results">
          {results.length > 0 ? (
            results.map((movie) => (
              <Link
                key={movie._id}
                onClick={() => setSearch("")}
                className="search-box-result"
                to={`/movies/${movie._id}`}
              >
                <strong>{movie.title}</strong>
                <span>
                  {movie.genre} - {movie.year}
                </span>
              </Link>
            ))
          ) : (
            <p className="search-box-empty">No se encontraron resultados</p>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBox;
