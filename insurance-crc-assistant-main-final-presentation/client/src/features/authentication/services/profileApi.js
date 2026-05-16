import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchProfile = async () => {
  const token = localStorage.getItem("token");

  const res = await axios.get(`${BASE_URL}/api/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const saveProfile = async (data) => {
  const token = localStorage.getItem("token");

  const res = await axios.post(`${BASE_URL}/api/profile`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
