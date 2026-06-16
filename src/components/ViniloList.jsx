import ViniloCard from "./ViniloCard";

function ViniloList({ vinilos }) {
  return (
    <div className="vinilo-list">
      {vinilos.map((vinilo) => (
        <ViniloCard key={vinilo._id} vinilo={vinilo} />
      ))}
    </div>
  );
}

export default ViniloList;
