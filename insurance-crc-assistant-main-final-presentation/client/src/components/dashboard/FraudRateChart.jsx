import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function FraudRateChart({ trend }) {
  if (!trend || trend.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow h-[360px]">
        <h2 className="font-semibold text-gray-900">
          Fraud Rate Analysis
        </h2>
        <p className="text-sm text-gray-400 mt-6 text-center">
          No data available
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow h-[360px]">
      <div className="mb-4">
        <h2 className="font-semibold text-gray-900">
          Fraud Rate Analysis
        </h2>
        <p className="text-xs text-gray-500">
          Claims vs Flagged (Last 7 Days)
        </p>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={trend}>
          <defs>
            <linearGradient id="totalGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0.05} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="day"
            tick={{ fontSize: 12, fill: "#6b7280" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#6b7280" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip />

          <Area
            type="monotone"
            dataKey="total"
            stroke="#6366f1"
            fill="url(#totalGradient)"
            strokeWidth={2}
          />

          <Area
            type="monotone"
            dataKey="flagged"
            stroke="#ef4444"
            fill="transparent"
            strokeDasharray="4 4"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
