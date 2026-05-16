export default function PoliciesOverview({ data }) {
  const policies = data?.policies || [];

  const total = policies.length;
  const active = policies.filter(p => p.status === "Active").length;
  const expired = policies.filter(p => p.status === "Expired").length;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-5 border dark:border-gray-800">
      <h3 className="text-sm font-semibold mb-4 text-gray-700 dark:text-gray-300">
        Policies Overview
      </h3>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-2xl font-bold">{total}</p>
          <p className="text-xs text-gray-500">Total</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-green-600">{active}</p>
          <p className="text-xs text-gray-500">Active</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-red-500">{expired}</p>
          <p className="text-xs text-gray-500">Expired</p>
        </div>
      </div>
    </div>
  );
}
