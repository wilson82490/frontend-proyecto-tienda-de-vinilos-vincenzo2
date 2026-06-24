import { categories } from "../data/categories";
import { useState } from "react";

const initialForm = {
  title: "",
  description: "",
  genre: "",
  year: "",
  price: "",
  image: "",
  featured: false,
};

const getInitialForm = (vinilo) => ({
  ...initialForm,
  ...vinilo,
});

function ViniloForm({ onCreateVinilo, vinilo, onUpdateVinilo, isSaving }) {
  const [form, setForm] = useState(() => getInitialForm(vinilo));

  const isEditing = Boolean(vinilo);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm({
      ...form,
      [name]: type == "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.title.trim()) {
      alert("Ingrese el titulo");
      return;
    }

    if (!form.description.trim()) {
      alert("Ingrese una descripción");
      return;
    }

    //     !""
    if (!form.genre) {
      alert("Seleccione un genero");
      return;
    }

    if (!form.image.trim()) {
      alert("Ingrese una imagen");
      return;
    }

    if (!form.year) {
      alert("Ingrese un año");
      return;
    }

    if (!form.price && form.price !== 0) {
      alert("Ingrese un precio");
      return;
    }

    if (Number(form.price) < 0) {
      alert("El precio no puede ser negativo");
      return;
    }

    if (isEditing) {
      await onUpdateVinilo(vinilo._id, form);
    } else {
      await onCreateVinilo(form);
    }

    setForm(initialForm);
  };

  return (
    <form className="vinilo-form" onSubmit={handleSubmit}>
      <h2>{isEditing ? "Editar vinilo" : "Nuevo Vinilo"}</h2>

      <div className="form-group">
        <label htmlFor="title">Titulo: </label>
        <input
          type="text"
          placeholder="Abbey Road"
          id="title"
          name="title"
          value={form.title}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Descripción: </label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
        ></textarea>
      </div>

      <div className="form-group">
        <label htmlFor="genre">Genero: </label>
        <select
          id="genre"
          name="genre"
          value={form.genre}
          onChange={handleChange}
        >
          <option value="">Selecionar un genero</option>
          {categories.map((category) => (
            <option key={category.id} value={category.title}>
              {category.title}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="year">Año: </label>
        <input
          type="number"
          name="year"
          id="year"
          value={form.year}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="price">Precio (€): </label>
        <input
          type="number"
          name="price"
          id="price"
          min="0"
          step="0.01"
          value={form.price}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="image">Imagen: </label>
        <input
          type="text"
          name="image"
          id="image"
          value={form.image}
          onChange={handleChange}
          placeholder="https://..."
        />
      </div>

      {form.image.trim() && (
        <div className="image-preview">
          <img src={form.image} alt="Vista previa" />
        </div>
      )}

      <div className="form-group">
        <label htmlFor="featured">Destacado: </label>
        <input
          type="checkbox"
          name="featured"
          id="featured"
          checked={form.featured}
          onChange={handleChange}
        />
      </div>

      <button
        disabled={isSaving}
        className="button vinilo-form-button"
        type="submit"
      >
        {/* {isSaving
          ? "Guardando"
          : isEditing
            ? "Actualizar vinilo"
            : "Crear vinilo"} */}

        {isSaving ? "Guardando..." : "Guardar vinilo"}
      </button>
    </form>
  );
}

export default ViniloForm;
