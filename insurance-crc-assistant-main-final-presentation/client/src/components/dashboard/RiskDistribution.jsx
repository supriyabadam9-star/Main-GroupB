import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const COLORS = {
  high: "#ef4444",    // red
  medium: "#f59e0b",  // amber
  low: "#22c55e",     // green
};

export default function RiskDistribution({ data }) {
  if (!data) return null;

  const chartData = [
    { name: "High", value: data.high, key: "high" },
    { name: "Medium", value: data.medium, key: "medium" },
    { name: "Low", value: data.low, key: "low" },
  ].filter(d => d.value > 0);

  const total = data.high + data.medium + data.low;

  const pct = (v) =>
    total === 0 ? 0 : Math.round((v / total) * 100);

  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <h2 className="font-semibold mb-4">Risk Distribution</h2>

      <div className="flex items-center gap-6">
        {/* Donut */}
        <div className="w-32 h-32 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                innerRadius={45}
                outerRadius={60}
                paddingAngle={2}
                stroke="none"
              >
                {chartData.map((entry) => (
                  <Cell
                    key={entry.key}
                    fill={COLORS[entry.key]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center total */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-semibold">
              {total}
            </span>
          </div>
        </div>

        {/* Legend */}
        <ul className="text-sm space-y-2 flex-1">
          <li className="flex justify-between text-red-500">
            <span>High</span>
            <span>{pct(data.high)}%</span>
          </li>
          <li className="flex justify-between text-yellow-500">
            <span>Medium</span>
            <span>{pct(data.medium)}%</span>
          </li>
          <li className="flex justify-between text-green-500">
            <span>Low</span>
            <span>{pct(data.low)}%</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
