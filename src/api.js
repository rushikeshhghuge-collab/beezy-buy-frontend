import axios from "axios";

const BASE = import.meta.env.VITE_API_URL || "";

const axiosInstance = axios.create({ baseURL: BASE });

// Attach JWT token to every request automatically
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("beezy_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// On 401, clear auth and redirect to login
axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("beezy_authenticated");
      localStorage.removeItem("beezy_token");
      window.location.href = "/";
    }
    return Promise.reject(err.response?.data?.message || err.message || "Request failed");
  }
);

export default axiosInstance;

// Plain URL builder (used for raw fetch in Login/ForgotPassword)
export const api = (path) => `${BASE}${path}`;
