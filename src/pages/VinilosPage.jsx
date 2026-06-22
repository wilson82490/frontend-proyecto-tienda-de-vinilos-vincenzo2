import ViniloList from "../components/ViniloList";
import { useState, useEffect } from "react";
import { getVinilos } from "../services/viniloService";
import ViniloFilters from "../components/ViniloFilters";
import { categories } from "../data/categories";

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("Todos");
  const [sortBy, setSortBy] = useState("default");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const loadVinilos = async () => {
      try {
        setLoading(true);
        setError("");

        const { sortBy: apiSortBy, order } = getSortParams(sortBy);

        const { data, totalPages: pages } = await getVinilos({
          sortBy: apiSortBy,
          order,
          search,
          genre: selectedGenre !== "Todos" ? selectedGenre : undefined,
          page,
          limit: LIMIT,
        });

        setVinilos(data);
        setTotalPages(pages);
      } catch {
        setError("No se pudieron cargar los vinilos");
      } finally {
        setLoading(false);
      }
    };

    loadVinilos();
  }, [search, selectedGenre, sortBy, page]);

  const handleSearchChange = (value) => {
    setSearch(value);
    setPage(1);
  };

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

  const genres = ["Todos", ...categories.map((category) => category.title)];

  if (loading) {
    return <p className="empty-message">Cargando vinilos...</p>;
  }

  if (error) {
    return <p className="empty-message">{error}</p>;
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
            search={search}
            selectedGenre={selectedGenre}
            sortBy={sortBy}
            genres={genres}
            onSearchChange={handleSearchChange}
            onGenreChange={handleGenreChange}
            onSortChange={handleSortChange}
          />

          {hasResults ? (
            <>
              <ViniloList vinilos={vinilos} />

              <div className="vinilo-pagination">
                <button
                  className="button"
                  type="button"
                  disabled={!hasPrevPage}
                  onClick={() => setPage((currentPage) => currentPage - 1)}
                >
                  Anterior
                </button>

                <span>Página {page}</span>

                <button
                  className="button"
                  type="button"
                  disabled={!hasNextPage}
                  onClick={() => setPage((currentPage) => currentPage + 1)}
                >
                  Siguiente
                </button>
              </div>
            </>
          ) : (
            <p className="empty-message">
              No encontramos resultados para la búsqueda
            </p>
          )}
        </div>
      </section>
    </main>
  );
}

export default VinilosPage;
