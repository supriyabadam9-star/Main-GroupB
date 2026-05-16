import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // ✅ named import

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);

    // Optional: check role if provided
    if (role && decoded.role !== role) {
      return <Navigate to="/" replace />;
    }

    return children;
  } catch (err) {
    console.error("Invalid token:", err);
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
