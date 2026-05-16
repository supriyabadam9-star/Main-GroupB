import { AlertTriangle } from "lucide-react";

export default function FraudAlertBanner() {
  return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg flex justify-between items-center">
      <div className="flex gap-3">
        <AlertTriangle className="text-red-500 mt-1" />
        <div>
          <p className="font-semibold text-red-600">
            High Risk Activity Detected
          </p>
          <p className="text-sm text-red-500">
            Multiple claims flagged as HIGH RISK in the last hour.
          </p>
        </div>
      </div>

      <button className="text-sm font-semibold text-red-600 hover:underline">
        View Alerts →
      </button>
    </div>
  );
}
