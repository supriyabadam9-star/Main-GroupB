import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import api from "../api";
import { CheckCircle, Star } from "lucide-react";

export default function MotorRecResults() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("score");

  useEffect(() => {
    api
      .post("/api/recommendations/motor", state)
      .then((res) => setPolicies(res.data))
      .finally(() => setLoading(false));
  }, [state]);

  const sortedPolicies = useMemo(() => {
    const data = [...policies];

    if (sortBy === "premium") {
      return data.sort(
        (a, b) =>
          (a.monthly_premium ?? Infinity) -
          (b.monthly_premium ?? Infinity)
      );
    }

    return data.sort((a, b) => b.score - a.score);
  }, [policies, sortBy]);

  if (loading) return <div className="px-16 py-12">Loading…</div>;

  return (
    <div className="px-16 py-12 max-w-7xl mx-auto space-y-10">

      {/* HEADER */}
      <div className="flex items-center justify-between gap-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Recommended Motor Policies
          </h1>

          <div className="w-fit">
            <button
              onClick={() => navigate("/motor_insurance_rec")}
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

      {/* SORT */}
      <div className="flex bg-gray-100 rounded-full p-1 w-[420px]">
        <button
          onClick={() => setSortBy("score")}
          className={`flex-1 py-2 rounded-full text-sm font-semibold ${
            sortBy === "score"
              ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
              : ""
          }`}
        >
          ⭐ Best Match
        </button>

        <button
          onClick={() => setSortBy("premium")}
          className={`flex-1 py-2 rounded-full text-sm font-semibold ${
            sortBy === "premium"
              ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
              : ""
          }`}
        >
          💰 Lowest Premium
        </button>
      </div>

      {/* CARDS */}
      <div className="space-y-8">
        {sortedPolicies.map((p, index) => (
          <div
            key={p.policy_id}
            className="relative rounded-3xl bg-gradient-to-br from-white via-indigo-50 to-purple-50 border p-6 flex justify-between"
          >
            {/* LEFT */}
            <div>
              <div className="flex items-center gap-3">
                <h2 className="font-semibold text-lg">{p.policy_name}</h2>

                {index === 0 && sortBy === "score" && (
                  <span className="px-3 py-1 text-xs rounded-full bg-emerald-500 text-white flex items-center gap-1">
                    <Star size={12} /> Best Match
                  </span>
                )}
              </div>

              <p className="text-sm text-gray-500">{p.insurer_name}</p>
              <p className="text-sm capitalize text-indigo-600">
                {p.coverage_type.replace("_", " ")}
              </p>

              <div className="grid grid-cols-2 gap-3 mt-4">
                {["Cashless repairs", "Fast claims", "Wide garage network"].map(
                  (f) => (
                    <div
                      key={f}
                      className="flex items-center gap-2 text-sm bg-white px-3 py-2 rounded-xl border"
                    >
                      <CheckCircle size={16} className="text-indigo-500" />
                      {f}
                    </div>
                  )
                )}
              </div>
            </div>

            {/* RIGHT */}
            <div className="text-right flex flex-col justify-between">
              <div>
                <p className="text-2xl font-extrabold text-indigo-600">
                  ₹ {Math.round(p.monthly_premium).toLocaleString("en-IN")}
                </p>
                <p className="text-sm text-gray-500">per month</p>
                <p className="text-sm">
                  Match Score <b>{p.score}</b>
                </p>
              </div>

              <button
                onClick={() => navigate(`/policies/motor/${p.policy_id}`)}
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
          </div>
        ))}
      </div>
    </div>
  );
}
