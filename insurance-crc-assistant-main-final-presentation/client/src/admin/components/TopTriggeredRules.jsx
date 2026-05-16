import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import { getTopTriggeredRules } from "../services/adminApi";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function TopTriggeredRules() {
  const [rulesData, setRulesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRules = async () => {
      try {
        const res = await getTopTriggeredRules();

        // ✅ Backend returns { labels: [], counts: [] }
        if (
          res.data &&
          Array.isArray(res.data.labels) &&
          Array.isArray(res.data.counts)
        ) {
          const transformedData = res.data.labels.map((label, index) => ({
            rule: label,
            count: res.data.counts[index] ?? 0,
          }));

          setRulesData(transformedData);
        } else {
          console.warn("Invalid top-rules response", res.data);
          setRulesData([]);
        }
      } catch (error) {
        console.error("Error fetching triggered rules", error);
        setRulesData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRules();
  }, []);

  if (loading) {
    return <div className="text-sm text-gray-500">Loading rules data...</div>;
  }

  if (rulesData.length === 0) {
    return <div className="text-sm text-gray-500">No rules data available</div>;
  }

  const data = {
    labels: rulesData.map((item) => item.rule),
    datasets: [
      {
        label: "Triggered Count",
        data: rulesData.map((item) => item.count),
        backgroundColor: ["#8b5cf6", "#f87171", "#facc15"],
        barPercentage: 0.5,
        categoryPercentage: 0.6,
        maxBarThickness: 45,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Top Triggered Rules",
      },
    },
  };

  return <Bar data={data} options={options} />;
}
