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

export const getVinilos = async () => {
  const response = await fetch(API_URL);

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
    body: JSON.stringify(viniloData),
  });

  return handleResponse(response);
};

export const updateVinilo = async (viniloId, viniloData) => {
  const token = getToken();

  if (!token) {
    throw new Error("No autorizado");
  }

  const response = await fetch(`${API_URL}/${viniloId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: token },
    body: JSON.stringify(viniloData),
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
