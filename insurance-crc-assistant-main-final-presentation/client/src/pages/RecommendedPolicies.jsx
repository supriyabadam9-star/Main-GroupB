import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ShieldCheck } from "lucide-react";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function RecommendedPolicies() {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortType, setSortType] = useState("best");

  const navigate = useNavigate();

  // =========================
  // FETCH RECOMMENDATIONS
  // =========================
  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/recommendations/1`)
      .then((res) => {
        setPolicies(res.data?.recommendations || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // =========================
  // SORTING
  // =========================
  const sortedPolicies = useMemo(() => {
    if (!policies.length) return [];
    const arr = [...policies];

    if (sortType === "premium")
      return arr.sort((a, b) => (a.premium || 0) - (b.premium || 0));

    if (sortType === "comprehensive")
      return arr.sort((a, b) => (b.premium || 0) - (a.premium || 0));

    return arr;
  }, [policies, sortType]);

  // =========================
  // CATEGORY → DETAIL ROUTE
  // =========================
  const getPolicyRoute = (category, id) => {
    switch (category) {
      case "Health":
        return `/policies/health/${id}`;
      case "Life":
        return `/policies/life/${id}`;
      case "Auto":
        return `/policies/motor/${id}`;
      case "Home":
        return `/policies/home/${id}`;
      case "Travel":
        return `/policies/travel/${id}`;
      case "Fire":
        return `/policies/fire/${id}`;
      case "Business":
        return `/policies/business/${id}`;
      default:
        return "/";
    }
  };

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <p className="text-center mt-20 text-gray-500 text-sm">
        Loading recommendations...
      </p>
    );
  }

  // =========================
  // UI
  // =========================
  return (
    <div className="px-6 py-10 max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="mb-12">
        <h1 className="text-3xl font-semibold text-gray-900">
          Top Picks for Your{" "}
          <span className="text-indigo-600">Profile</span>
        </h1>
        <p className="text-gray-500 mt-2 max-w-2xl text-sm">
          Personalized insurance plans based on your preferences, risk appetite,
          and goals.
        </p>
      </div>

      {/* FILTERS */}
      <div className="flex gap-3 mb-10">
        {[
          { key: "best", label: "Best Match" },
          { key: "premium", label: "Lowest Premium" },
          { key: "comprehensive", label: "Comprehensive" },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setSortType(f.key)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition
              ${
                sortType === f.key
                  ? "bg-indigo-100 text-indigo-700"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* EMPTY */}
      {sortedPolicies.length === 0 && (
        <div className="bg-white border rounded-xl p-6 text-sm text-gray-600">
          No policies match your profile yet.
        </div>
      )}

      {/* CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedPolicies.map((policy, index) => (
          <div
            key={policy.policy_id}
            className="relative bg-white border rounded-2xl p-6 shadow-sm hover:shadow-lg transition"
          >
            {index === 0 && sortType === "best" && (
              <span className="absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full bg-indigo-50 text-indigo-600">
                Top Pick
              </span>
            )}

            <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center mb-4">
              <ShieldCheck size={20} className="text-indigo-600" />
            </div>

            <h3 className="text-lg font-semibold text-gray-900">
              {policy.name}
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              {policy.category} Insurance
            </p>

            <div className="space-y-2 text-sm text-gray-600 mb-6">
              <p>
                ✔ Risk Level:{" "}
                <span className="font-medium">
                  {policy.explanation?.risk}
                </span>
              </p>
              <p>
                ✔ Goal:{" "}
                <span className="font-medium">
                  {policy.explanation?.goal}
                </span>
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400">Annual Premium</p>
                <p className="text-xl font-semibold text-gray-900">
                  ₹
                  {Number(
                    policy.premium ??
                      policy.monthly_premium ??
                      policy.min_annual_premium ??
                      policy.min_monthly_premium ??
                      policy.min_premium ??
                      policy.base_premium ??
                      0
                  ).toLocaleString()}
                </p>
              </div>

              {/* VIEW PLAN */}
              <button
                onClick={() =>
                  navigate(
                    getPolicyRoute(policy.category, policy.policy_id)
                  )
                }
                className="
                  px-3 py-1.5
                  text-xs font-semibold
                  text-indigo-600
                  border border-indigo-200
                  rounded-lg
                  hover:bg-indigo-50
                  transition
                "
              >
                View Plan
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
