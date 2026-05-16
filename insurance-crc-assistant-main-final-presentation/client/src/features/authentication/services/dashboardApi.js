const BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000";

export async function fetchDashboardData(userId) {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("User not authenticated");
  }

  const res = await fetch(`${BASE_URL}/dashboard/${userId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Dashboard API error:", errorText);
    throw new Error("Failed to load dashboard");
  }

  return res.json();
}
