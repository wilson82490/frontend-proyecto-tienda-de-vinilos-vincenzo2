import { useEffect, useState, useRef } from "react";
import ViniloForm from "../../components/ViniloForm";
import {
  createVinilo,
  deleteVinilo,
  getVinilos,
  updateVinilo,
} from "../../services/viniloService";

function AdminVinilosPage() {
  const [showForm, setShowForm] = useState(false);
  const [vinilos, setVinilos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedVinilo, setSelectedVinilo] = useState(null);
  const [message, setMessage] = useState("");
  const [viniloToDelete, setViniloToDelete] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const messageRef = useRef(null);
  const formRef = useRef(null);

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

  const handleCreateVinilo = async (viniloData) => {
    try {
      setIsSaving(true);

      const newVinilo = await createVinilo(viniloData);

      setVinilos([...vinilos, newVinilo]);
      setShowForm(false);
      setMessage("Vinilo creado correctamente");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteVinilo = async (id) => {
    try {
      setIsSaving(true);

      await deleteVinilo(id);

      const filteredVinilos = vinilos.filter((vinilo) => vinilo._id != id);

      setVinilos(filteredVinilos);
      setViniloToDelete(null);

      setMessage("Vinilo eliminado correctamente");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateVinilo = async (viniloId, viniloData) => {
    try {
      setIsSaving(true);

      const updatedVinilo = await updateVinilo(viniloId, viniloData);

      const updatedVinilos = vinilos.map((vinilo) => {
        if (vinilo._id == viniloId) {
          return updatedVinilo;
        }

        return vinilo;
      });

      setVinilos(updatedVinilos);
      setSelectedVinilo(null);
      setShowForm(false);

      setMessage("Vinilo actualizado correctamente");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    if (!message) {
      return;
    }

    messageRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    setTimeout(() => {
      setMessage("");
    }, 3000);
  }, [message]);

  useEffect(() => {
    if (!viniloToDelete) {
      return;
    }

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        setViniloToDelete(null);
      }
    });
  }, [viniloToDelete]);

  useEffect(() => {
    if (!selectedVinilo) {
      return;
    }

    formRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [selectedVinilo]);

  if (loading) {
    return <p className="empty-message">Cargando vinilos...</p>;
  }

  if (error) {
    return <p className="empty-message">{error}</p>;
  }

  return (
    <section className="admin-section">
      {message && (
        <p ref={messageRef} className="admin-message">
          {message}
        </p>
      )}

      <div className="admin-page-header">
        <div>
          <h2>Administración de vinilos</h2>
          <p>Listado interno de vinilos.</p>
        </div>

        <button
          className="admin-create-button"
          type="button"
          onClick={() => {
            setShowForm(!showForm);
            setSelectedVinilo(null);
          }}
        >
          {showForm ? "Cerrar el formulario" : "Nuevo vinilo"}
        </button>
      </div>

      {showForm && (
        <div ref={formRef}>
          <ViniloForm
            key={selectedVinilo?._id || "new-vinilo"}
            vinilo={selectedVinilo}
            onCreateVinilo={handleCreateVinilo}
            onUpdateVinilo={handleUpdateVinilo}
            isSaving={isSaving}
          />
        </div>
      )}

      <div className="admin-list">
        {vinilos.map((vinilo) => (
          <article className="admin-list-item" key={vinilo._id}>
            <img src={vinilo.image} alt={vinilo.title} />
            <div>
              <h3>{vinilo.title}</h3>
              <p>
                {vinilo.genre} • {vinilo.year}{" "}
              </p>

              <div className="admin-actions">
                <button
                  className="admin-action-button edit"
                  type="button"
                  onClick={() => {
                    setSelectedVinilo(vinilo);
                    setShowForm(true);
                  }}
                >
                  Editar
                </button>
                <button
                  className="admin-action-button delete"
                  type="button"
                  onClick={() => setViniloToDelete(vinilo)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {viniloToDelete && (
        <div className="modal-overlay" onClick={() => setViniloToDelete(null)}>
          <div className="modal" onClick={(event) => event.stopPropagation()}>
            <h2>Eliminar vinilo</h2>

            <p>
              ¿Desea eliminar <strong>{viniloToDelete.title}</strong>?
            </p>

            <div className="modal-actions">
              <button
                disabled={isSaving}
                className="modal-button secondary"
                type="button"
                onClick={() => setViniloToDelete(null)}
              >
                Cancelar
              </button>

              <button
                disabled={isSaving}
                className="modal-button danger"
                type="button"
                onClick={() => handleDeleteVinilo(viniloToDelete._id)}
              >
                {isSaving ? "Eliminando..." : "Eliminar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default AdminVinilosPage;
