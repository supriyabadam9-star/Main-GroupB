import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import api from "../api";
import { CheckCircle, Star } from "lucide-react";

export default function HealthRecResults() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("score");

  useEffect(() => {
    if (!state) return;

    api
      .post("/api/recommendations/health", state)
      .then((res) => setPolicies(res.data))
      .finally(() => setLoading(false));
  }, [state]);

  const sortedPolicies = useMemo(() => {
    const data = [...policies];
    return sortBy === "premium"
      ? data.sort((a, b) => a.monthly_premium - b.monthly_premium)
      : data.sort((a, b) => b.score - a.score);
  }, [policies, sortBy]);

  if (loading) {
    return <div className="px-16 py-12 text-gray-500">Loading…</div>;
  }

  return (
    <div className="px-16 py-12 max-w-7xl mx-auto space-y-10">

      {/* HEADER */}
      <div className="flex items-center justify-between gap-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Recommended Health Policies
          </h1>

          <div className="w-fit">
            <button
              onClick={() => navigate("/health_insurance_rec")}
              className="
                inline-flex items-center gap-2
                px-8 py-2 rounded-full text-sm font-semibold
                bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                text-white shadow-md
                hover:shadow-lg hover:scale-[1.05]
                transition-all
                whitespace-nowrap
              "
            >
              ← Back to Assessment
            </button>
          </div>
        </div>


      {/* SORT BAR */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-gray-600">Sort by:</span>

        <div className="flex bg-gray-100 rounded-full p-1 w-[420px]">
          <button
            onClick={() => setSortBy("score")}
            className={`flex-1 py-2 rounded-full text-sm font-semibold transition-all
              ${
                sortBy === "score"
                  ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow"
                  : "text-gray-600 hover:text-indigo-600"
              }`}
          >
            ⭐ Best Match
          </button>

          <button
            onClick={() => setSortBy("premium")}
            className={`flex-1 py-2 rounded-full text-sm font-semibold transition-all
              ${
                sortBy === "premium"
                  ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow"
                  : "text-gray-600 hover:text-indigo-600"
              }`}
          >
            💰 Lowest Premium
          </button>
        </div>
      </div>

      {/* POLICY CARDS */}
      <div className="space-y-8">
        {sortedPolicies.map((p, index) => (
          <div
            key={p.policy_id}
            className="
              relative overflow-hidden rounded-3xl
              bg-gradient-to-br from-white via-indigo-50 to-purple-50
              border border-indigo-100
              shadow-sm hover:shadow-xl
              transition-shadow
              p-6 flex justify-between gap-6
            "
          >
            {/* LEFT */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold text-gray-900">
                  {p.policy_name}
                </h2>

                {index === 0 && (
                  <span className="
                    flex items-center gap-1
                    px-3 py-1 rounded-full text-xs font-semibold
                    bg-gradient-to-r from-emerald-400 to-emerald-600
                    text-white shadow
                  ">
                    <Star size={12} /> Best Match
                  </span>
                )}
              </div>

              <p className="text-sm text-gray-500">{p.insurer_name}</p>

              {/* FEATURE CHIPS */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                {[
                  "Budget-friendly",
                  "Low co-pay",
                  "Good room rent",
                  "Wide hospital network",
                ].map((label) => (
                  <div
                    key={label}
                    className="
                      flex items-center gap-2
                      text-sm text-gray-700
                      bg-white/70 backdrop-blur
                      px-3 py-2 rounded-xl
                      border border-indigo-100
                    "
                  >
                    <CheckCircle size={16} className="text-indigo-500" />
                    {label}
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT */}
            <div className="text-right flex flex-col justify-between items-end">
              <div>
                <p className="text-2xl font-extrabold text-indigo-600">
                  ₹ {p.monthly_premium}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Match Score{" "}
                  <span className="font-semibold text-gray-800">
                    {p.score}
                  </span>
                </p>
              </div>

              {/* View Button – standout */}
              <button
                onClick={() => navigate(`/policies/health/${p.policy_id}`)}
                className="
                  mt-6 px-7 py-2 rounded-full text-sm font-semibold
                  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                  text-white shadow-md
                  hover:shadow-lg hover:scale-[1.05]
                  transition-all
                "
              >
                View Policy
              </button>

            </div>

            {/* COLOR STRIP */}
            <div className="absolute top-0 right-0 h-full w-2
                            bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500" />
          </div>
        ))}
      </div>
    </div>
  );
}
