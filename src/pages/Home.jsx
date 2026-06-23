import ViniloList from "../components/ViniloList";
import { Link } from "react-router-dom";
import ViniloCarousel from "../components/ViniloCarousel";
import { useState, useEffect } from "react";
import { getVinilos, getVinilosFeatured } from "../services/viniloService";

function Home() {
  const [featuredVinilos, setFeaturedVinilos] = useState([]);
  const [newVinilos, setNewVinilos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadVinilos = async () => {
      try {
        const dataFeatured = await getVinilosFeatured();
        setFeaturedVinilos(dataFeatured.vinilos);

        const dataNew = await getVinilos({
          sortBy: "year",
          order: "desc",
          limit: 3,
        });
        setNewVinilos(dataNew.vinilos);
      } catch {
        setError("No se pudieron cargar los vinilos");
      } finally {
        setLoading(false);
      }
    };

    loadVinilos();
  }, []);

  if (loading) {
    return (
      <main>
        <section className="hero">
          <div className="container">
            <p className="empty-message">Cargando vinilos...</p>
          </div>
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <section className="hero">
          <div className="container">
            <p className="empty-message">{error}</p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="hero">
        <div className="container">
          <div className="hero-logo-wrap">
            <img
              src="/images/logoEncabezadero.png"
              alt="Logo Catálogo de Vinilos"
              className="hero-logo"
            />
          </div>
          <span className="hero-label">Proyecto final</span>
          <h1>Catálogo de Vinilos</h1>
          <p>
            Explora vinilos, consulta sus detalles y administra el contenido
            desde un panel privado.
          </p>

          <Link className="button" to="/vinilos">
            Ver catálogo
          </Link>
        </div>
      </section>

      {featuredVinilos.length > 0 && (
        <section className="featured-section">
          <div className="container">
            <h2>Contenido destacado</h2>
            <ViniloList vinilos={featuredVinilos} />
          </div>
        </section>
      )}

      {featuredVinilos.length > 0 && (
        <ViniloCarousel vinilos={featuredVinilos} />
      )}

      {newVinilos.length > 0 && (
        <section className="new-vinilos-section">
          <div className="container">
            <h2>Nuevos vinilos</h2>
            <ViniloList vinilos={newVinilos} />
          </div>
        </section>
      )}
    </main>
  );
}

export default Home;
