const getApiBase = () => {
  const configuredBase = import.meta.env.VITE_API_URL;

  if (!configuredBase) {
    return "";
  }

  return configuredBase.replace(/\/+$/, "").replace(/\/api$/, "");
};

const API_URL = `${getApiBase()}/api/vinilos`;

const getToken = () => {
  const token = localStorage.getItem("token");
  return token ? `Bearer ${token}` : null;
};

const toViniloPayload = (viniloData) => {
  if (!viniloData || typeof viniloData !== "object" || Array.isArray(viniloData)) {
    throw new Error("Datos de vinilo inválidos");
  }

  return {
    title: String(viniloData.title ?? "").trim(),
    description: String(viniloData.description ?? "").trim(),
    genre: String(viniloData.genre ?? "").trim(),
    year: Number(viniloData.year),
    price: Number(viniloData.price),
    image: String(viniloData.image ?? "").trim(),
    featured: Boolean(viniloData.featured),
  };
};

const handleResponse = async (response) => {
  const contentType = response.headers.get("content-type") || "";

  if (!contentType.includes("application/json")) {
    throw new Error("Respuesta inválida del servidor");
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error en la petición");
  }

  return data;
};

export const getVinilos = async ({
  sortBy = "title",
  order = "asc",
  search = "",
  genre,
  page = 1,
  limit = 4,
} = {}) => {
  const params = new URLSearchParams({
    sortBy,
    order,
    search,
    page: String(page),
    limit: String(limit),
  });

  if (genre) {
    params.set("genre", genre);
  }

  const response = await fetch(`${API_URL}?${params.toString()}`);

  return handleResponse(response);
};

export const getVinilosGenres = async () => {
  const response = await fetch(`${API_URL}/genres`);

  return handleResponse(response);
};

export const getVinilosFeatured = async () => {
  const response = await fetch(`${API_URL}/featured`);

  return handleResponse(response);
};

export const getViniloById = async (viniloId) => {
  const response = await fetch(`${API_URL}/${viniloId}`);

  return handleResponse(response);
};

export const createVinilo = async (viniloData) => {
  const token = getToken();

  if (!token) {
    throw new Error("No autorizado");
  }

  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: token },
    body: JSON.stringify(toViniloPayload(viniloData)),
  });

  return handleResponse(response);
};

export const updateVinilo = async (viniloId, viniloData) => {
  const token = getToken();

  if (!token) {
    throw new Error("No autorizado");
  }

  if (!viniloId) {
    throw new Error("ID de vinilo inválido");
  }

  const response = await fetch(`${API_URL}/${encodeURIComponent(String(viniloId))}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: token },
    body: JSON.stringify(toViniloPayload(viniloData)),
  });

  return handleResponse(response);
};

export const deleteVinilo = async (viniloId) => {
  const token = getToken();

  if (!token) {
    throw new Error("No autorizado");
  }

  const response = await fetch(`${API_URL}/${viniloId}`, {
    method: "DELETE",
    headers: { Authorization: token },
  });

  return handleResponse(response);
};
