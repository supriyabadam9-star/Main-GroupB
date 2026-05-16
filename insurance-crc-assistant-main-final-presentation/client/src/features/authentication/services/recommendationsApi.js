import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchRecommendations = async () => {
  const token = localStorage.getItem("token");

  const res = await axios.get(`${BASE_URL}/api/recommendations`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
