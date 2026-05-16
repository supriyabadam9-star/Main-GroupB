export default function TopTriggeredRules({ rules = [] }) {
  if (rules.length === 0) {
    return (
      <div className="bg-white p-5 rounded-xl shadow">
        <h2 className="font-semibold mb-3">
          Top Triggered Rules
        </h2>
        <p className="text-sm text-gray-400">
          No rule violations detected
        </p>
      </div>
    );
  }

  const max = Math.max(...rules.map(r => r.count));

  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <h2 className="font-semibold mb-4">
        Top Triggered Rules
      </h2>

      <ul className="space-y-3 text-sm">
        {rules.map((r, idx) => (
          <li key={idx}>
            <div className="flex justify-between mb-1">
              <span>{r.rule}</span>
              <span className="font-medium">
                {r.count}
              </span>
            </div>

            <div className="w-full bg-gray-100 rounded h-2">
              <div
                className="h-2 bg-indigo-500 rounded"
                style={{
                  width: `${(r.count / max) * 100}%`,
                }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
