import { useNavigate } from "react-router-dom";

export default function MyPolicies({ policies = [] }) {
  const navigate = useNavigate();

  if (!policies.length) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 text-center">
        <p className="text-gray-500 text-sm">No policies found.</p>
      </div>
    );
  }

  const statusColors = {
    active: "bg-green-100 text-green-700",
    renewing: "bg-yellow-100 text-yellow-700",
    expired: "bg-red-100 text-red-700",
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">My Policies</h3>

        <button
          onClick={() => navigate("/catalog")}
          className="text-blue-600 text-sm hover:underline"
        >
          View All →
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {policies.map((policy) => {
          const status = (policy.status || "").toLowerCase();
          const badgeStyle =
            statusColors[status] || "bg-gray-100 text-gray-700";

          return (
            <div
              key={policy.id}
              className="border rounded-lg p-4 shadow-sm bg-gray-50"
            >
              <h4 className="text-md font-semibold text-gray-800 mb-1">
                {policy.policy_type || "Insurance"}
              </h4>

              <p className="text-sm text-gray-600 mb-1">
                <strong>Policy #:</strong> {policy.policy_number}
              </p>

              <p className="text-sm text-gray-600 mb-1">
                <strong>Premium:</strong> ₹{policy.premium}/mo
              </p>

              <p className="text-sm text-gray-600 mb-1">
                <strong>Next Renewal:</strong>{" "}
                {policy.renewal_date
                  ? new Date(policy.renewal_date).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                  : "N/A"}
              </p>

              <span
                className={`inline-block mt-2 px-3 py-1 text-xs font-medium rounded-full ${badgeStyle}`}
              >
                {(policy.status || "unknown").toUpperCase()}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
