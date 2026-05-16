import api from "../api";

/* =====================================================
   ADMIN DASHBOARD
===================================================== */

export const getFraudSummary = async () => {
  const res = await api.get("/admin/dashboard/summary");
  return res.data;
};

export const exportFraudCSV = async () => {
  const res = await api.get("/admin/dashboard/export", {
    responseType: "blob",
  });

  const url = window.URL.createObjectURL(new Blob([res.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "fraud_dashboard.csv");
  document.body.appendChild(link);
  link.click();
  link.remove();
};

/* =====================================================
   FLAGGED CLAIMS
===================================================== */

export const getFlaggedClaims = async (params = {}) => {
  const res = await api.get("/admin/flagged-claims", { params });
  return res.data;
};

export const getFlaggedClaimDetail = async (claimId) => {
  const res = await api.get(`/admin/flagged-claims/${claimId}`);
  return res.data;
};

export const approveFlaggedClaim = async (claimId) => {
  const res = await api.post(
    `/admin/flagged-claims/${claimId}/approve`
  );
  return res.data;
};

export const denyFlaggedClaim = async (claimId) => {
  const res = await api.post(
    `/admin/flagged-claims/${claimId}/deny`
  );
  return res.data;
};

/* =====================================================
   FRAUD RULES ENGINE
===================================================== */

export const getFraudRules = async () => {
  const res = await api.get("/admin/fraud-rules");
  return res.data;
};

export const toggleFraudRule = async (ruleId) => {
  const res = await api.post(
    `/admin/fraud-rules/${ruleId}/toggle`
  );
  return res.data;
};

export const investigateFlaggedClaim = async (claimId) => {
  const res = await api.post(
    `/admin/flagged-claims/${claimId}/investigate`
  );
  return res.data;
};

/* =====================================================
   INVESTIGATIONS
===================================================== */
export const startInvestigation = async (payload) => {
  const res = await api.post("/admin/investigations/start", payload);
  return res.data;
};


export const getInvestigations = async () => {
  const res = await api.get("/admin/investigations");
  return res.data;
};

export const updateInvestigation = async (id, payload) => {
  const res = await api.put(`/admin/investigations/${id}`, payload);
  return res.data;
};

export const deleteInvestigation = async (id) => {
  const res = await api.delete(`/admin/investigations/${id}`);
  return res.data;
};

