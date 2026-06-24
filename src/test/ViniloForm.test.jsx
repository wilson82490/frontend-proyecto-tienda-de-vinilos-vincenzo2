import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import ViniloForm from "../components/ViniloForm";

const vinilo = {
  _id: "1",
  title: "Abbey Road",
  description: "Un clásico de The Beatles",
  genre: "Rock",
  year: 1969,
  price: 34.99,
  image: "https://example.com/abbey-road.jpg",
  featured: true,
};

const renderCreateForm = (props = {}) => {
  const onCreateVinilo = vi.fn();
  const onUpdateVinilo = vi.fn();

  render(
    <ViniloForm
      onCreateVinilo={onCreateVinilo}
      onUpdateVinilo={onUpdateVinilo}
      {...props}
    />,
  );

  return { onCreateVinilo, onUpdateVinilo };
};

describe("ViniloForm", () => {
  it("espero que muestre el formulario para crear un vinilo", () => {
    renderCreateForm();

    expect(screen.getByRole("heading", { name: "Nuevo Vinilo" })).toBeInTheDocument();
    expect(screen.getByLabelText("Titulo:")).toBeInTheDocument();
    expect(screen.getByLabelText("Descripción:")).toBeInTheDocument();
    expect(screen.getByLabelText("Genero:")).toBeInTheDocument();
    expect(screen.getByLabelText("Año:")).toBeInTheDocument();
    expect(screen.getByLabelText("Precio (€):")).toBeInTheDocument();
    expect(screen.getByLabelText("Imagen:")).toBeInTheDocument();
    expect(screen.getByLabelText("Destacado:")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Guardar vinilo" })).toBeInTheDocument();
  });

  it("muestra los valores del vinilo en modo edición", () => {
    renderCreateForm({ vinilo });

    expect(screen.getByRole("heading", { name: "Editar vinilo" })).toBeInTheDocument();
    expect(screen.getByLabelText("Titulo:")).toHaveValue("Abbey Road");
    expect(screen.getByLabelText("Descripción:")).toHaveValue("Un clásico de The Beatles");
    expect(screen.getByLabelText("Genero:")).toHaveValue("Rock");
    expect(screen.getByLabelText("Año:")).toHaveValue(1969);
    expect(screen.getByLabelText("Precio (€):")).toHaveValue(34.99);
    expect(screen.getByLabelText("Imagen:")).toHaveValue("https://example.com/abbey-road.jpg");
    expect(screen.getByLabelText("Destacado:")).toBeChecked();
  });

  it("deshabilita el botón y muestra Guardando... mientras guarda", () => {
    renderCreateForm({ isSaving: true });

    const submitButton = screen.getByRole("button", { name: "Guardando..." });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });
});
