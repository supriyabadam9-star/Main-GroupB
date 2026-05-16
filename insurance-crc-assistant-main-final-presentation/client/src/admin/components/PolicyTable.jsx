import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PolicyTable = ({ activeType }) => {
  const navigate = useNavigate();
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPolicies = async () => {
      try {
        const res = await fetch(
          "http://127.0.0.1:8000/admin/policies"
        );
        const data = await res.json();
        setPolicies(data);
      } catch (err) {
        console.error("Failed to load policies", err);
      } finally {
        setLoading(false);
      }
    };

    loadPolicies();
  }, []);

  if (loading) {
    return (
      <div className="text-gray-500 text-sm">
        Loading policies...
      </div>
    );
  }

  const filtered =
    activeType === "all"
      ? policies
      : policies.filter(
          (p) =>
            p.policy_type?.toLowerCase() === activeType ||
            (activeType === "motor" &&
              p.policy_type?.toLowerCase() === "auto")
        );

  if (filtered.length === 0) {
    return (
      <div className="text-gray-500 text-sm">
        No policies found.
      </div>
    );
  }

  return (
    <table className="w-full text-sm border-collapse">
      <thead className="text-gray-500 border-b">
        <tr>
          <th className="text-left py-3">Policy ID</th>
          <th className="text-left">Type</th>
          <th className="text-left">Premium</th>
          <th className="text-left">Renewal</th>
          <th className="text-left">Status</th>
          <th className="text-left">Actions</th>
        </tr>
      </thead>

      <tbody>
        {filtered.map((p) => {
          const status = p.status?.toLowerCase();

          return (
            <tr
              key={p.id}
              className="border-b last:border-none hover:bg-gray-50"
            >
              <td className="py-4 font-medium">
                {p.policy_number}
              </td>

              <td>{p.policy_type}</td>

              <td>
                ₹{Number(p.premium).toLocaleString()}
              </td>

              <td>
                {new Date(
                  p.renewal_date
                ).toLocaleDateString()}
              </td>

              <td>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    status === "active"
                      ? "bg-green-100 text-green-700"
                      : status === "draft"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {p.status}
                </span>
              </td>

              <td className="flex gap-2">
                {/* VIEW BUTTON */}
                <button
                  onClick={() =>
                    navigate(
                      `/admin/policies/view/${p.id}`
                    )
                  }
                  className="px-4 py-1.5 rounded-lg text-xs font-medium bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  View
                </button>

                {/* OPTIONAL EDIT BUTTON */}
                <button
                  onClick={() =>
                    navigate(
                      `/admin/policies/${p.id}/edit`
                    )
                  }
                  className="px-4 py-1.5 rounded-lg text-xs font-medium border border-gray-300 hover:bg-gray-100"
                >
                  Edit
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default PolicyTable;
