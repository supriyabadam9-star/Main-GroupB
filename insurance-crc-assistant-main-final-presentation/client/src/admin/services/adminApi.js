// ✅ Make sure this matches your api.js named export
import api from "../../api";

// =========================
// FRAUD TRENDS
// =========================
export const getFraudTrends = async () => {
  try {
    const res = await api.get("/admin/dashboard/fraud-trends");
    return res;
  } catch (error) {
    console.error("Error fetching fraud trends:", error);
    return { data: { labels: [], total_claims: [], flagged_claims: [] } };
  }
};

// =========================
// DASHBOARD SUMMARY
// =========================
export const getDashboardSummary = async () => {
  try {
    const res = await api.get("/admin/dashboard/summary");
    return res;
  } catch (error) {
    console.error("Error fetching dashboard summary:", error);
    return { data: {} };
  }
};

// =========================
// RISK DISTRIBUTION
// =========================
export const getRiskDistribution = async () => {
  try {
    const res = await api.get("/admin/dashboard/risk-distribution");
    return res;
  } catch (error) {
    console.error("Error fetching risk distribution:", error);
    return { data: [] };
  }
};

// =========================
// TOP TRIGGERED RULES
// =========================
export const getTopTriggeredRules = async () => {
  try {
    const res = await api.get("/admin/dashboard/top-rules");
    return res;
  } catch (error) {
    console.error("Error fetching top triggered rules:", error);
    return { data: [] }; // fallback empty array
  }
};


//----------INVESTIGATIONS-----------
export const createInvestigation = (data) => {
  return api.post("/admin/investigations", data);
};


//-----------RISK ALERT ----------------
export const getHighRiskActivity = () => {
  return api.get("/admin/dashboard/high-risk-activity");
};