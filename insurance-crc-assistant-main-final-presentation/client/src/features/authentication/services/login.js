const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export async function login(email, password) {
  if (!BASE_URL) {
    throw new Error("API base URL is not defined");
  }

  // FastAPI OAuth2PasswordRequestForm expects form-urlencoded
  const formData = new URLSearchParams();
  formData.append("username", email);   // ⚠️ MUST be "username"
  formData.append("password", password);

  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData.toString(),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || "Login failed");
  }

  // ✅ Save token for ProtectedRoute & API calls
  localStorage.setItem("token", data.access_token);
  localStorage.setItem("role", data.role);

  return data;
}
