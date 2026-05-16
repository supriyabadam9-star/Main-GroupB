import { useEffect, useState } from "react";

import PremiumChart from "../components/dashboard/PremiumChart";
import ProfileSummary from "../components/dashboard/ProfileSummary";
import MyPolicies from "../components/dashboard/MyPolicies";
import ClaimsTable from "../components/dashboard/ClaimsTable";
import StatsCard from "../components/dashboard/StatsCard";

import { fetchDashboardData } from "../features/authentication/services/dashboardApi";

export default function Home() {
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState("");
  const userId = 1;

  useEffect(() => {
    fetchDashboardData(userId)
      .then((data) => {
        console.log("Dashboard data:", data);
        setDashboard(data);
      })
      .catch((err) => {
        console.error("Dashboard fetch error:", err);
        setError("Failed to load dashboard");
      });
  }, [userId]);

  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!dashboard) return <div className="p-6">Loading dashboard...</div>;

  // -----------------------
  // Safe access
  // -----------------------
  const user = dashboard.user || {};
  const policies = dashboard.policies || [];
  const claims = dashboard.claims || [];

  // -----------------------
  // Chart data
  // -----------------------
  const chartData = policies.map((policy) => ({
    category: policy.name || "N/A",
    yourPremium: Number(policy.premium) || 0,
  }));

  return (
    <div
      className="min-h-screen
                 bg-gradient-to-br
                 from-slate-100 via-blue-50 to-indigo-100
                 dark:from-gray-950 dark:via-gray-900 dark:to-black"
    >
      <main className="px-6 pb-6 space-y-6">
        {/* Top section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <PremiumChart data={chartData} />
          </div>
          <ProfileSummary profile={user} />
        </div>

        {/* Policies */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <MyPolicies policies={policies} />
          </div>
        </div>

        {/* Stats + Claims */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <StatsCard policies={policies} />
          <ClaimsTable claims={claims} policies={policies} />
        </div>
      </main>
    </div>
  );
}
