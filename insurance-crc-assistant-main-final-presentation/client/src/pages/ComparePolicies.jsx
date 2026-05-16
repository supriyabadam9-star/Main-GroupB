import { useNavigate } from "react-router-dom";
import { useCompare } from "../context/CompareContext";

export default function ComparePolicies() {
  const navigate = useNavigate();
  const { policies, resetCompare } = useCompare();

  /* ---------------- EMPTY STATE ---------------- */
  if (policies.length === 0) {
    return (
      <div className="min-h-screen
                bg-gradient-to-br
                from-slate-100 via-blue-50 to-indigo-100
                dark:from-gray-950 dark:via-gray-900 dark:to-black">

        <h2 className="text-3xl font-semibold">No policies selected</h2>
        <p className="text-slate-300 mt-3 mb-8">
          Start comparing policies to find the best fit
        </p>
        <button
          onClick={() => navigate("/catalog")}
          className="px-10 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition shadow-lg"
        >
          Start Comparing
        </button>
      </div>
    );
  }

  /* ---------------- ONE POLICY ---------------- */
  if (policies.length === 1) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 text-white">
        <h2 className="text-3xl font-semibold">Add one more policy</h2>
        <p className="text-slate-300 mt-3 mb-8">
          You need at least two policies to compare
        </p>

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/catalog")}
            className="px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition shadow"
          >
            Browse Policies
          </button>

          <button
            onClick={resetCompare}
            className="px-8 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 transition"
          >
            Restart
          </button>
        </div>
      </div>
    );
  }

  /* ---------------- COMPARISON ---------------- */
  const featureKeys = Object.keys(policies[0]).filter(
    (key) => key !== "id"
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 px-10 py-8">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-10 text-white">
        <h2 className="text-4xl font-semibold tracking-tight">
          Compare Policies
        </h2>

        <div className="flex items-center gap-3">
          {policies.length < 3 && (
            <button
              onClick={() => navigate("/catalog")}
              className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition text-sm shadow"
            >
              + Add Policy
            </button>
          )}

          <button
            onClick={resetCompare}
            className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 transition text-sm shadow"
          >
            Restart Compare
          </button>
        </div>
      </div>

      {/* COMPARISON TABLE */}
      <div className="bg-white/95 backdrop-blur rounded-3xl shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-slate-900 text-white sticky top-0 z-10">
              <tr>
                <th className="p-6 text-left text-sm font-semibold text-slate-300">
                  Feature
                </th>

                {policies.map((policy, idx) => (
                  <th key={idx} className="p-6 text-left">
                    <div className="flex flex-col gap-1">
                      <span className="text-base font-semibold">
                        {policy.policy_name}
                      </span>
                      <span className="text-xs text-slate-400">
                        {policy.insurer_name || policy.insurer}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {featureKeys.map((key, rowIdx) => (
                <tr
                  key={key}
                  className={`border-b ${
                    rowIdx % 2 === 0 ? "bg-white" : "bg-slate-50"
                  } hover:bg-indigo-50 transition`}
                >
                  <td className="p-6 text-sm font-medium text-slate-600 capitalize">
                    {key.replace(/_/g, " ")}
                  </td>

                  {policies.map((policy, idx) => (
                    <td key={idx} className="p-6 text-sm text-slate-800">
                      {policy[key] === true && (
                        <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-medium">
                          Yes
                        </span>
                      )}
                      {policy[key] === false && (
                        <span className="px-3 py-1 rounded-full bg-slate-300 text-slate-700 text-xs">
                          No
                        </span>
                      )}
                      {policy[key] === null && "—"}
                      {typeof policy[key] !== "boolean" &&
                        policy[key] !== null &&
                        String(policy[key])}
                    </td>
                  ))}
                </tr>
              ))}

              {/* CTA ROW */}
              <tr className="bg-slate-900">
                <td className="p-6 text-sm font-semibold text-slate-300">
                  Action
                </td>

                {policies.map((policy, idx) => (
                  <td key={idx} className="p-6">
                    <button
                      onClick={() =>
                        navigate("/quote-summary", {
                          state: { policy },
                        })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow transition"
                    >
                      Get Quote – {policy.policy_name}
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
