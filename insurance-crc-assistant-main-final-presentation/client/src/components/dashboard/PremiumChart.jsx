import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ALL_CATEGORIES = [
  "Life Insurance",
  "Health Insurance",
  "Fire Insurance",
  "Travel Insurance",
  "Motor Insurance",
  "Business Insurance",
  "Home Insurance",
];

export default function PremiumChart({ data = [] }) {
  const dataMap = {};
  data.forEach((item) => {
    dataMap[item.category] = {
      user_cost: item.user_cost,
      market_cost: item.market_cost,
    };
  });

  const chartData = ALL_CATEGORIES.map((category) => ({
    category,
    user_cost: dataMap[category]?.user_cost ?? 0,
    market_cost: dataMap[category]?.market_cost ?? 0,
  }));

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Premium Analysis</h3>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={chartData}
          barCategoryGap="35%"
          barGap={6}
        >
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />

          <Bar
            dataKey="market_cost"
            fill="#8b5cf6"
            name="Market Average"
            barSize={20}
          />
          <Bar
            dataKey="user_cost"
            fill="#3b82f6"
            name="Your Premium"
            barSize={20}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
