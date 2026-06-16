import ViniloList from "../components/ViniloList";
import { useState, useEffect } from "react";
import { getVinilos } from "../services/viniloService";
import ViniloFilters from "../components/ViniloFilters";
import useFilteredSortedVinilos from "../hooks/useFilteredSortedVinilos";

function VinilosPage() {
  const [vinilos, setVinilos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("Todos");
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    const loadVinilos = async () => {
      try {
        const data = await getVinilos();
        setVinilos(data);
      } catch {
        setError("No se pudieron cargar los vinilos");
      } finally {
        setLoading(false);
      }
    };
    loadVinilos();
  }, []);

  const { sortedVinilos } = useFilteredSortedVinilos(
    vinilos,
    search,
    selectedGenre,
    sortBy,
  );

  const hasResults = sortedVinilos.length > 0;

  const genres = ["Todos", ...new Set(vinilos.map((vinilo) => vinilo.genre))];

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
            onSearchChange={setSearch}
            onGenreChange={setSelectedGenre}
            onSortChange={setSortBy}
          />

          {hasResults ? (
            <ViniloList vinilos={sortedVinilos} />
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
