import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import FraudRateAnalysis from "../components/FraudRateAnalysis";
import RiskDistribution from "../components/RiskDistribution";
import TopTriggeredRules from "../components/TopTriggeredRules";
import HighRiskAlert from "../components/HighRiskAlert";
import {
  getDashboardSummary,
  createInvestigation,
} from "../services/adminApi";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Download, ChevronDown } from "lucide-react";

export default function AdminDashboard({ darkMode, setDarkMode }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showExport, setShowExport] = useState(false);

  const [form, setForm] = useState({
    claimId: "",
    investigator: "",
    priority: "Medium",
    notes: "",
    date: new Date(),
  });

  // =========================
  // FETCH DASHBOARD SUMMARY
  // =========================
  const fetchStats = async () => {
    try {
      const res = await getDashboardSummary();
      setStats(res.data);
    } catch (error) {
      console.error("Failed to fetch admin dashboard stats", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  // =========================
  // CREATE INVESTIGATION
  // =========================
  const handleCreateInvestigation = async () => {
    if (!form.claimId || !form.investigator) {
      alert("Claim ID and Investigator are required");
      return;
    }

    setSubmitting(true);
    try {
      await createInvestigation(form);
      alert("Investigation created successfully");

      setShowModal(false);
      setForm({
        claimId: "",
        investigator: "",
        priority: "Medium",
        notes: "",
        date: new Date(),
      });

      fetchStats();
    } catch (error) {
      alert("Failed to create investigation");
    } finally {
      setSubmitting(false);
    }
  };

  // =========================
  // EXPORT HANDLER (DOWNLOAD)
  // =========================
  const handleExport = async (type) => {
    setShowExport(false);

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/admin/export/${type}`,
        { method: "GET" }
      );

      if (!response.ok) {
        throw new Error("Export failed");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `admin_dashboard_${new Date()
        .toISOString()
        .slice(0, 10)}.${type === "excel" ? "xlsx" : type}`;

      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert("Failed to download file");
    }
  };

  if (loading) {
    return <div className="p-6">Loading admin dashboard...</div>;
  }

  const totalClaims = stats?.total_claims ?? 0;
  const pendingClaims = stats?.status_counts?.pending ?? 0;
  const rejectedClaims = stats?.status_counts?.rejected ?? 0;
  const riskExposure = stats?.total_claim_amount ?? 0;

  const avgFraudScore =
    totalClaims > 0
      ? Math.round((rejectedClaims / totalClaims) * 100)
      : 0;

  return (
    <div
      className={`flex min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100"
      }`}
    >
      <Sidebar />

      <div className="flex-1">
        <Topbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Outlet />

        <div className="p-6 space-y-6">
          {/* HEADER */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>

            <div className="flex items-center gap-3">
              {/* EXPORT DROPDOWN */}
              <div className="relative">
                <button
                  onClick={() => setShowExport(!showExport)}
                  className="flex items-center gap-2 border px-4 py-2 rounded-md shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Download size={16} />
                  Export Data
                  <ChevronDown size={16} />
                </button>

                {showExport && (
                  <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 border rounded-md shadow-lg z-50">
                    <button
                      onClick={() => handleExport("csv")}
                      className="block w-full px-4 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Export as CSV
                    </button>
                    <button
                      onClick={() => handleExport("excel")}
                      className="block w-full px-4 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Export as Excel
                    </button>
                    <button
                      onClick={() => handleExport("pdf")}
                      className="block w-full px-4 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Export as PDF
                    </button>
                  </div>
                )}
              </div>

              {/* NEW INVESTIGATION */}
              <button
                className="bg-purple-600 text-white px-4 py-2 w-40 rounded-md shadow hover:bg-purple-700"
                onClick={() => setShowModal(true)}
              >
                New Investigation
              </button>
            </div>
          </div>

          {/* SUMMARY CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <SummaryCard title="Total Claims" value={totalClaims} />
            <SummaryCard title="Pending Claims" value={pendingClaims} />
            <SummaryCard
              title="Risk Exposure"
              value={`₹${riskExposure.toLocaleString()}`}
            />
            <SummaryCard
              title="Avg Fraud Score"
              value={`${avgFraudScore} / 100`}
            />
          </div>

          <HighRiskAlert />

          {/* CHARTS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow h-72">
              <FraudRateAnalysis />
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow h-72">
              <RiskDistribution />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow h-72">
            <TopTriggeredRules />
          </div>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 w-full max-w-md p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">
              Start New Investigation
            </h2>

            <div className="space-y-4">
              <input
                placeholder="Claim ID"
                value={form.claimId}
                onChange={(e) =>
                  setForm({ ...form, claimId: e.target.value })
                }
                className="w-full border px-3 py-2 rounded-md"
              />

              <input
                placeholder="Investigator"
                value={form.investigator}
                onChange={(e) =>
                  setForm({ ...form, investigator: e.target.value })
                }
                className="w-full border px-3 py-2 rounded-md"
              />

              <select
                value={form.priority}
                onChange={(e) =>
                  setForm({ ...form, priority: e.target.value })
                }
                className="w-full border px-3 py-2 rounded-md"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>

              <DatePicker
                selected={form.date}
                onChange={(date) => setForm({ ...form, date })}
                className="w-full border px-3 py-2 rounded-md"
              />

              <textarea
                placeholder="Notes"
                value={form.notes}
                onChange={(e) =>
                  setForm({ ...form, notes: e.target.value })
                }
                className="w-full border px-3 py-2 rounded-md"
              />
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="border px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateInvestigation}
                disabled={submitting}
                className="bg-purple-600 text-white px-4 py-2 rounded-md"
              >
                {submitting ? "Creating..." : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// =========================
// SUMMARY CARD
// =========================
function SummaryCard({ title, value }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <h2 className="text-sm text-gray-500">{title}</h2>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}
