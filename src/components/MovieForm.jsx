import { categories } from "../data/categories";
import { useEffect, useState } from "react";

const initialForm = {
  title: "",
  description: "",
  genre: "",
  year: "",
  image: "",
  featured: false,
};

function MovieForm({ onCreateMovie, movie, onUpdateMovie, isSaving }) {
  const [form, setForm] = useState(initialForm);

  const isEditing = Boolean(movie);

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

    if (isEditing) {
      await onUpdateMovie(movie._id, form);
    } else {
      await onCreateMovie(form);
    }

    setForm(initialForm);
  };

  useEffect(() => {
    if (movie) {
      setForm({
        ...initialForm,
        ...movie,
      });
    }
  }, [movie]);

  return (
    <form className="movie-form" onSubmit={handleSubmit}>
      <h2>{isEditing ? "Editar pelicula" : "Nueva Pelicula"}</h2>

      <div className="form-group">
        <label htmlFor="title">Titulo: </label>
        <input
          type="text"
          placeholder="Matrix"
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
        className="button movie-form-button"
        type="submit"
      >
        {/* {isSaving
          ? "Guardando"
          : isEditing
            ? "Actualizar pelicula"
            : "Crear pelicula"} */}

        {isSaving ? "Guardando..." : "Guardar pelicula"}
      </button>

      <pre>{JSON.stringify(form, null, 2)}</pre>
    </form>
  );
}

export default MovieForm;
