import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <main>
      <section className="catalog-section not-found-section">
        <div className="container not-found-content">
          <h1>Página no encontrada</h1>

          <p>La página que estás buscando no existe.</p>

          <Link to="/" className="button">
            Volver al catálogo
          </Link>
        </div>
      </section>
    </main>
  );
}

export default NotFoundPage;
