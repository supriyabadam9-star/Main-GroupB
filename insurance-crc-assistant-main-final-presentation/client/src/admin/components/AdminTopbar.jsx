import { useNavigate } from "react-router-dom";

const AdminTopbar = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        background: "#ffffff",
        padding: "20px 24px",
        borderBottom: "1px solid #e5e7eb",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* LEFT */}
      <div>
        <h2 style={{ margin: 0 }}>Policy Catalog</h2>
        <p style={{ margin: 0, color: "#6b7280", fontSize: "14px" }}>
          Manage all insurance policies.
        </p>
      </div>

      {/* RIGHT */}
      <div style={{ display: "flex", gap: "12px" }}>
        <button
          onClick={() => navigate("/admin/policies/saved")}
          style={{
            padding: "10px 14px",
            borderRadius: "10px",
            border: "1px solid #e5e7eb",
            background: "#fff",
            cursor: "pointer",
            fontWeight: "500",
          }}
        >
          View Saved Policies
        </button>

        <button
          onClick={() => navigate("/admin/policies/add")}
          style={{
            padding: "10px 16px",
            borderRadius: "10px",
            border: "none",
            background: "#4f46e5",
            color: "#fff",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          + Add New Policy
        </button>
      </div>
    </div>
  );
};

export default AdminTopbar;
