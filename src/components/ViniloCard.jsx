import { useNavigate } from "react-router-dom";

function ViniloCard({ vinilo }) {
  const navigate = useNavigate();

  const goToDetail = () => navigate(`/vinilos/${vinilo._id}`);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      goToDetail();
    }
  };

  return (
    <article
      className="vinilo-card"
      role="button"
      tabIndex={0}
      title={`Ver detalle de ${vinilo.title}`}
      onClick={goToDetail}
      onKeyDown={handleKeyDown}
    >
      <img src={vinilo.image} alt={vinilo.title} />
      <div className="vinilo-card-content">
        <h3>{vinilo.title}</h3>
        <p>{vinilo.genre}</p>
        <span>{vinilo.year}</span>
      </div>
    </article>
  );
}

export default ViniloCard;
