import ViniloCard from "./ViniloCard";

function ViniloCarousel({ vinilos }) {
  return (
    <section className="vinilo-carousel-section">
      <div className="container">
        <div className="vinilo-carousel-header">
          <h2>Contenido destacado</h2>
          <span>Desleza para ver mas</span>
        </div>

        <div className="vinilo-carousel">
          {vinilos.map((vinilo) => (
            <div className="vinilo-carousel-item" key={vinilo._id}>
              <ViniloCard vinilo={vinilo} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ViniloCarousel;
