export default function ClaimsOverview({ data }) {
  const claims = data?.claims || [];

  const total = claims.length;
  const pending = claims.filter(c => c.status === "Pending").length;
  const flagged = claims.filter(c => c.is_flagged).length;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-5 border dark:border-gray-800">
      <h3 className="text-sm font-semibold mb-4 text-gray-700 dark:text-gray-300">
        Claims Overview
      </h3>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-2xl font-bold">{total}</p>
          <p className="text-xs text-gray-500">Total</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-yellow-500">{pending}</p>
          <p className="text-xs text-gray-500">Pending</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-red-600">{flagged}</p>
          <p className="text-xs text-gray-500">Flagged</p>
        </div>
      </div>
    </div>
  );
}
