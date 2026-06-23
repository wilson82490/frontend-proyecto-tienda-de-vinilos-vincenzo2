import ViniloList from "../components/ViniloList";
import { useState, useEffect } from "react";
import { getVinilos, getVinilosGenres } from "../services/viniloService";
import ViniloFilters from "../components/ViniloFilters";

const LIMIT = 4;

const getSortParams = (sortBy) => {
  if (sortBy === "az") {
    return { sortBy: "title", order: "asc" };
  }

  if (sortBy === "za") {
    return { sortBy: "title", order: "desc" };
  }

  if (sortBy === "newest") {
    return { sortBy: "year", order: "desc" };
  }

  if (sortBy === "oldest") {
    return { sortBy: "year", order: "asc" };
  }

  return { sortBy: "title", order: "asc" };
};

function VinilosPage() {
  const [vinilos, setVinilos] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [page, setPage] = useState(1);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);
      setPage(1);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const data = await getVinilosGenres();
        setGenres(data);
      } catch {
        setError("No se pudieron cargar los géneros");
      }
    };

    loadGenres();
  }, []);

  useEffect(() => {
    const loadVinilos = async () => {
      try {
        setLoading(true);
        setError("");

        const { sortBy: apiSortBy, order } = getSortParams(sortBy);

        const data = await getVinilos({
          sortBy: apiSortBy,
          order,
          search,
          genre: selectedGenre || undefined,
          page,
          limit: LIMIT,
        });

        setVinilos(data.vinilos);
        setTotalPages(data.totalPages);
        setTotalItems(data.totalItems);
      } catch {
        setError("No se pudieron cargar los vinilos");
      } finally {
        setLoading(false);
      }
    };

    loadVinilos();
  }, [search, selectedGenre, sortBy, page]);

  const handleGenreChange = (value) => {
    setSelectedGenre(value);
    setPage(1);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    setPage(1);
  };

  const hasResults = vinilos.length > 0;
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  if (loading && vinilos.length === 0 && !error) {
    return (
      <main>
        <section className="catalog-section">
          <div className="container">
            <p className="empty-message">Cargando vinilos...</p>
          </div>
        </section>
      </main>
    );
  }

  if (error && vinilos.length === 0) {
    return (
      <main>
        <section className="catalog-section">
          <div className="container">
            <p className="empty-message">{error}</p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="catalog-section">
        <div className="container">
          <div className="section-header">
            <h2>Explorar catálogo</h2>
            <p>Busca vinilos por título y descripción.</p>
          </div>

          <ViniloFilters
            search={searchInput}
            selectedGenre={selectedGenre}
            sortBy={sortBy}
            genres={genres}
            onSearchChange={setSearchInput}
            onGenreChange={handleGenreChange}
            onSortChange={handleSortChange}
          />

          {loading && <p className="catalog-status">Actualizando resultados...</p>}

          {hasResults ? (
            <>
              <p className="catalog-results">
                {totalItems} {totalItems === 1 ? "resultado" : "resultados"}
              </p>

              <ViniloList vinilos={vinilos} />

              <div className="vinilo-pagination">
                <button
                  className="button pagination-button"
                  type="button"
                  disabled={!hasPrevPage}
                  onClick={() => setPage((currentPage) => currentPage - 1)}
                >
                  Anterior
                </button>

                <span className="pagination-info">
                  Página {page} de {totalPages}
                </span>

                <button
                  className="button pagination-button"
                  type="button"
                  disabled={!hasNextPage}
                  onClick={() => setPage((currentPage) => currentPage + 1)}
                >
                  Siguiente
                </button>
              </div>
            </>
          ) : (
            !loading && (
              <p className="empty-message">
                No encontramos resultados para la búsqueda
              </p>
            )
          )}
        </div>
      </section>
    </main>
  );
}

export default VinilosPage;
