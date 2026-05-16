
export default function PoliciesTable({ policies = [] }) {
  if (!policies.length) {
    return (
      <div className="bg-white rounded shadow p-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold">My Policies</h2>
          <button className="text-blue-600 text-sm">View All →</button>
        </div>
        <p className="text-gray-500 text-sm">No policies found.</p>
      </div>
    );
  }

  
  return (
    <div className="bg-white rounded shadow p-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold">My Policies</h2>
        <button className="text-blue-600 text-sm">View All →</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-gray-600">
            <tr>
              <th className="text-left p-2">Type</th>
              <th className="text-left p-2">Policy #</th>
              <th className="text-left p-2">Premium</th>
              <th className="text-left p-2">Status</th>
              <th className="text-left p-2">Next Renewal</th>
            </tr>
          </thead>
          <tbody>
            {policies.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="p-2">{p.policy_type}</td>
                <td className="p-2">{p.policy_number || "—"}</td>
                <td className="p-2">
                  {p.premium
                    ? p.premium.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })
                    : "—"}
                </td>
                <td className="p-2">
                  <span
                    className={`font-semibold ${
                      p.status === "Active"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="p-2">
                  {p.renewal_date
                    ? new Date(p.renewal_date).toLocaleDateString()
                    : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}