import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

import { getFraudTrends } from "../services/adminApi";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function FraudRateAnalysis() {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getFraudTrends();

        // ✅ Safely read backend response
        const labels = res.data?.labels ?? [];
        const totalClaims =
          res.data?.total_claims ?? res.data?.counts ?? [];
        const flaggedClaims =
          res.data?.flagged_claims ?? res.data?.flagged ?? [];

        if (
          Array.isArray(labels) &&
          Array.isArray(totalClaims) &&
          Array.isArray(flaggedClaims)
        ) {
          setChartData({
            labels,
            datasets: [
              {
                label: "Total Claims",
                data: totalClaims,
                borderColor: "rgb(124, 58, 237)",
                backgroundColor: "rgba(124, 58, 237, 0.2)",
                tension: 0.3,
              },
              {
                label: "Flagged Claims",
                data: flaggedClaims,
                borderColor: "rgb(239, 68, 68)",
                backgroundColor: "rgba(239, 68, 68, 0.2)",
                borderDash: [5, 5],
                tension: 0.3,
              },
            ],
          });
        } else {
          console.warn("Invalid fraud trends response", res.data);
          setChartData({ labels: [], datasets: [] });
        }
      } catch (error) {
        console.error("Error fetching fraud trend data", error);
        setChartData({ labels: [], datasets: [] });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-sm text-gray-500">Loading chart...</div>;
  }

  if (!chartData || chartData.labels.length === 0) {
    return (
      <div className="text-sm text-gray-500">
        No fraud data available
      </div>
    );
  }

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Fraud Rate Analysis (Last 7 Days)",
      },
    },
  };

  return <Line data={chartData} options={options} />;
}
