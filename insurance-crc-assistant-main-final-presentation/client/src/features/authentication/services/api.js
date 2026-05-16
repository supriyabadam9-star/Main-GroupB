const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function apiFetch(endpoint, options = {}) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error("API request failed");
  }

  return response.json();
}
