import axios from "./axios";

export const getAnalyticsSummary = () => axios.get("/admin/analytics/summary");
export const getFraudTrends = () => axios.get("/admin/analytics/trends");
export const getSeverity = () => axios.get("/admin/analytics/severity");
export const getTopCategories = () => axios.get("/admin/analytics/top-categories");
export const getRulePerformance = () => axios.get("/admin/analytics/rule-performance");
export const getHighRiskEntities = () => axios.get("/admin/analytics/high-risk-entities");
