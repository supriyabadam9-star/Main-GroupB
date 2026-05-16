import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Shield, CheckCircle } from "lucide-react";

export default function EditFraudRule() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rule, setRule] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    fetch(`/admin/fraud-rules/${id}`)
      .then(res => res.json())
      .then(setRule);
  }, [id]);

  const handleSave = async () => {
    await fetch(`/admin/fraud-rules/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rule),
    });

    setShowSuccess(true);

    setTimeout(() => {
      navigate("/admin/fraud-rules");
    }, 1500);
  };

  if (!rule) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen
                bg-gradient-to-br
                from-slate-100 via-blue-50 to-indigo-100
                dark:from-gray-950 dark:via-gray-900 dark:to-black">

      <div className="max-w-2xl mx-auto">

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-violet-600 mb-6"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        {/* ✅ SUCCESS MESSAGE (ADDED ONLY) */}
        {showSuccess && (
          <div className="mb-6 flex items-center gap-2 rounded-xl
                          bg-green-50 border border-green-200
                          px-4 py-3 text-green-700 text-sm font-semibold">
            <CheckCircle size={16} />
            Rule updated successfully
          </div>
        )}

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-lg p-8 space-y-8">

          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-violet-100 flex items-center justify-center">
              <Shield className="text-violet-600" size={20} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              Edit Fraud Rule
            </h1>
          </div>

          {/* Rule Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Rule Name
            </label>
            <input
              className="w-full h-11 px-4 rounded-xl border focus:ring-2 focus:ring-violet-500"
              value={rule.rule_name}
              onChange={e =>
                setRule({ ...rule, rule_name: e.target.value })
              }
            />
          </div>

          {/* Category & Severity */}
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category
              </label>
              <select
                className="w-full h-11 px-4 rounded-xl border focus:ring-2 focus:ring-violet-500"
                value={rule.category}
                onChange={e =>
                  setRule({ ...rule, category: e.target.value })
                }
              >
                <option>Transaction</option>
                <option>Identity</option>
                <option>Geolocation</option>
                <option>Behavior</option>
                <option>Device</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Severity
              </label>
              <select
                className="w-full h-11 px-4 rounded-xl border focus:ring-2 focus:ring-violet-500"
                value={rule.severity}
                onChange={e =>
                  setRule({ ...rule, severity: e.target.value })
                }
              >
                <option>LOW</option>
                <option>MEDIUM</option>
                <option>HIGH</option>
              </select>
            </div>
          </div>

          {/* Risk Threshold */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-semibold text-gray-700">
                Risk Threshold
              </label>
              <span className="text-sm font-bold text-violet-600">
                {rule.threshold}
              </span>
            </div>

            <input
              type="range"
              min="0"
              max="100"
              value={rule.threshold}
              onChange={e =>
                setRule({
                  ...rule,
                  threshold: Number(e.target.value),
                })
              }
              className="w-full accent-violet-600"
            />
          </div>

          {/* Status Toggle */}
          <div className="flex items-center justify-between bg-gray-50 rounded-2xl px-5 py-4">
            <div>
              <p className="text-sm font-semibold text-gray-800">
                Rule Status
              </p>
              <p className="text-xs text-gray-500">
                Enable or disable this rule
              </p>
            </div>

            <button
              onClick={() =>
                setRule({ ...rule, active: !rule.active })
              }
              className={`relative w-11 h-6 rounded-full transition
                ${rule.active ? "bg-green-500" : "bg-gray-300"}`}
            >
              <span
                className={`absolute top-0.5 h-5 w-5 bg-white rounded-full transition
                  ${rule.active ? "left-5" : "left-0.5"}`}
              />
            </button>
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center pt-6">
            <button
              onClick={() => navigate(-1)}
              className="text-sm font-semibold text-gray-500 hover:text-gray-800"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              className="px-8 py-2.5 rounded-xl
                         bg-violet-600 text-white font-semibold
                         hover:bg-violet-700 transition"
            >
              Save Changes
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
