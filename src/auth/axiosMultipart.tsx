import axios, { AxiosInstance } from "axios";

const baseURL = "https://tareeq.app/api";

const axiosMultipart: AxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

axiosMultipart.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default axiosMultipart;
