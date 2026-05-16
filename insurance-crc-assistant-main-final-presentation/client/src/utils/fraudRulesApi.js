import api from "../api";

export const getFraudRules = async () => {
  const res = await api.get("/admin/fraud-rules");
  return res.data;
};

export const toggleFraudRule = async (ruleId) => {
  const res = await api.patch(`/admin/fraud-rules/${ruleId}/toggle`);
  return res.data;
};
