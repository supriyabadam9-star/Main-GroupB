import { LayoutGrid, FileText, Search } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      style={{
        width: "260px",
        background: "#ffffff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRight: "1px solid #e5e7eb",
        height: "100vh",
      }}
    >
      {/* TOP */}
      <div>
        {/* Logo */}
        <div style={{ padding: "20px", fontWeight: "600", fontSize: "18px" }}>
          🛡️ Insure Admin
        </div>

        {/* Menu */}
        <nav style={{ padding: "0 12px" }}>
          <MenuItem
            icon={<LayoutGrid size={18} />}
            label="Overview"
            active={location.pathname === "/admin/dashboard"}
            onClick={() => navigate("/admin/dashboard")}
          />

          <MenuItem
            icon={<FileText size={18} />}
            label="Policy Management"
            active={location.pathname.startsWith("/admin/policies")}
            onClick={() => navigate("/admin/policies")}
          />

          <MenuItem
            icon={<Search size={18} />}
            label="Investigations"
            active={location.pathname === "/admin/investigations"}
            onClick={() => navigate("/admin/investigations")}
          />
        </nav>
      </div>

      {/* BOTTOM */}
      <div style={{ padding: "16px" }}>
        {/* Support Card */}
        <div
          style={{
            background: "linear-gradient(135deg, #0f172a, #1e293b)",
            color: "#ffffff",
            borderRadius: "12px",
            padding: "16px",
            marginBottom: "16px",
          }}
        >
          <div style={{ fontSize: "14px", fontWeight: "600" }}>
            Need Help?
          </div>

          <div style={{ fontSize: "12px", opacity: 0.8, margin: "8px 0" }}>
            Reach out to our support team 24/7
          </div>

          {/* ✅ FIXED BUTTON */}
          <button
            onClick={() => navigate("/admin/policies/support")}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "8px",
              border: "none",
              background: "#ffffff",
              color: "#000000",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Contact Support
          </button>
        </div>

        {/* User Info */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src="https://i.pravatar.cc/40"
            alt="user"
            style={{ borderRadius: "50%" }}
          />
          <div>
            <div style={{ fontSize: "14px", fontWeight: "600" }}>
              Alex Rivera
            </div>
            <div style={{ fontSize: "12px", color: "#6b7280" }}>
              Administrator
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MenuItem = ({ icon, label, active, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "10px 12px",
        borderRadius: "8px",
        marginBottom: "6px",
        background: active ? "#eef2ff" : "transparent",
        color: active ? "#4f46e5" : "#374151",
        cursor: "pointer",
        fontWeight: active ? "600" : "500",
      }}
    >
      {icon}
      {label}
    </div>
  );
};

export default Sidebar;
