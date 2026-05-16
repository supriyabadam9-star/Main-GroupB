import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000"; // make sure matches FastAPI server

export const fetchAdminPolicies = (policy_type = "all") =>
  axios.get(`${BASE_URL}/admin/policies`, {
    params: { policy_type }, // match backend query param
  });
