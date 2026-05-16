export default function StatsCard({ policies = [] }) {
  const active = policies.filter(
    (p) => p.status && p.status.toLowerCase() === "active"
  ).length;

  const renewing = policies.filter(
    (p) => p.status && p.status.toLowerCase() === "renewing"
  ).length;

  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="text-lg font-semibold mb-3">Profile Summary</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded border p-3">
          <div className="text-sm text-gray-500">Active Policies</div>
          <div className="text-2xl font-bold">{active}</div>
        </div>
        <div className="rounded border p-3">
          <div className="text-sm text-gray-500">Renewing</div>
          <div className="text-2xl font-bold">{renewing}</div>
        </div>
      </div>
    </div>
  );
}