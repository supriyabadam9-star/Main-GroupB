import { useEffect } from "react";

export default function TestFetch() {
  useEffect(() => {
    fetch("http://127.0.0.1:8000/dashboard/1")
      .then((res) => res.json())
      .then((data) => console.log("Dashboard data:", data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  return <div>Testing fetch...</div>;
}