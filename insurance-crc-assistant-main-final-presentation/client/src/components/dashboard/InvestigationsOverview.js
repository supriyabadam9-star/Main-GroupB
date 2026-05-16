export default function InvestigationsOverview({ data }) {
  const investigations = data?.investigations || [];

  const total = investigations.length;
  const open = investigations.filter(i => i.status === "Open").length;
  const closed = investigations.filter(i => i.status === "Closed").length;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-5 border dark:border-gray-800">
      <h3 className="text-sm font-semibold mb-4 text-gray-700 dark:text-gray-300">
        Investigations Overview
      </h3>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-2xl font-bold">{total}</p>
          <p className="text-xs text-gray-500">Total</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-orange-500">{open}</p>
          <p className="text-xs text-gray-500">Open</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-green-600">{closed}</p>
          <p className="text-xs text-gray-500">Closed</p>
        </div>
      </div>
    </div>
  );
}
