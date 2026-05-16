const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export async function signup({ email, password }) {
  if (!BASE_URL) {
    throw new Error("API base URL is not defined");
  }

  const res = await fetch(
    `${BASE_URL}/auth/register?email=${encodeURIComponent(
      email
    )}&password=${encodeURIComponent(password)}`,
    {
      method: "POST",
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || data.message || "Signup failed");
  }

  return data;
}
