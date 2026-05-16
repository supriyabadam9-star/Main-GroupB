export default function ClaimsTable({ claims = [], policies = [] }) {
  if (!claims.length) {
    return (
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-lg font-semibold mb-2">Claims history</h2>
        <p className="text-gray-500 text-sm">No claims found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="text-lg font-semibold mb-2">Claims history</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-gray-600">
            <tr>
              <th className="text-left p-2">Date</th>
              <th className="text-left p-2">Policy</th>
              <th className="text-left p-2">Amount</th>
              <th className="text-left p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {claims.map((c) => (
  <tr key={c.id} className="border-t">
    <td className="p-2">
      {c.claim_date
        ? new Date(c.claim_date).toLocaleDateString("en-IN")
        : "—"}
    </td>

    <td className="p-2">
      {c.policy_number || "—"}
    </td>

    <td className="p-2">
      {c.claim_amount
        ? c.claim_amount.toLocaleString("en-IN", {
            style: "currency",
            currency: "INR",
          })
        : "—"}
    </td>

    <td className="p-2">{c.status}</td>
  </tr>
))}

          </tbody>
        </table>
      </div>
    </div>
  );
}