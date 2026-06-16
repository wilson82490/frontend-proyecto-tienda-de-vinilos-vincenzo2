import ViniloList from "../components/ViniloList";
import { Link } from "react-router-dom";
import ViniloCarousel from "../components/ViniloCarousel";
import { useState, useEffect } from "react";
import { getVinilos } from "../services/viniloService";

function Home() {
  const [vinilos, setVinilos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // const modaProducts = vinilos.filter((product) =>
  //   product?.category?.startsWith("Moda"),
  // );

  useEffect(() => {
    const loadVinilos = async () => {
      try {
        const data = await getVinilos();
        // console.log(data);
        setVinilos(data);
      } catch {
        setError("No se pudieron cargar los vinilos");
      } finally {
        setLoading(false);
      }
    };
    loadVinilos();
  }, []);

  const featuredVinilos = vinilos.filter((vinilo) => vinilo.featured);
  const newVinilos = vinilos.slice(0, 3); // 3 primeras

  if (loading) {
    return <p className="empty-message">Cargando vinilos...</p>;
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
          <h1>Catálogo de Vinilos</h1>
          <p>
            Explora vinilos, consulta sus detalles y administra el
            contenido desde un panel privado.
          </p>

          {/* <SearchBox vinilos={vinilos} /> */}

          <Link className="button" to="/vinilos">
            Ver catálogo
          </Link>
        </div>
      </section>

      <section className="featured-section">
        <div className="container">
          <h2>Contenido destacado</h2>

          <ViniloList vinilos={featuredVinilos} />
        </div>
      </section>

      <ViniloCarousel vinilos={vinilos} />

      <section className="new-vinilos-section">
        <div className="container">
          <h2>Nuevos vinilos</h2>

          <ViniloList vinilos={newVinilos} />
        </div>
      </section>
    </main>
  );
}

export default Home;
