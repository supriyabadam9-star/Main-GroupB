import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PolicyCatalog = () => {
  const navigate = useNavigate();

  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);

  const [status, setStatus] = useState("all");
  const [type, setType] = useState("all");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/admin/policies")
      .then((res) => {
        setPolicies(res.data);
        setLoading(false);
      })
      .catch(() => {
        alert("Failed to load policies");
        setLoading(false);
      });
  }, []);

  const filteredPolicies = policies.filter((p) => {
    if (status !== "all" && p.status !== status) return false;
    if (type !== "all" && p.policy_type !== type) return false;
    return true;
  });

  if (loading) {
    return <div className="p-6">Loading policies...</div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Policy Catalog</h1>
          <p className="text-sm text-gray-500">
            Manage all insurance policies
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/policies/add")}
          className="px-4 py-2 w-40 bg-indigo-600 text-white rounded-lg text-sm"
        >
          Add New Policy
        </button>
      </div>

      {/* STATUS FILTER */}
      <div className="flex gap-2 mb-4 ">
        {["all", "draft", "active", "inactive"].map((s) => (
          <button
            key={s}
            onClick={() => setStatus(s)}
            className={`px-4 py-1.5 rounded border text-sm ${
              status === s ? "bg-indigo-600 text-white" : "bg-white"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* TYPE FILTER */}
      <div className="flex gap-2 mb-4">
        {[
          "all",
          "Health",
          "Life",
          "Motor",
          "Home",
          "Fire",
          "Business",
          "Travel",
        ].map((t) => (
          <button
            key={t}
            onClick={() => setType(t)}
            className={`px-3 py-1.5 rounded border text-sm ${
              type === t ? "bg-indigo-100" : "bg-white"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* TABLE */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left">Policy ID</th>
              <th className="px-4 py-3 text-left">Policy Name</th>
              <th className="px-4 py-3 text-left">Insurance Type</th>
              <th className="px-4 py-3 text-left">Company</th>
              <th className="px-4 py-3 text-left">Coverage Amount</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredPolicies.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">
                  No policies found
                </td>
              </tr>
            )}

            {filteredPolicies.map((policy) => (
              <tr key={policy.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">POL-{policy.id}</td>
                <td className="px-4 py-3">{policy.policy_name}</td>
                <td className="px-4 py-3">{policy.policy_type}</td>
                <td className="px-4 py-3">{policy.company || "-"}</td>
                <td className="px-4 py-3">
                  ₹ {policy.coverage_amount || "-"}
                </td>
                <td className="px-4 py-3 capitalize">{policy.status}</td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() =>
                      navigate(`/admin/policies/view/${policy.id}`)
                    }
                    className="px-3 py-1.5 bg-indigo-600 text-white rounded text-xs"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PolicyCatalog;
