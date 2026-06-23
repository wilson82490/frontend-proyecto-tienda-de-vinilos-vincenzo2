import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getViniloById } from "../services/viniloService";

function ViniloDetailPage() {
  const { id } = useParams();

  const [vinilo, setVinilo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // const vinilo = vinilos.find((m) => m.id == id); // 1 == '1'
  //   const vinilo = vinilos.find((m) => m.id === Number(id)); // 1 === 1

  useEffect(() => {
    const loadVinilo = async () => {
      try {
        const data = await getViniloById(id);
        setVinilo(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadVinilo();
  }, [id]);

  if (loading) {
    return <p className="empty-message">Cargando vinilo</p>;
  }

  if (error || !vinilo) {
    return (
      <main>
        <section className="catalog-section">
          <div className="container">
            <h1>{error || "Contenido no encontrado"}</h1>

            <Link className="button" to="/vinilos">
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
          <article className="vinilo-detail">
            {/* <img src={`/images/${vinilo.image}`} alt="" /> */}
            <img src={vinilo.image} alt={vinilo.title} />

            <div className="vinilo-detail-content">
              <h1>{vinilo.title}</h1>

              <div className="vinilo-detail-meta">
                <span className="vinilo-detail-genre">{vinilo.genre}</span>
                <span className="vinilo-detail-year">{vinilo.year}</span>
              </div>

              <p className="vinilo-detail-description">{vinilo?.description}</p>
            </div>
          </article>

          <Link className="button" to="/vinilos">
            Volver al catalogo
          </Link>
        </div>
      </section>
    </main>
  );
}

export default ViniloDetailPage;
