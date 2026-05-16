import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

/* ✅ IMPORT POLICY TYPE TABS */
import PolicyTypeTabs from "../admin/components/PolicyTypeTabs";

const badge = {
  draft: "bg-yellow-100 text-yellow-700",
  active: "bg-green-100 text-green-700",
  inactive: "bg-gray-200 text-gray-600",
};

const AdminPolicyCatalog = () => {
  const navigate = useNavigate();

  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ✅ NEW STATE FOR FILTER TABS */
  const [activeType, setActiveType] = useState("all");

  useEffect(() => {
    fetchPolicies();
  }, []);

  const fetchPolicies = async () => {
    try {
      const res = await axios.get("/admin/policies");
      setPolicies(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load policies");
    } finally {
      setLoading(false);
    }
  };

  /* ✅ FILTER LOGIC (NON-DESTRUCTIVE) */
  const filteredPolicies =
    activeType === "all"
      ? policies
      : policies.filter(
          (policy) =>
            policy.policy_type?.toLowerCase() === activeType.toLowerCase()
        );

  if (loading) {
    return <div className="p-6">Loading policies...</div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Policy Catalog
          </h1>
          <p className="text-sm text-gray-500">
            Manage all insurance policies
          </p>
        </div>

        {/* RIGHT SIDE BUTTONS */}
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/admin/policies/view/savedpolicies")}
            className="px-5 py-2 w-48 rounded-lg border border-indigo-600 text-indigo-600 text-sm font-medium hover:bg-indigo-50"
          >
            View Saved Policies
          </button>

          <button
            onClick={() => navigate("/admin/policies/add")}
            className="px-5 py-2 w-40 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700"
          >
            Add New Policy
          </button>
        </div>
      </div>

      {/* ================= POLICY TYPE TABS ================= */}
      <PolicyTypeTabs
        activeTab={activeType}
        onChange={setActiveType}
      />

      {/* ================= TABLE ================= */}
      <div className="mt-6 bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200 text-gray-500">
            <tr>
              <th className="px-6 py-3 text-left">Policy ID</th>
              <th className="px-6 py-3 text-left">Insurance Type</th>
              <th className="px-6 py-3 text-left">Premium</th>
              <th className="px-6 py-3 text-left">Policy Number</th>
              <th className="px-6 py-3 text-left">Renewal Date</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredPolicies.length === 0 && (
              <tr>
                <td
                  colSpan="7"
                  className="px-6 py-8 text-center text-gray-500"
                >
                  No policies found
                </td>
              </tr>
            )}

            {filteredPolicies.map((policy) => (
              <tr
                key={policy.id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="px-6 py-4 font-medium text-gray-900">
                  POL-{policy.id}
                </td>

                <td className="px-6 py-4 text-gray-700">
                  {policy.policy_type}
                </td>

                <td className="px-6 py-4 text-gray-700">
                  ₹ {policy.premium?.toLocaleString("en-IN")}
                </td>

                <td className="px-6 py-4 text-gray-700">
                  {policy.policy_number || "-"}
                </td>

                <td className="px-6 py-4 text-gray-700">
                  {policy.renewal_date
                    ? new Date(policy.renewal_date).toLocaleDateString()
                    : "-"}
                </td>

                <td className="px-6 py-4">
                  {(() => {
                    const status = policy.status?.toLowerCase();

                    return (
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          badge[status] || badge.inactive
                        }`}
                      >
                        {status}
                      </span>
                    );
                  })()}
                </td>

                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() =>
                      navigate(`/admin/policies/view/${policy.id}`)
                    }
                    className="px-4 py-1.5 rounded-lg bg-indigo-600 text-white text-xs hover:bg-indigo-700"
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

export default AdminPolicyCatalog;
