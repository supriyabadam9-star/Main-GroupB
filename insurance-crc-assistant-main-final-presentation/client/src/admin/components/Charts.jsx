import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { getClaimsOverview } from "../services/adminApi";

export default function Charts() {
  const [data, setData] = useState([]);

  // =========================
  // FETCH DATA FROM BACKEND
  // =========================
  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const res = await getClaimsOverview();
        setData(res.data);
      } catch (error) {
        console.error("Error fetching claims overview", error);
      }
    };

    fetchOverview();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">
        Claims Overview
      </h2>

      {data.length === 0 ? (
        <p className="text-sm text-gray-500">
          Loading chart...
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="claims"
              stroke="#6366f1"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
