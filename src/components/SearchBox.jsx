import { Link } from "react-router-dom";
import { useState } from "react";

function SearchBox({ vinilos }) {
  const [search, setSearch] = useState("");

  const normalizedSearch = search.toLowerCase().trim();

  const results = vinilos
    .filter((vinilo) => {
      const title = vinilo.title.toLowerCase();
      // const description = vinilo?.description?.toLowerCase();
      const genre = vinilo.genre.toLowerCase();

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
        placeholder="Buscar vinilos..."
        aria-label="Buscar vinilos por título o género"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      {search.trim() != "" && (
        <div className="search-box-results" role="listbox" aria-label="Resultados de búsqueda">
          {results.length > 0 ? (
            results.map((vinilo) => (
              <Link
                key={vinilo._id}
                onClick={() => setSearch("")}
                className="search-box-result"
                to={`/vinilos/${vinilo._id}`}
              >
                <strong>{vinilo.title}</strong>
                <span>
                  {vinilo.genre} - {vinilo.year}
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
