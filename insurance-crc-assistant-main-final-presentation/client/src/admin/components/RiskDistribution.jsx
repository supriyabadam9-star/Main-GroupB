import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

import { getRiskDistribution } from "../services/adminApi";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function RiskDistribution() {
  const [riskData, setRiskData] = useState(null);

  // =========================
  // FETCH DATA FROM BACKEND
  // =========================
  useEffect(() => {
    const fetchRiskData = async () => {
      try {
        const res = await getRiskDistribution();
        setRiskData(res.data);
      } catch (error) {
        console.error("Error fetching risk distribution", error);
      }
    };

    fetchRiskData();
  }, []);

  if (!riskData) {
    return <div className="text-sm text-gray-500">Loading risk data...</div>;
  }

  const data = {
    labels: ["High", "Medium", "Low"],
    datasets: [
      {
        label: "Risk Distribution",
        data: [
          riskData.high,
          riskData.medium,
          riskData.low,
        ],
        backgroundColor: ["#ef4444", "#facc15", "#22c55e"],
        borderColor: ["#fff", "#fff", "#fff"],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Risk Distribution",
      },
    },
  };

  return (
    <div className="flex items-center justify-between">
      {/* Chart */}
      <div className="w-1/2">
        <Doughnut data={data} options={options} />
      </div>

      {/* Breakdown */}
      <div className="w-1/2 pl-6">
        <ul className="space-y-2 text-sm">
          <li className="flex items-center">
            <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
            High: {riskData.high}%
          </li>
          <li className="flex items-center">
            <span className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></span>
            Medium: {riskData.medium}%
          </li>
          <li className="flex items-center">
            <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
            Low: {riskData.low}%
          </li>
        </ul>
      </div>
    </div>
  );
}
