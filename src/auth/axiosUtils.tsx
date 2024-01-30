import axios, { AxiosInstance } from "axios";
import jsCookie from "js-cookie";

const baseURL = "https://tareeq.sy/dashboard";

const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = jsCookie.get("accessToken");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
