const getApiBase = () => {
  const configuredBase = import.meta.env.VITE_API_URL;

  if (!configuredBase) {
    return "";
  }

  return configuredBase.replace(/\/+$/, "").replace(/\/api$/, "");
};

const API_URL = `${getApiBase()}/api/auth`;

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

export const register = async (userData) => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  return handleResponse(response);
};

export const login = async (userData) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  return handleResponse(response);
};
