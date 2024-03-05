import axios, { AxiosInstance } from "axios";

const baseURL = "https://tareeq.sy/dashboard";

const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");

  // config.headers[
  //   "Authorization"
  // ] = `Bearer 195|LNXDj9yoibG2xSzRIbVprrfGHlCuhBK3gOaNH0qPe38ca804`;

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
