import { useEffect, useState } from "react";
import { getHighRiskActivity } from "../services/adminApi";

export default function HighRiskAlert() {
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const fetchAlert = async () => {
      try {
        const res = await getHighRiskActivity();
        setAlert(res.data);
      } catch (err) {
        console.error("Failed to fetch high risk activity", err);
      }
    };
    fetchAlert();
  }, []);

  if (!alert || !alert.has_risk) return null;

  return (
    <div className="flex items-center justify-between bg-red-50 border border-red-200 rounded-lg p-4">
      <div>
        <h3 className="text-red-700 font-semibold">
          High Risk Activity Detected
        </h3>
        <p className="text-sm text-red-600">
          {alert.message}
        </p>
      </div>
      <button className="bg-red-600 text-white px-4 py-2 w-40 rounded-md hover:bg-red-700">
        View Alerts
      </button>
    </div>
  );
}
